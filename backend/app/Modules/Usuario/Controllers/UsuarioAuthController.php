<?php

namespace App\Modules\Usuario\Controllers;

use App\Http\Controllers\Controller;
use App\Models\EmailVerification;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Usuario\Models\Usuario;
use App\Modules\Usuario\Requests\UsuarioRegisterRequest;
use App\Modules\Usuario\Requests\UsuarioLoginRequest;
use App\Modules\Usuario\Requests\UsuarioVerifyEmailRequest;
use App\Modules\Usuario\Mail\UsuarioVerificationCode;
use App\Modules\Usuario\Mail\UsuarioWelcomeMail;
use App\Modules\Notificacion\Models\NotificationPreference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class UsuarioAuthController extends Controller
{
    /**
     * Registro de usuario ligado a empresa por codigoEmpresa
     */
    public function register(UsuarioRegisterRequest $request)
    {
        $empresa = Empresa::where('codigoEmpresa', $request->codigoEmpresa)->first();
        if (!$empresa) {
            return response()->json(['message' => 'Código de empresa inválido.'], 404);
        }

        $usuario = Usuario::create([
            'empresa_id' => $empresa->id,
            'nombre'     => $request->nombre,
            'email'      => $request->email,
            'telefono'   => $request->telefono,
            'avatar'     => $request->avatar,
            'password'   => Hash::make($request->password),
            'rol'        => 'trabajador',
        ]);

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

        // crear código de verificación
        $code = rand(100000, 999999);
        EmailVerification::create([
            'email'      => $usuario->email,
            'code'       => $code,
            'tipo'       => 'usuario',
            'expires_at' => Carbon::now()->addMinutes(15),
        ]);

        Mail::to($usuario->email)->send(
            new UsuarioWelcomeMail($empresa->empresa)
        );

        return response()->json([
            'message' => 'Usuario creado. Verifica tu correo.',
            'usuario' => $usuario,
        ], 201);
    }

    /**
     * Login de usuario
     */
    public function login(UsuarioLoginRequest $request)
    {
        $usuario = Usuario::where('email', $request->email)->first();
        // Usuario no existe
        if (! $usuario) {
            return response()->json([
                'message' => 'No se encontraron coincidencias con este correo.'
            ], 404);
        }

        // Contraseña incorrecta
        if (! Hash::check($request->password, $usuario->password)) {
            return response()->json([
                'message' => 'Credenciales incorrectas.'
            ], 401);
        }

        // Usuario pausado por empresa
        if ($usuario->activoEmpresa === 0) {
            return response()->json([
                'message' => 'Has sido pausado por tu empresa. Contacta a tu administrador.'
            ], 403);
        }

        // Login válido → crear token
        $token = $usuario->createToken('usuario_token')->plainTextToken;
        return response()->json([
            'message' => 'Login exitoso',
            'token'   => $token,
            'usuario' => $usuario
        ]);
    }

    /**
     * Reenviar código de verificación
     */
    public function sendVerificationCode(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $usuario = Usuario::where('email', $request->email)->first();
        if (!$usuario) {
            return response()->json(['message' => 'Este email no está registrado'], 404);
        }

        $code = rand(100000, 999999);
        EmailVerification::updateOrCreate(
            ['email' => $usuario->email, 'tipo' => 'usuario'],
            [
                'code'       => $code,
                'expires_at' => Carbon::now()->addMinutes(15),
            ]
        );
        Mail::to($usuario->email)->send(new UsuarioVerificationCode($code));
        return response()->json(['message' => 'Código enviado al email.']);
    }

    /**
     * Verificar código
     */
    public function verifyCode(UsuarioVerifyEmailRequest $request)
    {
        $record = EmailVerification::where('email', $request->email)
            ->where('tipo', 'usuario')
            ->first();

        if (!$record) {
            return response()->json(['message' => 'No existe un código para este email'], 404);
        }

        if ($record->code !== $request->code) {
            return response()->json(['message' => 'Código incorrecto'], 400);
        }

        if (Carbon::now()->greaterThan($record->expires_at)) {
            return response()->json(['message' => 'El código ha expirado'], 400);
        }

        // Marcar usuario como verificado
        Usuario::where('email', $request->email)->update([
            'email_verified_at' => now()
        ]);

        // Eliminar registro
        $record->delete();
        return response()->json(['message' => 'Email verificado correctamente']);
    }
}