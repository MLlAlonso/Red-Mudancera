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
            
            'tipo_vivienda' => 'required|in:casa,departamento,bodega,otro',
            'vivienda_destino' => 'required|in:casa,departamento,bodega,otro',
            
            'origen_elevador' => 'required_if:tipo_vivienda,departamento|nullable|in:no_hay,si_y_se_puede_usar,si_solo_algunos,si_no_se_permite,no_lo_se',
            'destino_elevador' => 'required_if:vivienda_destino,departamento|nullable|in:no_hay,si_y_se_puede_usar,si_solo_algunos,si_no_se_permite,no_lo_se',
            
            'origen_pisos' => 'required_if:tipo_vivienda,departamento|nullable|integer|min:1',
            'destino_pisos' => 'required_if:vivienda_destino,departamento|nullable|integer|min:1',
            
            'origen_acarreo' => 'nullable|in:si,no,no_se',
            'destino_acarreo' => 'nullable|in:si,no,no_se',
            
            'fecha_recoleccion' => 'required|in:1-7,8-15,15-30,30+,lo_antes_posible',
            'tipo_mudanza' => 'required|in:compartida,exclusiva,asesoria',
            'inventario' => 'required|string|min:10',
            'nombre' => 'required|string|min:3|max:150',
            'email' => 'required|email|max:150',
            'telefono' => 'required|regex:/^[0-9]{8,15}$/'
        ];
    }
}
