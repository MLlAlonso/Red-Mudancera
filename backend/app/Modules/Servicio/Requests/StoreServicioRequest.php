<?php

namespace App\Modules\Servicio\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreServicioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth('empresa')->check();
    }

    public function rules(): array
    {
        $tipo = request('tipo');
        $tipoCarga = request('tipo_carga');

        return [
            'tipo' => ['required', Rule::in(['busco', 'ofrezco'])],

            // Volumen obligatorio excepto vehículo
            'volumen' => [
                Rule::requiredIf(fn() => $tipoCarga !== 'vehiculo'),
                'nullable',
                'numeric',
                'gt:0',
                'lte:120',
            ],

            'origen' => ['required', 'string', 'min:3', 'max:100'],
            'destino' => ['required', 'string', 'min:3', 'max:100'],

            // BUSCO
            'inicio' => [
                Rule::requiredIf(fn() => $tipo === 'busco'),
                'date',
                'after_or_equal:today',
            ],
            'fin' => [
                Rule::requiredIf(fn() => $tipo === 'busco'),
                'date',
                'after_or_equal:inicio',
            ],

            // OFREZCO
            'rangoDias' => [
                Rule::requiredIf(fn() => $tipo === 'ofrezco'),
                'string',
            ],

            // VALORES NORMALIZADOS
            'tipo_carga' => [
                'required',
                Rule::in([
                    'menaje',
                    'vehiculo',
                    'menaje_vehiculo',
                    'otro',
                    'libre', // solo busco
                ]),
            ],

            'nota' => ['nullable', 'string', 'max:1000'],
            'responsable_nombre' => ['nullable', 'string', 'max:120'],
            'responsable_telefono' => ['nullable', 'string', 'max:20'],
            'importe' => ['nullable', 'numeric', 'min:0'],

            'estado_carga' => [
                'nullable',
                Rule::in(['mi_almacen', 'tu_almacen', 'en_ruta']),
            ],

        ];
    }

    public function messages(): array
    {
        return [
            'volumen.required' => 'El volumen es obligatorio para este tipo de carga.',
            'tipo_carga.in' => 'El tipo de carga seleccionado no es válido.',
        ];
    }
}
