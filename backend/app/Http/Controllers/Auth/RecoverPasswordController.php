<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

use App\Modules\Usuario\Models\Usuario;
use App\Modules\Empresa\Models\Empresa;
use App\Mail\RecoverPasswordMail;

class RecoverPasswordController extends Controller
{
    public function recover(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'from'  => 'required|in:usuario,empresa',
        ]);

        $email = $request->email;
        $from  = $request->from;

        $usuario = Usuario::where('email', $email)->first();
        $empresa = Empresa::where('email', $email)->first();

        if (!$usuario && !$empresa) {
            return response()->json([
                'message' => 'No existe ninguna cuenta asociada a este correo.'
            ], 404);
        }

        // Usuario desde login empresa
        if ($usuario && !$empresa && $from === 'empresa') {
            return response()->json([
                'message' => 'Esta cuenta pertenece a tipo usuario. Por favor intenta desde https://app.mudanzafacil.com.mx//usuario/login'
            ], 403);
        }

        // Empresa desde login usuario
        if ($empresa && !$usuario && $from === 'usuario') {
            return response()->json([
                'message' => 'Esta cuenta pertenece a tipo empresa. Por favor intenta desde https://app.mudanzafacil.com.mx//empresa/login'
            ], 403);
        }

        // Generar contraseña temporal
        $tempPassword = $this->generatePassword();

        // Guardar contraseñas
        if ($usuario) {
            $usuario->password = Hash::make($tempPassword);
            $usuario->save();
        }

        if ($empresa) {
            $empresa->password = Hash::make($tempPassword);
            $empresa->save();
        }

        Mail::to($email)->send(
            new RecoverPasswordMail(
                $tempPassword,
                (bool) $usuario,
                (bool) $empresa
            )
        );

        return response()->json([
            'message' => 'Se ha enviado un código de inicio de sesión a tu correo.'
        ]);
    }

    private function generatePassword(): string
    {
        $uppercase = chr(rand(65, 90));
        $number    = rand(0, 9);
        $rest      = substr(str_shuffle('abcdefghijklmnopqrstuvwxyz0123456789'), 0, 6);

        return str_shuffle($uppercase . $number . $rest);
    }
}
