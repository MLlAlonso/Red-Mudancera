<?php

namespace App\Modules\Usuario\Requests;
use Illuminate\Foundation\Http\FormRequest;

class UsuarioUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->user() ? $this->user()->id : null;

        return [
            'nombre'   => 'sometimes|string|min:2|max:100',
            'email'    => 'sometimes|email|max:150|unique:usuarios,email,' . $userId,
            'telefono' => 'sometimes|string|max:20',
            'avatar'   => 'sometimes|string',
            'password' => 'sometimes|string|min:8',
        ];
    }
}