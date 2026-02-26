<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Solicitud publicada</title>
</head>

<body style="margin:0;padding:0;background:#F4F7F6;font-family:Inter,Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0"
                    style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 20px rgba(0,0,0,0.05);">

                    <!-- Header -->
                    <tr>
                        <td style="background:#09233E;padding:24px;text-align:center;">
                            <h2 style="margin:0;color:#ffffff;font-family:Nunito,Arial;font-size:22px;">
                                Solicitud publicada correctamente
                            </h2>
                        </td>
                    </tr>

                    <!-- Logo -->
                    <tr>
                        <td align="center" style="padding:20px;">
                            <img src="https://app.mudanzafacil.com.mx/logo/logo_A.png" alt="Mudanza Fácil"
                                style="height:60px;">
                        </td>
                    </tr>

                    <!-- Ticket Body -->
                    <tr>
                        <td style="padding:24px;color:#4A5E71;">

                            <!-- Folio -->
                            <div style="text-align:center;margin-bottom:20px;">
                                <div style="font-size:14px;color:#6F7F8D;">Folio</div>
                                <div style="font-size:22px;font-weight:bold;color:#09233E;letter-spacing:2px;">
                                    {{ $folio }}
                                </div>
                                <div style="font-size:12px;color:#6F7F8D;margin-top:4px;">
                                    {{ $fecha_formateada }}
                                </div>
                            </div>

                            <!-- Línea punteada -->
                            <div style="border-top:2px dashed #ABB0B4;margin:24px 0;"></div>

                            <!-- Datos tipo formulario -->
                            <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;">

                                <tr>
                                    <td style="color:#6F7F8D;">Origen:</td>
                                    <td align="right"><strong>{{ $solicitud->origen }}</strong></td>
                                </tr>

                                <tr>
                                    <td style="color:#6F7F8D;">Vivienda origen:</td>
                                    <td align="right"><strong>{{ ucfirst($solicitud->tipo_vivienda) }}</strong></td>
                                </tr>

                                <tr>
                                    <td style="color:#6F7F8D;">Destino:</td>
                                    <td align="right"><strong>{{ $solicitud->destino }}</strong></td>
                                </tr>

                                <tr>
                                    <td style="color:#6F7F8D;">Vivienda destino:</td>
                                    <td align="right">
                                        <strong>{{ ucfirst($solicitud->vivienda_destino) }}</strong>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="color:#6F7F8D;">Fecha de recolección:</td>
                                    <td align="right"><strong>{{ $solicitud->fecha_recoleccion }}</strong></td>
                                </tr>

                                <tr>
                                    <td style="color:#6F7F8D;">Tipo mudanza:</td>
                                    <td align="right"><strong>{{ ucfirst($solicitud->tipo_mudanza) }}</strong></td>
                                </tr>

                                <tr>
                                    <td style="color:#6F7F8D;">Distancia estimada:</td>
                                    <td align="right">
                                        <strong>
                                            {{ $solicitud->distancia_km ? $solicitud->distancia_km . ' km' : 'No disponible' }}
                                        </strong>
                                    </td>
                                </tr>

                            </table>

                            <!-- Línea punteada -->
                            <div style="border-top:2px dashed #ABB0B4;margin:24px 0;"></div>

                            <!-- Mensaje final -->
                            <div style="text-align:center;font-size:14px;">
                                <p>
                                    Algún agente se pondrá en contacto con usted pronto.
                                </p>

                                <p style="color:#1C8F6A;font-weight:bold;margin-top:16px;">
                                    Gracias por confiar en Mudanza Fácil
                                </p>
                            </div>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background:#F4F7F6;padding:16px;text-align:center;">
                            <p style="font-size:12px;color:#6F7F8D;">
                                soporte@mudanzafacil.com.mx
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>
