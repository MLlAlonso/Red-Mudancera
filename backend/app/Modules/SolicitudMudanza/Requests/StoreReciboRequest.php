<?php

namespace App\Modules\SolicitudMudanza\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReciboRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth('empresa')->check();
    }

    public function rules(): array
    {
        return [
            'fecha_recibo' => ['required', 'date_format:Y-m-d',],
            'ciudad' => ['required', 'string', 'max:150',],
            'nombre_cliente' => ['required', 'string', 'max:255',],
            'origen' => ['required', 'string', 'max:1000',],
            'destino' => ['required', 'string', 'max:1000',],
            'tipo_pago' => ['required', 'in:anticipo,pago_parcial,liquidacion',],
            'forma_pago' => ['required', 'in:efectivo,transferencia,deposito,retiro_sin_tarjeta,tarjeta,cheque',],
            'monto' => ['required', 'numeric', 'gt:0', 'max:9999999999.99',],
            'total_acordado' => ['nullable', 'numeric', 'gt:0', 'max:9999999999.99',],
            'observaciones' => ['nullable', 'string', 'max:2000',],
            'firma_empresa' => ['nullable', 'string', 'url', 'max:2048',],
            'firma_cliente' => ['nullable', 'string', 'url', 'max:2048',],
            'guardar_firma' => ['sometimes', 'boolean',],
        ];
    }

    public function messages(): array
    {
        return [
            'fecha_recibo.required' => 'Selecciona la fecha del recibo.',
            'ciudad.required' => 'Ingresa la ciudad.',
            'nombre_cliente.required' => 'El nombre del cliente es obligatorio.',
            'origen.required' => 'El origen es obligatorio.',
            'destino.required' => 'El destino es obligatorio.',
            'tipo_pago.required' => 'Selecciona el tipo de pago.',
            'forma_pago.required' => 'Selecciona la forma de pago.',
            'monto.required' => 'Ingresa el monto recibido.',
            'monto.gt' => 'El monto debe ser mayor a cero.',
            'firma_empresa.url' => 'La firma de la empresa debe ser una URL válida.',
            'firma_cliente.url' => 'La firma del cliente debe ser una URL válida.',
        ];
    }
}