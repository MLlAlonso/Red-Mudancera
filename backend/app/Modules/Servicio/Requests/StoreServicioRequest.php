<?php

namespace App\Modules\Servicio\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreServicioRequest extends FormRequest
{
    public function authorize(): bool
    {
        /**
         * Solo empresas autenticadas
         */
        return auth('empresa')->check();
    }

    public function rules(): array
    {
        return [
            'tipo' => ['required', Rule::in(['busco', 'ofrezco'])],
            'volumen' => ['required', 'numeric', 'gt:0', 'lte:120'],
            'origen' => ['required', 'string', 'min:3', 'max:100'],
            'destino' => ['required', 'string', 'min:3', 'max:100'],

            // SOLO OFREZCO
            'rangoDias' => [
                Rule::requiredIf(fn() => request('tipo') === 'ofrezco'),
                'string'
            ],

            // SOLO BUSCO
            'inicio' => [
                Rule::requiredIf(fn() => request('tipo') === 'busco'),
                'date',
                'after_or_equal:today'
            ],
            'fin' => [
                Rule::requiredIf(fn() => request('tipo') === 'busco'),
                'date',
                'after_or_equal:inicio'
            ],

            'tipo_carga' => ['nullable', Rule::in(['libre', 'mudanza'])],
            'nota' => ['nullable', 'string', 'max:1000'],
            'responsable' => ['nullable', 'string', 'max:120'],
            'telefono' => ['nullable', 'string', 'max:20'],
            'importe' => ['nullable', 'numeric', 'min:0'],
        ];
    }



    public function withValidator($validator)
    {
        $validator->after(function ($validator) {

            $empresa = auth()->user();

            /**
             * RFC verificado obligatorio
             */
            if (empty($empresa->rfc)) {
                $validator->errors()->add(
                    'rfc',
                    'Debes registrar tu RFC para poder publicar servicios.'
                );
            }

            /**
             * Solo admin de empresa puede crear servicios
             */
            if (auth()->user() instanceof \App\Modules\Usuario\Models\Usuario) {
                $validator->errors()->add(
                    'permiso',
                    'Solo el administrador de la empresa puede crear servicios.'
                );
            }
        });
    }

    public function messages(): array
    {
        return [
            'tipo.required' => 'El tipo de servicio es obligatorio.',
            'tipo.in' => 'Tipo de servicio inválido.',
            'volumen.required' => 'El volumen es obligatorio.',
            'volumen.gt' => 'El volumen debe ser mayor a 0.',
            'volumen.lt' => 'El volumen máximo permitido es 120 m³.',
            'origen.required' => 'La ciudad de origen es obligatoria.',
            'destino.required' => 'La ciudad de destino es obligatoria.',
            'inicio.after_or_equal' => 'La fecha de inicio no puede ser pasada.',
            'fin.after_or_equal' => 'La fecha final debe ser igual o posterior a la inicial.',
        ];
    }
}
