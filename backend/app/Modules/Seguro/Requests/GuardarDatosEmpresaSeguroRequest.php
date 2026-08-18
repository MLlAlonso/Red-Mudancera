<?php

namespace App\Modules\Seguro\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardarDatosEmpresaSeguroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'empresa_mudanza' => ['nullable', 'string', 'max:150',],
            'propietario_unidad' => ['nullable', 'string', 'max:150',],
            'marca_unidad' => ['nullable', 'string', 'max:100',],
            'modelo_unidad' => ['nullable', 'string', 'max:100',],
            'placas' => ['nullable', 'string', 'max:30',],
            'chofer' => ['nullable', 'string', 'max:150',],
        ];
    }

    public function messages(): array
    {
        return [
            'empresa_mudanza.string' => 'El nombre de la empresa de mudanza debe ser texto.',
            'empresa_mudanza.max' => 'El nombre de la empresa de mudanza no puede superar los 150 caracteres.',
            'propietario_unidad.string' => 'El propietario de la unidad debe ser texto.',
            'propietario_unidad.max' => 'El propietario de la unidad no puede superar los 150 caracteres.',
            'marca_unidad.string' => 'La marca de la unidad debe ser texto.',
            'marca_unidad.max' => 'La marca de la unidad no puede superar los 100 caracteres.',
            'modelo_unidad.string' => 'El modelo de la unidad debe ser texto.',
            'modelo_unidad.max' => 'El modelo de la unidad no puede superar los 100 caracteres.',
            'placas.string' => 'Las placas deben ser texto.',
            'placas.max' => 'Las placas no pueden superar los 30 caracteres.',
            'chofer.string' => 'El nombre del chofer debe ser texto.',
            'chofer.max' => 'El nombre del chofer no puede superar los 150 caracteres.',
        ];
    }
}
