<?php

namespace App\Modules\Empresa\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Requests\RegisterEmpresaRequest;
use App\Modules\Empresa\Requests\LoginEmpresaRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class EmpresaAuthController extends Controller
{
    public function register(RegisterEmpresaRequest $request)
    {
        $data = $request->validated();

        $data['password'] = Hash::make($data['password']);
        $data['codigoEmpresa'] = strtoupper(Str::random(10));

        $empresa = Empresa::create($data);

        $token = $empresa->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Empresa registrada correctamente.',
            'empresa' => $empresa,
            'token' => $token
        ], 201);
    }

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

        // Crear nuevo token
        $token = $empresa->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'empresa' => $empresa,
            'token' => $token
        ], 200);
    }

    public function me()
    {
        return response()->json(Auth::user());
    }
}