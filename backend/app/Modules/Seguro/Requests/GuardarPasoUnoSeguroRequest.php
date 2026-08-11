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
                Rule::in([
                    'menaje',
                    'menaje_auto',
                    'automovil',
                ]),
            ],

            'valor_menaje' => ['nullable', 'numeric', 'min:0',],
            'valor_automovil' => ['nullable', 'numeric', 'min:0',],
        ];
    }

    public function messages(): array
    {
        return [
            'tipo_seguro.required' => 'Selecciona el tipo de seguro.',
            'tipo_seguro.in' => 'El tipo de seguro seleccionado no es válido.',
            'valor_menaje.numeric' => 'El valor del menaje debe ser numérico.',
            'valor_menaje.min' => 'El valor del menaje no puede ser negativo.',
            'valor_automovil.numeric' => 'El valor del automóvil debe ser numérico.',
            'valor_automovil.min' => 'El valor del automóvil no puede ser negativo.',
        ];
    }
}