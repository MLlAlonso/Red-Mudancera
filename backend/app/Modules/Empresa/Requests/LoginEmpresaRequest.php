<?php

namespace App\Modules\Empresa\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginEmpresaRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required|string'
        ];
    }
}
