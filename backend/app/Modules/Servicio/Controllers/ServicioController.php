<?php

namespace App\Modules\Servicio\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Modules\Servicio\Models\Servicio;
use App\Modules\Servicio\Requests\StoreServicioRequest;
use App\Modules\Servicio\Requests\ChangeEstadoServicioRequest;
use App\Modules\Servicio\Services\ServicioService;
use App\Modules\Servicio\Repositories\ServicioRepository;
use App\Modules\Servicio\Requests\UpdateServicioRequest;
use App\Modules\Servicio\Services\ServicioImagenService;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use App\Modules\Notificacion\Services\NotificacionService;

class ServicioController extends Controller
{
    protected ServicioService $servicioService;
    protected ServicioRepository $servicioRepository;

    public function __construct(
        ServicioService $servicioService,
        ServicioRepository $servicioRepository
    ) {
        $this->servicioService = $servicioService;
        $this->servicioRepository = $servicioRepository;
    }

    /**
     * GET /api/servicios
     */
    public function index(Request $request): JsonResponse
    {
        $servicios = $this->servicioRepository->search($request->all());
        return response()->json([
            'data' => $servicios->items(),
            'meta' => [
                'current_page' => $servicios->currentPage(),
                'last_page' => $servicios->lastPage(),
                'per_page' => $servicios->perPage(),
                'total' => $servicios->total(),
            ]
        ]);
    }

    /**
     * GET /api/servicios/{id}
     */
    public function show($id)
    {
        $servicio = Servicio::with(['empresa'])->find($id);
        if (! $servicio) {
            return response()->json([
                'message' => 'Servicio no encontrado'
            ], 404);
        }
        return response()->json($servicio);
    }

    /**
     * POST /api/servicios
     */
    public function store(
        StoreServicioRequest $request,
        ServicioImagenService $imagenService
    ): JsonResponse {
        $empresa = auth('empresa')->user();

        return DB::transaction(function () use ($request, $empresa, $imagenService) {

            // Crear servicio + calcular distancia
            $servicio = $this->servicioService->create(
                $request->validated(),
                $empresa
            );

            if ($request->filled('imagenes')) {
                $imagenService->guardarDesdeFrontend(
                    $servicio,
                    $request->input('imagenes')
                );
            }

            app(NotificacionService::class)->crearParaEmpresa(
                $empresa->id,
                'Nuevo servicio publicado',
                "Publicaste un servicio de {$servicio->origen} a {$servicio->destino}",
                'info',
                "/servicios/{$servicio->id}"
            );

            return response()->json([
                'message' => 'Servicio creado correctamente',
                'data' => $servicio->fresh()->load('imagenes'),
            ], 201);
        });
    }

    /**
     * PATCH /api/servicios/{id}/estado
     */
    public function changeEstado(Request $request, $id)
    {
        $validated = $request->validate([
            'estado' => 'required|in:activo,asignado,finalizado',
        ]);

        $servicio = Servicio::findOrFail($id);
        $servicio = $this->servicioService->changeEstado(
            $servicio,
            $validated['estado']
        );

        return response()->json([
            'success' => true,
            'data' => $servicio,
        ]);
    }

    /**
     * DELETE /api/servicios/{id}
     */
    public function destroy(int $id): JsonResponse
    {
        $servicio = $this->servicioRepository->findById($id);
        if (!$servicio) {
            return response()->json([
                'message' => 'Servicio no encontrado.'
            ], 404);
        }

        $servicio->delete();
        return response()->json([
            'message' => 'Servicio eliminado correctamente.'
        ]);
    }

