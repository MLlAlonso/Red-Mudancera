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
            'origen' => ['nullable', 'string', 'max:150',],
            'destino' => ['nullable', 'string', 'max:150',],
            'fecha_salida' => ['nullable', 'date',],
            'fecha_llegada' => ['nullable', 'date', 'after_or_equal:fecha_salida',],
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
            'origen.string' => 'El origen debe ser texto.',
            'origen.max' => 'El origen no puede superar los 150 caracteres.',
            'destino.string' => 'El destino debe ser texto.',
            'destino.max' => 'El destino no puede superar los 150 caracteres.',
            'fecha_salida.date' => 'La fecha de salida no es válida.',
            'fecha_llegada.date' => 'La fecha de llegada no es válida.',
            'fecha_llegada.after_or_equal' => 'La fecha de llegada debe ser igual o posterior a la fecha de salida.',
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