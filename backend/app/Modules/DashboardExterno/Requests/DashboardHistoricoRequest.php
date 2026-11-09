<?php

namespace App\Modules\DashboardExterno\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DashboardHistoricoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'agrupar' => $this->input('agrupar', 'dia'),
            'page' => $this->input('page', 1),
            'per_page' => $this->input('per_page', 25),
        ]);
    }

    public function rules(): array
    {
        return [
            'entidad' => ['required', 'string', 'in:contactos,compras,empresas,solicitudes',],
            'desde' => ['required', 'date_format:Y-m-d',],
            'hasta' => ['required', 'date_format:Y-m-d', 'after_or_equal:desde',],
            'agrupar' => ['required', 'string', 'in:dia,semana,mes',],
            'page' => ['required', 'integer', 'min:1',],
            'per_page' => ['required', 'integer', 'min:1', 'max:100',],
        ];
    }

    public function messages(): array
    {
        return [
            'entidad.in' => 'La entidad debe ser contactos, compras, empresas o solicitudes.',
            'desde.date_format' => 'La fecha desde debe tener formato YYYY-MM-DD.',
            'hasta.date_format' => 'La fecha hasta debe tener formato YYYY-MM-DD.',
            'hasta.after_or_equal' => 'La fecha hasta debe ser igual o posterior a desde.',
            'agrupar.in' => 'La agrupación debe ser dia, semana o mes.',
            'per_page.max' => 'El máximo permitido es de 100 registros por página.',
        ];
    }
}