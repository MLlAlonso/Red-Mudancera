<?php

namespace App\Modules\Empresa\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Modules\Empresa\Models\TrialRequest;
use App\Modules\Empresa\Services\TrialService;
use App\Modules\Empresa\Mail\TrialRequestMail;
use Laravel\Sanctum\PersonalAccessToken;

class TrialController extends Controller
{
    protected TrialService $service;

    public function __construct(TrialService $service)
    {
        $this->service = $service;
    }

    public function store(Request $request)
    {
        // ===========================================
        // OBTENER EMPRESA DESDE TOKEN
        // ===========================================
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json([
                'message' => 'Token requerido'
            ], 401);
        }

        $accessToken = PersonalAccessToken::findToken($token);
        if (!$accessToken) {
            return response()->json([
                'message' => 'Token inválido'
            ], 401);
        }

        $empresa = $accessToken->tokenable;
        // ===========================================
        // VALIDAR SI PUEDE PEDIR TRIAL
        // ===========================================
        if (!$this->service->canRequestTrial($empresa)) {
            return response()->json([
                'message' => 'No puedes solicitar otra prueba gratuita'
            ], 403);
        }

        // ===========================================
        // VALIDACIÓN
        // ===========================================
        $data = $request->validate([
            'empresa'       => 'required|string|max:150',
            'representante' => 'required|string|max:150',
            'rfc'           => 'required|string|max:13',
            'base'          => 'required|string|max:100',
            'tel'           => 'required|string|max:20',
            'google_url'    => 'nullable|url',
            'web'           => 'nullable|url',
            'referencias' => 'nullable|array',
            'referencias.*.nombre' => 'nullable|string',
            'referencias.*.telefono' => 'nullable|string',
            'referencias.*.correo' => 'nullable|string',
            'referencias.*.web' => 'nullable|string',
            'ine_url' => 'required|url',
            'csf_url' => 'required|url',
            'domicilio_url' => 'required|url',
        ]);

        // ===========================================
        // REFERENCIAS → ARRAY SEGURO
        // ===========================================
        $referencias = $data['referencias'] ?? null;

        // ===========================================
        // GUARDAR SOLICITUD
        // ===========================================
        $trial = TrialRequest::create([
            'empresa_id'    => $empresa->id,
            'empresa'       => $data['empresa'],
            'representante' => $data['representante'],
            'rfc'           => $data['rfc'],
            'base'          => $data['base'],
            'tel'           => $data['tel'],
            'google_url'    => $data['google_url'] ?? null,
            'web'           => $data['web'] ?? null,
            'referencias'   => $referencias,
            'ine_url' => $data['ine_url'],
            'csf_url' => $data['csf_url'],
            'domicilio_url' => $data['domicilio_url'],
            'requested_at'  => now(),
        ]);

        // ===========================================
        // ACTUALIZAR EMPRESA SOLO SI FALTA INFO
        // ===========================================
        $update = [];

        if (!$empresa->rfc) $update['rfc'] = $data['rfc'];
        if (!$empresa->base) $update['base'] = $data['base'];
        if (!$empresa->tel) $update['tel'] = $data['tel'];

        if (!empty($update)) {
            $empresa->update($update);
        }

        // ===========================================
        // ENVIAR CORREO (SIN GUARDAR ARCHIVOS)
        // ===========================================
        try {
            Mail::to("mikkel_03@outlook.com")->send(
                new TrialRequestMail($trial)
            );
        } catch (\Throwable $e) {
            Log::error('Error enviando correo de trial: ' . $e->getMessage());
        }

        // ===========================================
        // RESPONSE
        // ===========================================
        return response()->json([
            'message' => 'Solicitud enviada correctamente'
        ]);
    }
}