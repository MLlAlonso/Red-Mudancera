<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Radar de coincidencias</title>
</head>

<body style="margin:0;padding:0;background:#F4F7F6;font-family:Inter,Arial;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 16px;">

                <table width="100%" cellpadding="0" cellspacing="0"
                    style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 20px rgba(0,0,0,0.05);">

                    <tr>
                        <td style="background:#09233E;padding:24px;text-align:center;">
                            <h2 style="margin:0;color:#ffffff;font-family:Nunito;font-size:22px;">
                                🚛 Nuevas coincidencias encontradas
                            </h2>
                        </td>
                    </tr>

                    <tr>
                        <td style="background:#09233E;padding:0 24px 24px 24px;text-align:center;">
                            <p style="margin:0;color:#ffffff;font-size:15px;">
                                Se detectaron nuevas oportunidades para tu ruta:
                            </p>
                            <strong style="color:#ffffff;">
                                {{ $servicio->origen }} → {{ $servicio->destino }}
                            </strong>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:20px;">
                            <img src="https://app.mudanzafacil.com.mx/logo/logo_A.png" style="height:60px;">
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:24px;color:#4A5E71;">

                            {{-- SERVICIOS --}}
                            @if ($serviciosMatches->count() > 0)
                                <div style="font-weight:bold;color:#09233E;margin-bottom:10px;">
                                    🔗 Servicios disponibles
                                </div>

                                @foreach ($serviciosMatches as $servicioMatch)
                                    <div
                                        style="padding:12px;border:1px solid #E5E7EB;border-radius:8px;margin-bottom:10px;">
                                        <div style="font-weight:bold;">
                                            {{ $servicioMatch->origen }} → {{ $servicioMatch->destino }}
                                        </div>

                                        <a href="https://app.mudanzafacil.com.mx/servicios/{{ $servicioMatch->id }}"
                                            style="font-size:13px;color:#2563EB;text-decoration:none;">
                                            Ver servicio
                                        </a>
                                    </div>
                                @endforeach
                            @endif

                            {{-- SOLICITUDES --}}
                            @if ($solicitudesMatches->count() > 0)
                                <div style="font-weight:bold;color:#09233E;margin:20px 0 10px;">
                                    📦 Contactos disponibles
                                </div>

                                @foreach ($solicitudesMatches as $solicitud)
                                    <div
                                        style="padding:12px;border:1px solid #E5E7EB;border-radius:8px;margin-bottom:10px;">
                                        <div style="font-weight:bold;">
                                            {{ $solicitud->origen }} → {{ $solicitud->destino }}
                                        </div>

                                        <a href="https://app.mudanzafacil.com.mx/solicitudes/{{ $solicitud->id }}"
                                            style="font-size:13px;color:#2563EB;text-decoration:none;">
                                            Ver contacto
                                        </a>
                                    </div>
                                @endforeach
                            @endif

                            <div style="border-top:2px dashed #ABB0B4;margin:28px 0;"></div>

                            <div style="text-align:center;font-size:14px;">
                                Consulta estas oportunidades dentro de la plataforma.
                            </div>

                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:24px;">
                            <a href="https://app.mudanzafacil.com.mx/empresa/notificaciones" target="_blank"
                                style="display:inline-block;padding:12px 32px;background:#09233E;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;font-size:16px;">
                                Ver oportunidades ahora
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td style="background:#F4F7F6;padding:16px;text-align:center;">
                            <p style="font-size:12px;color:#6F7F8D;">
                                Estás recibiendo este correo porque tienes servicios activos en Mudanza Fácil.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>
