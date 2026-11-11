<?php

namespace App\Modules\SolicitudMudanza\Services;

use App\Modules\Empresa\Models\Empresa;
use Illuminate\Validation\ValidationException;

class FirmaReciboService
{
    private const CLOUDINARY_HOST = 'res.cloudinary.com';
    private const CLOUDINARY_PATH = '/dt3jhwxfw/image/upload/';

    private function validarUrl(string $url): string
    {
        $partes = parse_url($url);

        $valida =
            filter_var($url, FILTER_VALIDATE_URL) && $partes &&
            strtolower($partes['scheme'] ?? '') === 'https' &&
            strtolower($partes['host'] ?? '') === self::CLOUDINARY_HOST &&
            str_starts_with($partes['path'] ?? '', self::CLOUDINARY_PATH) &&
            !isset($partes['user']) &&
            !isset($partes['pass']) &&
            !isset($partes['port']);

        if (!$valida) {
            throw ValidationException::withMessages(['firma' => 'La firma debe ser una imagen válida alojada en Cloudinary.',]);
        }

        return $url;
    }

    public function guardarFirma(Empresa $empresa, string $url): string
    {
        $url = $this->validarUrl($url);

        // No se elimina la imagen anterior de Cloudinary, puede estar referenciada por recibos históricos.
        $empresa->firma_recibo_path = $url;
        $empresa->save();
        return $url;
    }

    public function guardarFirmaTemporal(string $url): string
    {
        return $this->validarUrl($url);
    }

    public function guardarFirmaCliente(string $url): string
    {
        return $this->validarUrl($url);
    }

    public function obtenerFirma(Empresa $empresa): ?string
    {
        if (!$empresa->firma_recibo_path) {
            return null;
        }

        try {
            return $this->validarUrl($empresa->firma_recibo_path);
        } catch (ValidationException $e) {
            return null;
        }
    }

    public function obtenerFirmaData(Empresa $empresa): ?string
    {
        return $this->obtenerFirma($empresa);
    }

    public function eliminarFirma(Empresa $empresa): void
    {
        $empresa->firma_recibo_path = null;
        $empresa->save();
    }
}