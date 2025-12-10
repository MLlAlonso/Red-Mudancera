<?php

namespace App\Modules\Empresa\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmpresaUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'empresa'     => 'nullable|string|max:150',
            'descripcion' => 'nullable|string|max:2000',
            'email'       => 'nullable|email|max:150|unique:empresas,email,' . auth()->id(),
            'tel'         => 'nullable|string|max:20',
            'logo'        => 'nullable|string',
        ];
    }
}