<?php

namespace App\Modules\Seguro\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardarPasoTresSeguroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'empresa_mudanza' => ['required', 'string', 'max:150',],
            'origen' => ['required', 'string', 'max:150',],
            'destino' => ['required', 'string', 'max:150',],
            'fecha_salida' => ['required', 'date',],
            'fecha_llegada' => ['required', 'date', 'after_or_equal:fecha_salida',],
            'propietario_unidad' => ['required', 'string', 'max:150',],
            'marca_unidad' => ['required', 'string', 'max:100',],
            'modelo_unidad' => ['required', 'string', 'max:100',],
            'placas' => ['required', 'string', 'max:30',],
            'chofer' => ['required', 'string', 'max:150',],
        ];
    }

    public function messages(): array
    {
        return [
            'empresa_mudanza.required' => 'Ingresa el nombre de la empresa de mudanza.',
            'empresa_mudanza.max' => 'El nombre de la empresa no puede superar los 150 caracteres.',
            'origen.required' => 'Ingresa el origen de la mudanza.',
            'destino.required' => 'Ingresa el destino de la mudanza.',
            'fecha_salida.required' => 'Selecciona la fecha de salida.',
            'fecha_salida.date' => 'La fecha de salida no es válida.',
            'fecha_llegada.required' => 'Selecciona la fecha de llegada.',
            'fecha_llegada.date' => 'La fecha de llegada no es válida.',
            'fecha_llegada.after_or_equal' => 'La fecha de llegada debe ser igual o posterior a la fecha de salida.',
            'propietario_unidad.required' => 'Ingresa el propietario de la unidad.',
            'marca_unidad.required' => 'Ingresa la marca de la unidad.',
            'modelo_unidad.required' => 'Ingresa el modelo de la unidad.',
            'placas.required' => 'Ingresa las placas de la unidad.',
            'chofer.required' => 'Ingresa el nombre del chofer.',
        ];
    }
}