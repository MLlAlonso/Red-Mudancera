<?php

namespace App\Modules\Empresa\Requests;
use Illuminate\Foundation\Http\FormRequest;

class EmpresaUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'empresa'     => 'nullable|string|max:150',
            'descripcion' => 'nullable|string|max:2000',
            'email'       => 'nullable|email|max:150|unique:empresas,email,' . auth()->id(),
            'representante' => 'nullable|string|max:150',
            'tel'         => 'nullable|string|max:20',
            'base'        => 'nullable|string|max:100',
            'rfc'         => 'nullable|string|max:13',
            'logo'        => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',

            'imagenes' => ['nullable', 'array', 'max:5'],
            'imagenes.*.url' => ['required', 'url'],
            'imagenes.*.public_id' => ['required', 'string'],

            'eliminar_imagenes' => ['nullable', 'array'],
            'eliminar_imagenes.*' => ['integer', 'exists:empresa_imagenes,id'],
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->imagenes && is_string($this->imagenes)) {
            $this->merge([
                'imagenes' => json_decode($this->imagenes, true),
            ]);
        }

        if ($this->eliminar_imagenes && is_string($this->eliminar_imagenes)) {
            $this->merge([
                'eliminar_imagenes' => json_decode($this->eliminar_imagenes, true),
            ]);
        }
    }
}