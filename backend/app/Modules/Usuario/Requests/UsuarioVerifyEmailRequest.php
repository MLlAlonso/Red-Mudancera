<?php

namespace App\Modules\Usuario\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UsuarioVerifyEmailRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'email' => 'required|email|exists:email_verifications,email',
            'code'  => 'required|string|size:6',
        ];
    }

    public function messages(): array
    {
        return [
            'email.exists' => 'No hay un código activo para este correo.',
            'code.size'    => 'El código debe tener exactamente 6 caracteres.',
        ];
    }
}