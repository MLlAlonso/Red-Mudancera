<?php

namespace App\Modules\Empresa\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Requests\RegisterEmpresaRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class EmpresaAuthController extends Controller
{
    public function register(RegisterEmpresaRequest $request)
    {
        $data = $request->validated();

        $data['password'] = Hash::make($data['password']);
        $data['codigoEmpresa'] = strtoupper(Str::random(10));

        $empresa = Empresa::create($data);

        // ✔ Crear token seguro con sanctum
        $token = $empresa->createToken('empresa-token')->plainTextToken;

        return response()->json([
            'message' => 'Empresa registrada correctamente.',
            'empresa' => $empresa,
            'token' => $token
        ], 201);
    }

    public function me()
    {
        return response()->json(auth('empresa')->user());
    }
}
