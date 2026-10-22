<?php

namespace App\Modules\Empresa\Services;

use App\Modules\Empresa\Models\Empresa;
use App\Modules\Empresa\Models\EmpresaMensajeWhatsapp;
use App\Modules\Empresa\Repositories\EmpresaMensajeWhatsappRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;

class EmpresaMensajeWhatsappService
{
    public function __construct(private readonly EmpresaMensajeWhatsappRepository $repository) {}

    public function listar(Empresa $empresa, ?string $tipoContacto = null): Collection
    {
        $this->validarTipo($tipoContacto);
        return $this->repository->listarPorEmpresa($empresa, $tipoContacto);
    }

    public function crear(Empresa $empresa, array $datos): EmpresaMensajeWhatsapp
    {
        $this->validarTipo($datos['tipo_contacto'] ?? null);

        return $this->repository->crear($empresa, [
            'titulo' => trim($datos['titulo']),
            'mensaje' => trim($datos['mensaje']),
            'tipo_contacto' => $datos['tipo_contacto'],
        ]);
    }

    public function actualizar(Empresa $empresa, int $id, array $datos): EmpresaMensajeWhatsapp
    {
        $mensaje = $this->obtenerPropio($empresa, $id);
        $this->validarTipo($datos['tipo_contacto'] ?? null);

        return $this->repository->actualizar($mensaje, [
            'titulo' => trim($datos['titulo']),
            'mensaje' => trim($datos['mensaje']),
            'tipo_contacto' => $datos['tipo_contacto'],
        ]);
    }

    public function eliminar(Empresa $empresa, int $id): void
    {
        $mensaje = $this->obtenerPropio($empresa, $id);
        $this->repository->eliminar($mensaje);
    }

    private function obtenerPropio(Empresa $empresa, int $id): EmpresaMensajeWhatsapp
    {
        $mensaje = $this->repository->buscarPropio($empresa, $id);

        if (!$mensaje) {
            throw new AuthorizationException('La plantilla no existe o no pertenece a tu empresa.');
        }

        return $mensaje;
    }

    private function validarTipo(?string $tipo): void
    {
        if ($tipo !== null && !in_array($tipo, [EmpresaMensajeWhatsapp::TIPO_EMPRESA, EmpresaMensajeWhatsapp::TIPO_CLIENTE,], true)) {
            throw ValidationException::withMessages(['tipo_contacto' => ['El tipo de contacto no es válido.',],]);
        }
    }
}