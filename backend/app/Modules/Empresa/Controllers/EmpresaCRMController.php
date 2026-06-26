<?php

namespace App\Modules\Empresa\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Empresa\Services\EmpresaCRMService;

class EmpresaCRMController extends Controller
{
    protected EmpresaCRMService $service;

    public function __construct(EmpresaCRMService $service) {
        $this->service = $service;
    }

    public function dashboard(Request $request){
        $empresa = $request->user();

        return response()->json(
            $this->service->dashboard(
                $empresa,
                $request->month,
                $request->year
            )
        );
    }
}