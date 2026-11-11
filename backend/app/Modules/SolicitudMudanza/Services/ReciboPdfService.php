<?php

namespace App\Modules\SolicitudMudanza\Services;

use App\Modules\SolicitudMudanza\Models\Recibo;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

class ReciboPdfService
{
    private const CLOUDINARY_HOST = 'res.cloudinary.com';
    private const CLOUDINARY_PATH = '/dt3jhwxfw/image/upload/';

    public function generar(Recibo $recibo): Recibo
    {
        $empresa = $recibo->empresa_snapshot ?? [];
        $logo = $this->imagenCloudinary($empresa['logo'] ?? null);
        $firmaEmpresa = $this->obtenerImagenFirma($recibo->firma_empresa_path,  true);
        $firmaCliente = $this->obtenerImagenFirma($recibo->firma_cliente_path, false);

        $pdf = Pdf::loadView(
            'pdf.recibos.recibo',
            [
                'recibo' => $recibo,
                'empresa' => $empresa,
                'colores' => $recibo->colores_snapshot ?? [],
                'logo' => $logo,
                'firmaEmpresa' => $firmaEmpresa,
                'firmaCliente' => $firmaCliente,
            ]
        )->setPaper('letter', 'portrait');

        $directorio = 'recibos/documentos';
        $nombre = $recibo->folio . '.pdf';
        $path = $directorio . '/' . $nombre;
        $guardado = Storage::disk('local')->put($path, $pdf->output());

        if (!$guardado) {
            throw new RuntimeException('No fue posible guardar el PDF del recibo.');
        }

        $recibo->update(['pdf_path' => $path,]);
        return $recibo->fresh();
    }

    /**
     * Obtener la ruta física del PDF para descargarlo.
     */
    public function obtenerRuta(Recibo $recibo): string
    {
        if (!$recibo->pdf_path || !Storage::disk('local')->exists($recibo->pdf_path)) {
            throw new RuntimeException('El documento PDF no está disponible.');
        }

        return Storage::disk('local')->path($recibo->pdf_path);
    }

    private function obtenerImagenFirma(?string $referencia, bool $obligatoria): ?string
    {
        if (!$referencia) {
            if ($obligatoria) {
                throw new RuntimeException('El recibo no tiene registrada la firma de la empresa.');
            }

            return null;
        }

        if (filter_var($referencia, FILTER_VALIDATE_URL)) {
            $imagen = $this->imagenCloudinary($referencia);

            if (!$imagen && $obligatoria) {
                throw new RuntimeException('No fue posible obtener la firma de la empresa desde Cloudinary.');
            }

            if (!$imagen && !$obligatoria) {
                report(new RuntimeException('No fue posible obtener la firma del cliente desde Cloudinary.'));
            }

            return $imagen;
        }

        return $this->imagenLocalHistorica($referencia, $obligatoria);
    }

    private function imagenCloudinary(?string $url): ?string
    {
        if (!$url || !$this->esUrlCloudinaryPermitida($url)) {
            return null;
        }

        try {
            $response = Http::timeout(10)->withOptions(['allow_redirects' => false,])->get($url);

            if (!$response->successful()) {
                return null;
            }

            $contenido = $response->body();

            if (!$contenido || strlen($contenido) > 3 * 1024 * 1024) {
                return null;
            }

            $informacion = @getimagesizefromstring($contenido);

            if (!$informacion) {
                return null;
            }

            $mime = $informacion['mime'] ?? '';

            if (!in_array($mime, ['image/png', 'image/jpeg', 'image/gif', 'image/webp',], true)) {
                return null;
            }

            return 'data:' . $mime . ';base64,' . base64_encode($contenido);
        } catch (\Throwable $e) {
            report($e);
            return null;
        }
    }

    private function esUrlCloudinaryPermitida(string $url): bool
    {
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return false;
        }

        $partes = parse_url($url);

        if (!$partes) {
            return false;
        }

        return
            strtolower($partes['scheme'] ?? '') === 'https' &&
            strtolower($partes['host'] ?? '') === self::CLOUDINARY_HOST &&
            str_starts_with($partes['path'] ?? '', self::CLOUDINARY_PATH) &&
            !isset($partes['user']) && !isset($partes['pass']) && !isset($partes['port']);
    }

    private function imagenLocalHistorica(string $path, bool $obligatoria): ?string
    {
        if (!Storage::disk('local')->exists($path)) {
            if ($obligatoria) {
                throw new RuntimeException('La firma histórica de la empresa no está disponible.');
            }

            return null;
        }

        $contenido = Storage::disk('local')->get($path);

        if (!$contenido || strlen($contenido) > 3 * 1024 * 1024) {
            return null;
        }

        $informacion = @getimagesizefromstring($contenido);

        if (!$informacion) {
            return null;
        }

        $mime = $informacion['mime'] ?? '';

        if (!in_array($mime, ['image/png', 'image/jpeg',], true)) {
            return null;
        }

        return 'data:' . $mime . ';base64,' . base64_encode($contenido);
    }
}