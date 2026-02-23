<?php

namespace App\Modules\SolicitudMudanza\Requests;
use Illuminate\Foundation\Http\FormRequest;

class ReenviarCodigoSolicitudRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => 'required|integer|exists:solicitudes_mudanza,id'
        ];
    }
}