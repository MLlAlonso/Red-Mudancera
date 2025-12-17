<?php

namespace App\Modules\Servicio\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ChangeEstadoServicioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'estado' => [
                'required',
                Rule::in(['asignado', 'finalizado'])
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'estado.required' => 'El estado es obligatorio.',
            'estado.in' => 'Estado inválido.'
        ];
    }
}
