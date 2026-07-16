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
            'empresa_referente_slug' => 'nullable|string',
            'telefono' => 'required|regex:/^[0-9]{8,15}$/'
        ];
    }

    public function messages(): array
    {
        return [
            '*.required' => 'Este campo es obligatorio.',
            '*.required_if' => 'Este campo es obligatorio para la opción seleccionada.',
            '*.string' => 'El valor ingresado no es válido.',
            '*.integer' => 'Debe ingresar un número entero.',
            '*.email' => 'Ingresa un correo electrónico válido.',
            '*.min' => 'El valor ingresado es demasiado corto.',
            '*.max' => 'El valor ingresado es demasiado largo.',
            '*.in' => 'Selecciona una opción válida.',
            'telefono.regex' => 'El teléfono debe contener únicamente números (8 a 15 dígitos).',
        ];
    }

    public function attributes(): array
    {
        return [
            'origen' => 'origen',
            'destino' => 'destino',
            'tipo_vivienda' => 'tipo de vivienda de origen',
            'vivienda_destino' => 'tipo de vivienda de destino',
            'origen_pisos' => 'número de pisos del origen',
            'destino_pisos' => 'número de pisos del destino',
            'origen_elevador' => 'elevador del origen',
            'destino_elevador' => 'elevador del destino',
            'origen_acarreo' => 'acarreo del origen',
            'destino_acarreo' => 'acarreo del destino',
            'fecha_recoleccion' => 'fecha de la mudanza',
            'tipo_mudanza' => 'tipo de mudanza',
            'inventario' => 'inventario',
            'nombre' => 'persona de contacto',
            'email' => 'correo electrónico',
            'telefono' => 'teléfono de contacto',
        ];
    }
}