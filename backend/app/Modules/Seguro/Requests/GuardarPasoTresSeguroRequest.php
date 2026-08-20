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
            'modalidad_datos' => ['required', Rule::in(['autogestion', 'asistida',]),],

            'forma_proporcion_datos' => [
                'nullable',
                Rule::requiredIf(fn() => $this->input('modalidad_datos') === 'autogestion'),
                Rule::in(['cliente', 'empresa',]),
            ],

            'origen' => [
                Rule::requiredIf(fn() => $this->input('modalidad_datos') === 'autogestion' &&  $this->input('forma_proporcion_datos') === 'cliente'),
                'nullable',
                'string',
                'max:150',
            ],

            'destino' => [
                Rule::requiredIf(fn() => $this->input('modalidad_datos') === 'autogestion' && $this->input('forma_proporcion_datos') === 'cliente'),
                'nullable',
                'string',
                'max:150',
            ],

            'fecha_salida' => [
                Rule::requiredIf(fn() => $this->input('modalidad_datos') === 'autogestion' && $this->input('forma_proporcion_datos') === 'cliente'),
                'nullable',
                'date',
            ],

            'fecha_llegada' => [
                Rule::requiredIf(fn() => $this->input('modalidad_datos') === 'autogestion' &&  $this->input('forma_proporcion_datos') === 'cliente'),
                'nullable',
                'date',
                'after_or_equal:fecha_salida',
            ],

            'empresa_mudanza' => [
                Rule::requiredIf(fn() => $this->input('modalidad_datos') === 'autogestion' && $this->input('forma_proporcion_datos') === 'cliente'),
                'nullable',
                'string',
                'max:150',
            ],

            'propietario_unidad' => [
                Rule::requiredIf(fn() => $this->input('modalidad_datos') === 'autogestion' &&  $this->input('forma_proporcion_datos') === 'cliente'),
                'nullable',
                'string',
                'max:150',
            ],

            'marca_unidad' => [
                Rule::requiredIf(fn() => $this->input('modalidad_datos') === 'autogestion' &&  $this->input('forma_proporcion_datos') === 'cliente'),
                'nullable',
                'string',
                'max:100',
            ],

            'modelo_unidad' => [
                Rule::requiredIf(fn() => $this->input('modalidad_datos') === 'autogestion' && $this->input('forma_proporcion_datos') === 'cliente'),
                'nullable',
                'string',
                'max:100',
            ],

            'placas' => [
                Rule::requiredIf(fn() => $this->input('modalidad_datos') === 'autogestion' &&  $this->input('forma_proporcion_datos') === 'cliente'),
                'nullable',
                'string',
                'max:30',
            ],

            'chofer' => [
                Rule::requiredIf(fn() => $this->input('modalidad_datos') === 'autogestion' && $this->input('forma_proporcion_datos') === 'cliente'),
                'nullable',
                'string',
                'max:150',
            ],

            'asistencia_empresa_mudanza' => [
                Rule::requiredIf(fn() => $this->input('modalidad_datos') === 'asistida'),
                'nullable',
                'string',
                'max:150',
            ],

            'asistencia_contacto' => [
                Rule::requiredIf(fn() => $this->input('modalidad_datos') === 'asistida'),
                'nullable',
                'string',
                'max:150',
            ],

            'asistencia_telefono' => [
                Rule::requiredIf(fn() =>  $this->input('modalidad_datos') === 'asistida'),
                'nullable',
                'string',
                'max:30',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'modalidad_datos.required' => 'Selecciona cómo quieres completar la información.',
            'modalidad_datos.in' => 'La modalidad seleccionada no es válida.',
            'forma_proporcion_datos.required' => 'Selecciona cómo quieres proporcionar los datos.',
            'forma_proporcion_datos.in' => 'La forma de proporcionar los datos no es válida.',
            'asistencia_empresa_mudanza.required_if' => 'Ingresa el nombre de la empresa de mudanza.',
            'asistencia_empresa_mudanza.max' => 'El nombre de la empresa no puede superar los 150 caracteres.',
            'asistencia_contacto.required_if' => 'Ingresa el nombre del vendedor o contacto.',
            'asistencia_contacto.max' => 'El nombre del contacto no puede superar los 150 caracteres.',
            'asistencia_telefono.required_if' => 'Ingresa el teléfono o WhatsApp de contacto.',
            'asistencia_telefono.max' => 'El teléfono no puede superar los 30 caracteres.',
            'empresa_mudanza.max' => 'El nombre de la empresa no puede superar los 150 caracteres.',
            'origen.required' => 'Ingresa el origen de la mudanza.',
            'destino.required' => 'Ingresa el destino de la mudanza.',
            'fecha_salida.required' => 'Selecciona la fecha de salida.',
            'fecha_salida.date' => 'La fecha de salida no es válida.',
            'fecha_llegada.required' => 'Selecciona la fecha de llegada.',
            'fecha_llegada.date' => 'La fecha de llegada no es válida.',
            'fecha_llegada.after_or_equal' => 'La fecha de llegada debe ser igual o posterior a la fecha de salida.',
            'propietario_unidad.required_if' =>  'Ingresa el propietario de la unidad.',
            'marca_unidad.required_if' => 'Ingresa la marca de la unidad.',
            'modelo_unidad.required_if' => 'Ingresa el modelo de la unidad.',
            'placas.required_if' => 'Ingresa las placas de la unidad.',
            'chofer.required_if' => 'Ingresa el nombre del chofer.',
        ];
    }
}