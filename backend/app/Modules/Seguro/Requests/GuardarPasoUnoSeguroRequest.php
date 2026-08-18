<?php

namespace App\Modules\Seguro\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GuardarPasoUnoSeguroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tipo_seguro' => [
                'required',

                Rule::in(['menaje', 'menaje_auto', 'automovil',]),
            ],

            /*
            |--------------------------------------------------------------------------
            | Valores declarados
            |--------------------------------------------------------------------------
            */
            'valor_menaje' => ['nullable', 'numeric', 'gt:0',],
            'valor_automovil' => ['nullable', 'numeric', 'gt:0',],
        ];
    }

    public function messages(): array
    {
        return [

            'tipo_seguro.required' => 'Selecciona el tipo de seguro.',
            'tipo_seguro.in' => 'El tipo de seguro seleccionado no es válido.',
            'valor_menaje.numeric' => 'El valor del menaje debe ser numérico.',
            'valor_menaje.gt' => 'El valor del menaje debe ser mayor a cero.',
            'valor_automovil.numeric' => 'El valor del automóvil debe ser numérico.',
            'valor_automovil.gt' => 'El valor del automóvil debe ser mayor a cero.',
        ];
    }
}