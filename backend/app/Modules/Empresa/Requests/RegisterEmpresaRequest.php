<?php

namespace App\Modules\Empresa\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterEmpresaRequest extends FormRequest
{
    public function authorize()
    {
        return true; // permitir acceso
    }

    public function rules()
    {
        return [
            'empresa' => 'required|string|max:150',
            'rfc' => 'required|string|max:13',
            'base' => 'nullable|string|max:100',
            'tel' => 'required|string|max:20',
            'email' => 'required|email|unique:empresas,email',
            'password' => 'required|min:6|confirmed'
        ];
    }
}
