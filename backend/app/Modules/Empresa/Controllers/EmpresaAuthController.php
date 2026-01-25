<?php

namespace App\Modules\Empresa\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Requests\RegisterEmpresaRequest;
use App\Modules\Empresa\Requests\LoginEmpresaRequest;
use App\Modules\Empresa\Requests\EmpresaUpdateRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Modules\Empresa\Mail\EmpresaVerificationCode;
use App\Models\EmailVerification;
use App\Modules\Usuario\Models\Usuario;
use App\Modules\Empresa\Mail\EmpresaWelcomeMail;

class EmpresaAuthController extends Controller
{
    /* ============================================================
       REGISTRO DE EMPRESA
    ============================================================ */
    public function register(RegisterEmpresaRequest $request)
    {
        $data = $request->validated();
        $plainPassword = $data['password'];
        $data['password'] = Hash::make($data['password']);

        $data['codigoEmpresa'] = strtoupper(
            substr(Str::slug($data['empresa'], ''), 0, 3) . rand(1000, 9999)
        );

        // =============================
        // CREAR EMPRESA
        // =============================
        $empresa = Empresa::create($data);

        // =============================
        // CREAR USUARIO ADMIN INICIAL
        // =============================
        Usuario::create([
            'empresa_id' => $empresa->id,
            'nombre'     => $empresa->representante,
            'email'      => $empresa->email,
            'telefono'   => $empresa->tel,
            'password'   => Hash::make($plainPassword),
            'rol'        => 'admin',
            'activoEmpresa' => true,
        ]);

        // =============================
        // VERIFICACIÓN DE CORREO
        // =============================
        $code = rand(100000, 999999);

        EmailVerification::create([
            'email'      => $empresa->email,
            'code'       => $code,
            'tipo'       => 'empresa',
            'expires_at' => now()->addMinutes(15),
        ]);

        Mail::to($empresa->email)->send(new EmpresaVerificationCode($code));

        // =============================
        // TOKEN
        // =============================
        $token = $empresa->createToken('api-token')->plainTextToken;
        return response()->json([
            'message' => 'Empresa registrada correctamente. Verifica tu correo.',
            'empresa' => $empresa,
            'token'   => $token
        ], 201);
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

        // Eliminar tokens anteriores
        $empresa->tokens()->delete();
        // Crear token nuevo
        $token = $empresa->createToken('api-token')->plainTextToken;
        // Agregar logo_url SIEMPRE
        $empresa->append('logo_url');
        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'empresa' => $empresa,
            'token' => $token
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

        $record = EmailVerification::where('email', $request->email)
            ->where('code', $request->code)
            ->first();

        if (!$record) {
            return response()->json(['error' => 'Código incorrecto'], 400);
        }

        if ($record->expires_at < now()) {
            return response()->json(['error' => 'El código ya expiró'], 400);
        }

        $empresa = Empresa::where('email', $request->email)->first();
        $empresa->email_verified_at = now();
        $empresa->save();

        Mail::to($empresa->email)->send(
            new EmpresaWelcomeMail($empresa)
        );

        $record->delete();

        return response()->json(['message' => 'Correo verificado correctamente']);
    }
}