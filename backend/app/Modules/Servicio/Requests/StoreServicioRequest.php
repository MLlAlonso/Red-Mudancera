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
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'tipo' => ['required', Rule::in(['busco', 'ofrezco'])],

            'volumen' => ['required', 'numeric', 'gt:0', 'lt:80'],

            'origen' => ['required', 'string', 'min:3', 'max:100'],
            'destino' => ['required', 'string', 'min:3', 'max:100'],

            'inicio' => ['required', 'date', 'after_or_equal:today'],
            'fin'    => ['required', 'date', 'after_or_equal:inicio'],

            'tipo_carga' => ['nullable', Rule::in(['libre', 'mudanza'])],

            'nota' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {

            $empresa = auth()->user();

            /**
             * RFC verificado obligatorio
             */
            if ($empresa->estadoRFC !== 'verificado') {
                $validator->errors()->add(
                    'rfc',
                    'Debes verificar tu RFC para poder publicar servicios.'
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
            'volumen.lt' => 'El volumen máximo permitido es 80 m³.',

            'origen.required' => 'La ciudad de origen es obligatoria.',
            'destino.required' => 'La ciudad de destino es obligatoria.',

            'inicio.after_or_equal' => 'La fecha de inicio no puede ser pasada.',
            'fin.after_or_equal' => 'La fecha final debe ser igual o posterior a la inicial.',
        ];
    }
}