    /**
     * Update /api/servicios/{id}
     */
    public function update(
        UpdateServicioRequest $request,
        int $id,
        ServicioImagenService $imagenService
    ): JsonResponse {
        $empresa = auth()->user();
        $servicio = $this->servicioRepository->findById($id);

        if (! $servicio) {
            return response()->json(['message' => 'Servicio no encontrado'], 404);
        }

        if ($servicio->empresa_id !== $empresa->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $servicio->update($request->validated());

        if ($request->filled('eliminar_imagenes')) {
            $imagenService->eliminarPorIds(
                $servicio,
                $request->input('eliminar_imagenes')
            );
        }

        $totalActuales = $servicio->imagenes()->count();
        $eliminadas = count($request->input('eliminar_imagenes', []));
        $nuevas = count($request->input('imagenes', []));

        if (($totalActuales - $eliminadas + $nuevas) > 3) {
            return response()->json([
                'message' => 'Máximo 3 imágenes por servicio',
            ], 422);
        }

        if ($request->filled('imagenes')) {
            $imagenService->guardarDesdeFrontend(
                $servicio,
                $request->input('imagenes')
            );
        }

        return response()->json([
            'message' => 'Servicio actualizado correctamente',
            'data' => $servicio->fresh()->load('imagenes'),
        ]);
    }

    /**
     * Show servicios of authenticated empresa
     */
    public function misServicios(Request $request)
    {
        $empresa = auth()->user();

        $query = Servicio::with('empresa')
            ->where('empresa_id', $empresa->id)
            ->orderBy('created_at', 'desc');

        // búsqueda
        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('origen', 'like', "%{$search}%")
                    ->orWhere('destino', 'like', "%{$search}%");
            });
        }

        // filtros avanzados
        $query->when(
            $request->origen,
            fn($q, $v) =>
            $q->where('origen', 'like', "%{$v}%")
        );

        $query->when(
            $request->destino,
            fn($q, $v) =>
            $q->where('destino', 'like', "%{$v}%")
        );

        $query->when(
            $request->volumen,
            fn($q, $v) =>
            $q->where('volumen', '>=', $v)
        );

        $query->when(
            $request->tipoCarga,
            fn($q, $v) =>
            $q->where('tipo_carga', $v)
        );

        if ($request->fechaInicio && $request->fechaFin) {
            $query->whereBetween('inicio', [
                $request->fechaInicio,
                $request->fechaFin,
            ]);
        }

        return response()->json([
            'data' => $query->get(),
        ]);
    }

    /**
     * Save earnings for service
     */
    public function finalizar(Request $request, $id)
    {
        $validated = $request->validate([
            'ganancia' => 'required|numeric|min:0'
        ]);

        $servicio = Servicio::findOrFail($id);

        if ($servicio->estado === 'finalizado') {
            return response()->json([
                'message' => 'El servicio ya está finalizado'
            ], 400);
        }

        $servicio->update([
            'estado' => 'finalizado',
            'ganancia' => round($validated['ganancia'], 2),
            'finalizado_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'data' => $servicio
        ]);
    }

    /**
     * Generate monthly report
     */
    public function reporteMensual(Request $request)
    {
        $empresa = auth()->user();
        $validated = $request->validate([
            'mes' => 'required|integer|min:1|max:12',
            'anio' => 'required|integer|min:2026',
        ]);

        $inicio = Carbon::create($validated['anio'], $validated['mes'], 1)->startOfMonth();
        $fin = $inicio->copy()->endOfMonth();

        $servicios = Servicio::where('empresa_id', $empresa->id)
            ->where('estado', 'finalizado')
            ->whereBetween('finalizado_at', [$inicio, $fin])
            ->get();

        $total = $servicios->sum('ganancia');

        return response()->json([
            'total' => round($total, 2),
            'servicios' => $servicios,
        ]);
    }

    /**
     * Generate PDF
     */
    public function reporteMensualPdf(Request $request)
    {
        $token = $request->query('token');
        if (!$token) {
            abort(401, 'Token requerido');
        }

        $accessToken = PersonalAccessToken::findToken($token);
        if (!$accessToken) {
            abort(401, 'Token inválido');
        }

        $empresa = $accessToken->tokenable;

        $logoPath = null;
        $logoUrl = $empresa->logo_url;

        if ($logoUrl) {
            try {
                $response = Http::timeout(5)->get($logoUrl);

                if ($response->successful()) {
                    $logoPath = storage_path(
                        'app/temp_logo_' . $empresa->id . '.png'
                    );
                    file_put_contents($logoPath, $response->body());
                }
            } catch (\Throwable $e) {
                Log::warning('No se pudo cargar logo para PDF', [
                    'empresa_id' => $empresa->id,
                    'logo' => $logoUrl,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        $validated = $request->validate([
            'mes' => 'required|integer|min:1|max:12',
            'anio' => 'required|integer|min:2026',
        ]);

        $inicio = Carbon::create($validated['anio'], $validated['mes'], 1)->startOfMonth();
        $fin = $inicio->copy()->endOfMonth();

        $servicios = Servicio::where('empresa_id', $empresa->id)
            ->where('estado', 'finalizado')
            ->whereBetween('finalizado_at', [$inicio, $fin])
            ->get();

        $total = $servicios->sum('ganancia');

        $pdf = app('dompdf.wrapper');
        $pdf->loadView('pdf.reporte-mensual', [
            'empresa' => $empresa,
            'servicios' => $servicios,
            'total' => $total,
            'mes' => $validated['mes'],
            'anio' => $validated['anio'],
            'logoPath' => $logoPath,
        ]);

        if ($logoPath && file_exists($logoPath)) {
            unlink($logoPath);
        }

        return $pdf->download(
            "reporte_{$validated['mes']}_{$validated['anio']}.pdf"
        );
    }
}
