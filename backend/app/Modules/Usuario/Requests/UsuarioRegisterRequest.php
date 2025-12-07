<?php

namespace App\Modules\Usuario\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UsuarioRegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre'        => 'required|string|min:2|max:100',
            'email'         => 'required|email|max:150|unique:usuarios,email',
            'telefono'      => 'nullable|string|max:20',
            'avatar'        => 'nullable|string',
            'password'      => 'required|string|min:8',
            'codigoEmpresa' => 'required|string|exists:empresas,codigoEmpresa',
        ];
    }

    public function messages(): array
    {
        return [
            'codigoEmpresa.exists' => 'El código de empresa no existe.',
        ];
    }
}