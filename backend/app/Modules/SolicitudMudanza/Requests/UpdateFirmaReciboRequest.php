<?php

namespace App\Modules\SolicitudMudanza\Requests;
use Illuminate\Foundation\Http\FormRequest;

class UpdateFirmaReciboRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth('empresa')->check();
    }

    public function rules(): array
    {
        return ['firma' => ['required', 'string', 'url', 'max:2048',],];
    }

    public function messages(): array
    {
        return [
            'firma.required' => 'Debes proporcionar una firma.',
            'firma.url' => 'La firma debe ser una URL válida.',
            'firma.max' => 'La URL de la firma es demasiado larga.',
        ];
    }
}