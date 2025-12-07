<?php

namespace App\Modules\Usuario\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Usuario\Models\Usuario;
use App\Modules\Usuario\Requests\UsuarioRegisterRequest;
use App\Modules\Usuario\Requests\UsuarioLoginRequest;
use App\Modules\Usuario\Requests\UsuarioVerifyEmailRequest;
use App\Modules\Usuario\Mail\UsuarioVerificationCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Modules\Empresa\Models\Empresa;

class UsuarioAuthController extends Controller
{
    /**
     * REGISTRO DE USUARIO
     */
    public function register(UsuarioRegisterRequest $request)
    {
        // Buscar empresa por código único
        $empresa = Empresa::where('codigoEmpresa', $request->codigoEmpresa)->first();

        if (!$empresa) {
            return response()->json([
                'message' => 'El código de empresa no existe.'
            ], 404);
        }

        // Crear usuario
        $usuario = Usuario::create([
            'empresa_id' => $empresa->id,
            'nombre'     => $request->nombre,
            'email'      => $request->email,
            'telefono'   => $request->telefono,
            'avatar'     => $request->avatar,
            'password'   => Hash::make($request->password),
            'rol'        => 'trabajador',
        ]);

        // Enviar código de verificación
        $code = rand(100000, 999999);

        DB::table('email_verifications')->insert([
            'email'      => $usuario->email,
            'code'       => $code,
            'tipo'       => 'usuario',
            'expires_at' => Carbon::now()->addMinutes(15),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Mail::to($usuario->email)->send(new UsuarioVerificationCode($code));

        return response()->json([
            'message' => 'Usuario creado. Verifique su email.',
            'usuario' => $usuario,
        ], 201);
    }

    /**
     * LOGIN DE USUARIO
     */
    public function login(UsuarioLoginRequest $request)
    {
        $usuario = Usuario::where('email', $request->email)->first();

        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        // Crear token
        $token = $usuario->createToken('usuario_token')->plainTextToken;

        return response()->json([
            'message' => 'Login exitoso',
            'token'   => $token,
            'usuario' => $usuario
        ]);
    }

    /**
     * ENVIAR CÓDIGO DE VERIFICACIÓN
     */
    public function sendVerificationCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $usuario = Usuario::where('email', $request->email)->first();

        if (!$usuario) {
            return response()->json(['message' => 'Este email no está registrado'], 404);
        }

        // Generar código
        $code = rand(100000, 999999);

        // Guardar en tabla
        DB::table('email_verifications')->updateOrInsert(
            ['email' => $usuario->email],
            [
                'code'       => $code,
                'tipo'       => 'usuario',
                'expires_at' => Carbon::now()->addMinutes(15),
                'updated_at' => now()
            ]
        );

        Mail::to($usuario->email)->send(new UsuarioVerificationCode($code));

        return response()->json(['message' => 'Código enviado al email.']);
    }

    /**
     * VERIFICAR CÓDIGO
     */
    public function verifyCode(UsuarioVerifyEmailRequest $request)
    {
        $record = DB::table('email_verifications')
            ->where('email', $request->email)
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
        DB::table('email_verifications')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Email verificado correctamente']);
    }
}