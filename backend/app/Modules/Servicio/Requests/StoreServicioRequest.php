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
        $tipo = $this->input('tipo');
        $tipoCarga = $this->input('tipo_carga') ?? $this->input('tipoCarga');

        if ($tipo === 'busco') {
            return [
                'tipo' => ['required', Rule::in(['busco'])],

                'volumen' => [
                    Rule::requiredIf(fn() => $tipoCarga !== 'vehiculo'),
                    'nullable',
                    'numeric',
                    'gt:0',
                    'lte:120',
                ],

                'origen' => ['required', 'string', 'min:3', 'max:100'],
                'destino' => ['required', 'string', 'min:3', 'max:100'],
                'inicio' => ['required', 'date', 'after_or_equal:today'],
                'fin' => ['required', 'date', 'after_or_equal:inicio'],

                'tipo_carga' => [
                    'required',
                    Rule::in(['menaje', 'libre']),
                ],

                'nota' => ['nullable', 'string', 'max:1000'],
                'responsable_nombre' => ['nullable', 'string', 'max:120'],
                'responsable_telefono' => ['nullable', 'string', 'max:20'],
            ];
        }

        // ===== OFREZCO =====
        return [
            'tipo' => ['required', Rule::in(['ofrezco'])],

            'volumen' => [
                Rule::requiredIf(fn() => $tipoCarga !== 'vehiculo'),
                'nullable',
                'numeric',
                'gt:0',
                'lte:120',
            ],

            'origen' => ['required', 'string', 'min:3', 'max:100'],
            'destino' => ['required', 'string', 'min:3', 'max:100'],
            'rangoDias' => ['required', 'string'],

            'tipo_carga' => [
                'required',
                Rule::in([
                    'menaje',
                    'vehiculo',
                    'menaje_vehiculo',
                    'otro',
                ]),
            ],

            'tipo_vehiculo' => [
                Rule::requiredIf(fn() => $this->input('tipo_carga') === 'vehiculo'),
                'nullable',
                Rule::in(['compacto', 'camioneta', 'motocicleta']),
            ],

            'nota' => ['nullable', 'string', 'max:1000'],
            'responsable_nombre' => ['nullable', 'string', 'max:120'],
            'responsable_telefono' => ['nullable', 'string', 'max:20'],
            'importe' => ['nullable', 'numeric', 'min:0'],
            'estado_carga' => ['nullable', Rule::in(['mi_almacen', 'tu_almacen', 'en_ruta'])],
            'imagenes' => ['nullable', 'array', 'max:3'],
            'imagenes.*.url' => ['required', 'url'],
            'imagenes.*.public_id' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'volumen.required' => 'El volumen es obligatorio para este tipo de carga.',
            'tipo_carga.in' => 'El tipo de carga seleccionado no es válido.',
            'tipo_vehiculo.required' => 'Debes seleccionar el tipo de vehículo.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'tipo_carga' => $this->tipo_carga
                ?: $this->tipoCarga
                ?: 'menaje',

            'rangoDias' => $this->input('tipo') === 'ofrezco'
                ? ($this->rangoDias ?: '1-7')
                : null,
        ]);
    }
}
