<?php

namespace App\Modules\Usuario\Requests;
use Illuminate\Foundation\Http\FormRequest;

class UsuarioUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Ya está autenticado
    }

    public function rules(): array
    {
        return [
            'nombre'   => 'sometimes|string|min:3|max:100',
            'email'    => 'sometimes|email|max:150|unique:usuarios,email,' . $this->user()->id,
            'telefono' => 'sometimes|string|max:20',
            'avatar'   => 'sometimes|string',
            'password' => 'sometimes|string|min:8',
        ];
    }
}