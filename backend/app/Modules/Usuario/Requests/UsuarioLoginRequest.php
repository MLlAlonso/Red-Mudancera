<?php

namespace App\Modules\Usuario\Requests;
use Illuminate\Foundation\Http\FormRequest;

class UsuarioLoginRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'email'    => 'required|email',
            'password' => 'required|string|min:8',
        ];
    }
}