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
            'tipo_seguro' => ['required', Rule::in(['menaje', 'menaje_auto', 'automovil',]),],
            'valor_menaje' => ['nullable', 'numeric', 'gt:0',],
            'valor_automovil' => ['nullable', 'numeric', 'gt:0',],
            'automovil_foto_circulacion_url' => ['nullable', 'url', 'max:2048',],
            'automovil_foto_circulacion_public_id' => ['nullable', 'string', 'max:255',],
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
            'automovil_foto_circulacion_url.required' => 'Debes cargar una foto de la tarjeta de circulación.',
            'automovil_foto_circulacion_url.url' => 'La imagen de circulación no tiene una URL válida.',
            'automovil_foto_circulacion_url.max' => 'La URL de la imagen no es válida.',
        ];
    }
}
