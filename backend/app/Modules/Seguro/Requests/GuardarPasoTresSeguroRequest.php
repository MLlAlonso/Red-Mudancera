<?php

namespace App\Modules\Seguro\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GuardarPasoTresSeguroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'modalidad_datos' => [
                'required',
                Rule::in(['autogestion', 'asistida',]),
            ],

            'asistencia_empresa_mudanza' => [
                Rule::requiredIf(fn() => $this->input('modalidad_datos') === 'asistida'),
                'nullable',
                'string',
                'max:150',
            ],

            'asistencia_contacto' => [
                Rule::requiredIf( fn() => $this->input('modalidad_datos') === 'asistida' ),
                'nullable',
                'string',
                'max:150',
            ],

            'asistencia_telefono' => [
                Rule::requiredIf( fn() => $this->input('modalidad_datos') === 'asistida' ),
                'nullable',
                'string',
                'max:30',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'modalidad_datos.required' => 'Selecciona cómo quieres obtener la información.',
            'modalidad_datos.in' => 'La modalidad seleccionada no es válida.',
            'asistencia_empresa_mudanza.required' => 'Ingresa el nombre de la empresa de mudanza.',
            'asistencia_empresa_mudanza.max' => 'El nombre de la empresa no puede superar los 150 caracteres.',
            'asistencia_contacto.required' => 'Ingresa el nombre del vendedor o contacto.',
            'asistencia_contacto.max' => 'El nombre del contacto no puede superar los 150 caracteres.',
            'asistencia_telefono.required' => 'Ingresa el teléfono o WhatsApp de contacto.',
            'asistencia_telefono.max' => 'El teléfono no puede superar los 30 caracteres.',
        ];
    }
}