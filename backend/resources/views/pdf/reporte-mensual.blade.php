<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Reporte mensual</title>
</head>

<body style="margin:0;padding:0;background:#F4F7F6;font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 16px;">

                <!-- Card -->
                <table width="100%" cellpadding="0" cellspacing="0"
                    style="max-width:700px;background:#ffffff;border-radius:14px;overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="background:#09233E;padding:24px;text-align:center;">
                            <h2 style="margin:0;color:#ffffff;font-size:22px;">
                                Reporte mensual
                            </h2>
                            <p style="margin:6px 0 0;color:#DCE6EF;font-size:14px;">
                                {{ str_pad($mes, 2, '0', STR_PAD_LEFT) }}/{{ $anio }}
                            </p>
                        </td>
                    </tr>

                    <!-- Empresa -->
                    <tr>
                        <td style="padding:20px 24px;color:#4A5E71; text-align:center">
                            <p style="margin:0;font-size:14px;">
                                <strong>Empresa:</strong> {{ $empresa->empresa }}
                            </p>
                        </td>
                    </tr>

                    <!-- Tabla -->
                    <tr>
                        <td style="padding:0 24px 24px;">
                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="border-collapse:collapse;font-size:13px;color:#4A5E71;">

                                <thead>
                                    <tr style="background:#F1F4F7;">
                                        <th align="left" style="padding:10px;border:1px solid #E2E8EE;">
                                            Ruta
                                        </th>
                                        <th align="center" style="padding:10px;border:1px solid #E2E8EE;">
                                            Fecha
                                        </th>
                                        <th align="center" style="padding:10px;border:1px solid #E2E8EE;">
                                            Tipo
                                        </th>
                                        <th align="right" style="padding:10px;border:1px solid #E2E8EE;">
                                            Ganancia
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    @forelse ($servicios as $s)
                                        <tr>
                                            <td style="padding:10px;border:1px solid #E2E8EE;">
                                                {{ $s->origen }}  ->  {{ $s->destino }}
                                            </td>
                                            <td align="center" style="padding:10px;border:1px solid #E2E8EE;">
                                                {{ $s->finalizado_at?->format('d/m/Y') }}
                                            </td>
                                            <td align="center" style="padding:10px;border:1px solid #E2E8EE;">
                                                {{ ucfirst($s->tipo) }}
                                            </td>
                                            <td align="right" style="padding:10px;border:1px solid #E2E8EE;">
                                                ${{ number_format($s->ganancia, 2) }}
                                            </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="4"
                                                style="padding:14px;border:1px solid #E2E8EE;text-align:center;color:#999;">
                                                No hubo servicios finalizados en este mes.
                                            </td>
                                        </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <!-- Total -->
                    <tr>
                        <td style="padding:20px 24px;border-top:1px solid #E2E8EE;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="right">
                                        <p style="margin:0;font-size:14px;color:#6F7F8D;">
                                            Total del mes
                                        </p>
                                        <p style="margin:4px 0 0;font-size:24px;font-weight:bold;color:#09233E;">
                                            ${{ number_format($total, 2) }}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:20px;text-align:center;">
                            <p style="font-size:12px;color:#999;margin:0;">
                                Reporte generado automáticamente<br>
                                {{ now()->format('d/m/Y H:i') }}
                            </p>
                        </td>
                    </tr>

                </table>
                <!-- /Card -->
            </td>
        </tr>
    </table>

</body>

</html>
