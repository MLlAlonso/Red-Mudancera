<?php

namespace App\Modules\Empresa\Repositories;

use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Models\EmpresaMensajeWhatsapp;
use Illuminate\Database\Eloquent\Collection;

class EmpresaMensajeWhatsappRepository
{
    public function listarPorEmpresa(Empresa $empresa, ?string $tipoContacto = null): Collection
    {
        return $empresa->mensajesWhatsapp()
            ->when($tipoContacto, fn($query) => $query->where('tipo_contacto', $tipoContacto))
            ->orderBy('created_at')
            ->get();
    }

    public function crear(Empresa $empresa, array $datos): EmpresaMensajeWhatsapp
    {
        return $empresa->mensajesWhatsapp()->create($datos);
    }

    public function buscarPropio(Empresa $empresa, int $id): ?EmpresaMensajeWhatsapp
    {
        return $empresa->mensajesWhatsapp()->whereKey($id)->first();
    }

    public function actualizar(EmpresaMensajeWhatsapp $mensaje, array $datos): EmpresaMensajeWhatsapp
    {
        $mensaje->update($datos);
        return $mensaje->refresh();
    }

    public function eliminar(EmpresaMensajeWhatsapp $mensaje): void
    {
        $mensaje->delete();
    }
}