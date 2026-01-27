<?php

namespace App\Modules\Servicio\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Servicio\Models\Servicio;
use App\Modules\Servicio\Requests\StoreServicioRequest;
use App\Modules\Servicio\Requests\ChangeEstadoServicioRequest;
use App\Modules\Servicio\Services\ServicioService;
use App\Modules\Servicio\Repositories\ServicioRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Laravel\Sanctum\PersonalAccessToken;

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
        $servicio = Servicio::with('empresa')->find($id);

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
    public function store(StoreServicioRequest $request): JsonResponse
    {
        $empresa = auth()->user();
        $servicio = $this->servicioService->create(
            $request->validated(),
            $empresa
        );

        return response()->json([
            'message' => 'Servicio creado correctamente.',
            'data' => $servicio
        ], 201);
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
    public function update(StoreServicioRequest $request, int $id): JsonResponse
    {
        $empresa = auth()->user();
        $servicio = $this->servicioRepository->findById($id);

        if (! $servicio) {
            return response()->json(['message' => 'Servicio no encontrado'], 404);
        }

        if ($servicio->empresa_id !== $empresa->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $data = $request->validated();

        // Recalcular distancia SOLO si cambió origen o destino
        if (
            $data['origen'] !== $servicio->origen ||
            $data['destino'] !== $servicio->destino
        ) {
            $distanceService = app(\App\Services\Google\GoogleDistanceService::class);
            $data['distancia_km'] = $distanceService->calcularKm(
                $data['origen'],
                $data['destino']
            );
        }

        $servicio->update($data);
        return response()->json([
            'message' => 'Servicio actualizado correctamente',
            'data' => $servicio->fresh(),
        ]);
    }

    /**
     * Show servicios of authenticated empresa
     */
    public function misServicios(Request $request)
    {
        $empresa = auth()->user(); // 👈 YA es empresa, no ->empresa

        $query = Servicio::with('empresa')
            ->where('empresa_id', $empresa->id)
            ->orderBy('created_at', 'desc');

        // 🔍 búsqueda
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
            'data' => $query->get(), // 👈 TODOS, sin paginar
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
        ]);

        return $pdf->download(
            "reporte_{$validated['mes']}_{$validated['anio']}.pdf"
        );
    }
}
