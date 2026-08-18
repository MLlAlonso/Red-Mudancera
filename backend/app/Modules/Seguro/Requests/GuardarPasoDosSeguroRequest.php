<?php

namespace App\Modules\Seguro\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardarPasoDosSeguroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:150',],
            'email' => ['required', 'email', 'max:150',],
            'telefono' => ['required', 'string', 'max:20',],
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.required' => 'Ingresa tu nombre completo.',
            'nombre.string' => 'El nombre no es válido.',
            'nombre.max' => 'El nombre no puede superar los 150 caracteres.',
            'email.required' => 'Ingresa tu correo electrónico.',
            'email.email' => 'Ingresa un correo electrónico válido.',
            'email.max' => 'El correo electrónico no puede superar los 150 caracteres.',
            'telefono.required' => 'Ingresa tu teléfono de contacto.',
            'telefono.string' => 'El teléfono no es válido.',
            'telefono.max' => 'El teléfono no puede superar los 20 caracteres.',
        ];
    }
}