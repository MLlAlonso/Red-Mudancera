<?php

namespace App\Modules\Empresa\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Requests\RegisterEmpresaRequest;
use App\Modules\Empresa\Requests\LoginEmpresaRequest;
use App\Modules\Empresa\Requests\EmpresaUpdateRequest;
use App\Modules\Empresa\Mail\EmpresaVerificationCode;
use App\Modules\Empresa\Mail\EmpresaWelcomeMail;
use App\Models\EmailVerification;
use App\Modules\Usuario\Models\Usuario;
use App\Modules\Notificacion\Services\NotificationDispatcher;
use App\Modules\Notificacion\Events\LoginEmpresaEvent;
use App\Modules\Notificacion\Models\NotificationPreference;

class EmpresaAuthController extends Controller
{
    /* ============================================================
       REGISTRO DE EMPRESA
    ============================================================ */
    public function register(RegisterEmpresaRequest $request)
    {
        $data = $request->validated();

        // ============================================
        // EVITAR DUPLICADOS SI YA EXISTE EMPRESA
        // ============================================
        $exists = Empresa::where('email', $data['email'])->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Este correo ya está registrado'
            ], 422);
        }

        // ============================================
        // GENERAR CÓDIGO
        // ============================================
        $code = rand(100000, 999999);

        // ============================================
        // GUARDAR REGISTRO TEMPORAL
        // ============================================
        Cache::put(
            'empresa_register_' . $data['email'],
            $data,
            now()->addMinutes(15)
        );

        // ============================================
        // GUARDAR CÓDIGO
        // ============================================
        EmailVerification::updateOrCreate(
            [
                'email' => $data['email'],
                'tipo' => 'empresa',
            ],
            [
                'code' => $code,
                'expires_at' => now()->addMinutes(15),
            ]
        );

        // ============================================
        // ENVIAR CORREO
        // ============================================
        Mail::to($data['email']) ->send(new EmpresaVerificationCode($code));

        // ============================================
        // RESPONSE
        // ============================================
        return response()->json([
            'message' => 'Código enviado correctamente'
        ], 200);
    }

    /* ============================================================
       LOGIN
    ============================================================ */
    public function login(LoginEmpresaRequest $request)
    {
        $empresa = Empresa::where('email', $request->email)->first();
        if (!$empresa || !Hash::check($request->password, $empresa->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales son incorrectas.'],
            ]);
        }

        // Crear token nuevo
        $token = $empresa->createToken('api-token')->plainTextToken;
        /*  Disparar evento de notificación
        app(NotificationDispatcher::class)->dispatch(
            new LoginEmpresaEvent([
                'empresa_id' => $empresa->id,
            ])
        ); */
        // Agregar logo_url SIEMPRE
        $empresa->append('logo_url');
        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'empresa' => $empresa,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ]);
    }

    /* ============================================================
       ENVIAR CÓDIGO DE VERIFICACIÓN
    ============================================================ */
    public function sendVerificationCode(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $code = rand(100000, 999999);

        EmailVerification::updateOrCreate(
            [
                'email' => $request->email,
                'tipo'  => 'empresa',
            ],
            [
                'code'       => $code,
                'expires_at' => now()->addMinutes(15),
            ]
        );
        Mail::to($request->email)->send(new EmpresaVerificationCode($code));
        return response()->json(['message' => 'Código enviado exitosamente']);
    }

    /* ============================================================
       VERIFICAR CÓDIGO DE CORREO
    ============================================================ */
    public function verifyCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code'  => 'required|string',
        ]);

        // ============================================
        // VALIDAR CÓDIGO
        // ============================================
        $record = EmailVerification::where('email', $request->email)
            ->where('code', $request->code)
            ->first();

        if (!$record) {
            return response()->json([
                'error' => 'Código incorrecto'
            ], 400);
        }

        if ($record->expires_at < now()) {
            return response()->json([
                'error' => 'El código ya expiró'
            ], 400);
        }

        // ============================================
        // OBTENER DATOS TEMPORALES
        // ============================================
        $data = Cache::get(
            'empresa_register_' . $request->email
        );

        if (!$data) {
            return response()->json([
                'error' => 'El registro expiró. Regístrate nuevamente.'
            ], 400);
        }

        // ============================================
        // CREAR EMPRESA
        // ============================================
        $plainPassword = $data['password'];
        $data['password'] = Hash::make($data['password']);

        $data['codigoEmpresa'] = strtoupper(
            substr(Str::slug($data['empresa'], ''), 0, 3)
                . rand(1000, 9999)
        );

        $data['tokens'] = 50;
        $empresa = Empresa::create($data);

        $empresa->update([
            'plan' => 'free',
            'subActiva' => false,
            'subInicio' => null,
            'subFin' => null,
            'isTrial' => false,
            'trialEndsAt' => null,
            'freeSince' => now(),
            'email_verified_at' => now(),
        ]);

        // ============================================
        // CREAR USUARIO ADMIN
        // ============================================
        $usuario = Usuario::create([
            'empresa_id' => $empresa->id,
            'nombre' => $empresa->representante,
            'email' => $empresa->email,
            'telefono' => $empresa->tel,
            'password' => Hash::make($plainPassword),
            'rol' => 'admin',
            'activoEmpresa' => true,
        ]);

        // ============================================
        // PREFERENCIAS
        // ============================================
        $tipos = ['info', 'alerta', 'sistema'];
        $canales = ['database', 'email', 'push'];

        foreach ($tipos as $tipo) {
            foreach ($canales as $canal) {
                NotificationPreference::create([
                    'usuario_id' => $usuario->id,
                    'tipo' => $tipo,
                    'canal' => $canal,
                    'activo' => true,
                ]);
            }
        }

        // ============================================
        // MAIL BIENVENIDA
        // ============================================
        Mail::to($empresa->email)->send(new EmpresaWelcomeMail($empresa));

        // ============================================
        // LIMPIAR CACHE + VERIFY
        // ============================================
        Cache::forget(
            'empresa_register_' . $request->email
        );
        $record->delete();

        // ============================================
        // TOKEN
        // ============================================
        $token = $empresa->createToken('api-token')->plainTextToken;

        // ============================================
        // RESPONSE
        // ============================================
        return response()->json([
            'message' => 'Correo verificado correctamente',
            'token' => $token,
            'empresa' => $empresa,
        ]);
    }
}
