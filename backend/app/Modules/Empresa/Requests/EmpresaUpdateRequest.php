<?php

namespace App\Modules\Empresa\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmpresaUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'nombre'   => 'nullable|string|max:120',
            'email'    => 'nullable|email|max:150|unique:empresas,email,' . auth()->id(),
            'telefono' => 'nullable|string|max:20',
            'avatar'   => 'nullable|string',
        ];
    }
}
