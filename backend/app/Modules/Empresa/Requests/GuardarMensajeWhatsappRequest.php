<?php

namespace App\Modules\Empresa\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GuardarMensajeWhatsappRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'titulo' => ['required', 'string', 'min:2', 'max:60',],
            'mensaje' => ['required', 'string', 'min:1', 'max:1000',],

            'tipo_contacto' => [
                'required',
                'string',
                Rule::in(['empresa_empresa', 'empresa_cliente',]),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'titulo.required' => 'El título es obligatorio.',
            'titulo.min' => 'El título debe tener al menos 2 caracteres.',
            'titulo.max' => 'El título no puede superar 60 caracteres.',
            'mensaje.required' => 'El mensaje es obligatorio.',
            'mensaje.max' => 'El mensaje no puede superar 1000 caracteres.',
            'tipo_contacto.required' => 'Debes seleccionar el tipo de contacto.',
            'tipo_contacto.in' => 'El tipo de contacto no es válido.',
        ];
    }
}