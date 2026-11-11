<?php

namespace App\Modules\SolicitudMudanza\Services;

use App\Modules\Empresa\Models\Empresa;
use App\Modules\SolicitudMudanza\Models\Recibo;
use App\Modules\SolicitudMudanza\Models\SolicitudMudanza;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ReciboService
{
    public function __construct(
        private FirmaReciboService $firmaService,
        private ReciboColorService $colorService,
        private ReciboPdfService $pdfService
    ) {}


    public function obtenerDatos(Empresa $empresa, int $solicitudId): array
    {
        $solicitud = $this->obtenerSolicitud($empresa, $solicitudId);

        return [
            'solicitud' => [
                'id' => $solicitud->id,
                'nombre' => $solicitud->nombre,
                'origen' => $solicitud->origen,
                'destino' => $solicitud->destino,
                'ciudad' => $empresa->base,
            ],

            'empresa' => [
                'nombre' => $empresa->empresa,
                'logo' => $empresa->logo_url,
                'representante' => $empresa->representante,
                'tel' => $empresa->tel,
                'email' => $empresa->email,
            ],

            'firma' => [
                'disponible' => $this->firmaService->obtenerFirma($empresa) !== null,
                'imagen' => $this->firmaService->obtenerFirmaData($empresa),
            ],

            'colores' => $this->colorService->obtener($empresa),
        ];
    }


    public function crear(Empresa $empresa, int $solicitudId, array $data): Recibo
    {
        $solicitud = $this->obtenerSolicitud($empresa,  $solicitudId);
        $firmaNueva = $data['firma_empresa'] ?? null;

        if ($firmaNueva) {
            $firmaPath = !empty($data['guardar_firma']) ? $this->firmaService->guardarFirma($empresa, $firmaNueva) : $this->firmaService->guardarFirmaTemporal($firmaNueva);
        } else {
            $firmaPath = $this->firmaService->obtenerFirma($empresa);
        }

        if (!$firmaPath) {
            throw ValidationException::withMessages(['firma_empresa' => 'Debes dibujar, cargar o guardar tu firma antes de generar el recibo.',]);
        }

        $firmaClientePath = null;

        if (!empty($data['firma_cliente'])) {
            $firmaClientePath = $this->firmaService->guardarFirmaCliente($data['firma_cliente']);
        }

        $colores = $this->colorService->obtener($empresa);

        $recibo = DB::transaction(function () use ($empresa, $solicitud, $data, $firmaPath, $firmaClientePath, $colores) {
            return Recibo::create([
                'empresa_id' => $empresa->id,
                'solicitud_id' => $solicitud->id,
                'folio' => $this->generarFolio(),
                'fecha_recibo' => $data['fecha_recibo'],
                'ciudad' => $data['ciudad'],
                'nombre_cliente' => $data['nombre_cliente'],
                'origen' => $data['origen'],
                'destino' => $data['destino'],
                'tipo_pago' => $data['tipo_pago'],
                'forma_pago' => $data['forma_pago'],
                'monto' => $data['monto'],
                'total_acordado' => $data['total_acordado'] ?? null,
                'observaciones' => $data['observaciones'] ?? null,
                'firma_empresa_path' => $firmaPath,
                'firma_cliente_path' => $firmaClientePath,

                'empresa_snapshot' => [
                    'nombre' => $empresa->empresa,
                    'representante' => $empresa->representante,
                    'rfc' => $empresa->rfc,
                    'base' => $empresa->base,
                    'telefono' => $empresa->tel,
                    'email' => $empresa->email,
                    'logo' => $empresa->logo_url,
                ],

                'colores_snapshot' => $colores,
            ]);
        });

        return $this->pdfService->generar($recibo);
    }

    public function obtenerPorEmpresa(Empresa $empresa, int $reciboId): Recibo
    {
        return Recibo::where('empresa_id', $empresa->id)->findOrFail($reciboId);
    }

    public function listar(Empresa $empresa, int $solicitudId)
    {
        $this->obtenerSolicitud($empresa, $solicitudId);
        return Recibo::where('empresa_id', $empresa->id)->where('solicitud_id', $solicitudId)->latest()->get();
    }

    private function obtenerSolicitud(Empresa $empresa, int $solicitudId): SolicitudMudanza
    {
        return SolicitudMudanza::whereHas(
            'compras',
            function ($query) use ($empresa) {
                $query->where('empresa_id', $empresa->id);
            }
        )->findOrFail($solicitudId);
    }

    private function generarFolio(): string
    {
        return 'MF-' . now()->format('Ymd') . '-' . strtoupper(Str::random(8));
    }
}
