<?php

namespace App\Modules\SolicitudMudanza\Requests;
use Illuminate\Foundation\Http\FormRequest;

class UpdateReciboColoresRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth('empresa')->check();
    }

    public function rules(): array
    {
        return [
            'primary' => ['required', 'string', 'regex:/^#[0-9A-Fa-f]{6}$/',],
            'accent' => ['required', 'string', 'regex:/^#[0-9A-Fa-f]{6}$/',],
        ];
    }

    public function messages(): array
    {
        return [
            'primary.required' => 'Selecciona el color principal.',
            'primary.regex' => 'El color principal debe tener un código HEX válido.',
            'accent.required' => 'Selecciona el color de acento.',
            'accent.regex' => 'El color de acento debe tener un código HEX válido.',
        ];
    }
}
