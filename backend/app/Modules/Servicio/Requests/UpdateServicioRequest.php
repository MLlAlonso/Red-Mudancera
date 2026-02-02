<?php

namespace App\Modules\Servicio\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateServicioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth('empresa')->check();
    }

    public function rules(): array
    {
        return [
            'tipo' => ['sometimes', Rule::in(['busco', 'ofrezco'])],

            'volumen' => [
                'nullable',
                'numeric',
                'gt:0',
                'lte:120',
            ],

            'origen'  => ['nullable', 'string', 'min:3', 'max:100'],
            'destino' => ['nullable', 'string', 'min:3', 'max:100'],

            'rangoDias' => ['nullable', 'string'],

            'tipo_carga' => [
                'sometimes',
                Rule::in([
                    'menaje',
                    'vehiculo',
                    'menaje_vehiculo',
                    'otro',
                    'libre',
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

            'eliminar_imagenes' => ['nullable', 'boolean'],
        ];
    }
}