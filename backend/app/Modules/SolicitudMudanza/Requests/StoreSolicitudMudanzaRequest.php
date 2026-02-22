<?php

namespace App\Modules\SolicitudMudanza\Requests;
use Illuminate\Foundation\Http\FormRequest;

class StoreSolicitudMudanzaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Público
    }

    public function rules(): array
    {
        return [
            'origen' => 'required|string|min:3|max:100',
            'destino' => 'required|string|min:3|max:100',
            'tipo_vivienda' => 'required|in:casa,departamento,otro',
            'inventario' => 'required|string|min:10',
            'fecha_recoleccion' => 'required|in:urgente,7-15,15-30',
            'tipo_mudanza' => 'required|in:compartida,exclusiva,asesoria',
            'nombre' => 'required|string|min:3|max:150',
            'email' => 'required|email|max:150',
            'telefono' => 'required|regex:/^[0-9]{8,15}$/'
        ];
    }
}