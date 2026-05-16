<!DOCTYPE html>

<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Radar de coincidencias</title>
</head>

<body style="margin:0;padding:0;background:#F4F7F6;font-family:Inter,Arial;">

```
<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center" style="padding:40px 16px;">

            <table width="100%" cellpadding="0" cellspacing="0"
                style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 20px rgba(0,0,0,0.05);">

                <!-- HEADER -->
                <tr>
                    <td style="background:#09233E;padding:24px;text-align:center;">
                        <h2 style="margin:0;color:#ffffff;font-size:22px;">
                            <img src="https://res.cloudinary.com/dt3jhwxfw/image/upload/v1774507504/iconMatch_e2garj.png"
                                style="margin-right:10px;height:30px;vertical-align:middle;">
                            Nuevas coincidencias encontradas
                        </h2>
                    </td>
                </tr>

                <!-- RUTA -->
                <tr>
                    <td style="background:#ECEBEF;padding:24px;text-align:center;">
                        <p style="margin:0;color:#011430;font-size:15px;">
                            Se detectaron nuevas oportunidades para tu ruta:
                        </p>
                        <strong style="color:#0A233F;">
                            {{ $servicio->origen }} → {{ $servicio->destino }}
                        </strong>
                    </td>
                </tr>

                <!-- LOGO -->
                <tr>
                    <td align="center" style="padding:20px;">
                        <img src="https://app.mudanzafacil.com.mx/logo/logo_B.png" style="height:60px;">
                    </td>
                </tr>

                <!-- CONTENIDO -->
                <tr>
                    <td style="padding:24px;color:#4A5E71;">

                        {{-- EMPTY --}}
                        @if (
                            $serviciosBusco->count() === 0 &&
                            $serviciosOfrezco->count() === 0 &&
                            $solicitudesMatches->count() === 0
                        )
                        <p style="text-align:center;">
                            No se encontraron coincidencias nuevas por el momento.
                        </p>
                        @endif

                        {{-- ===== BUSCO ===== --}}
                        @if ($serviciosBusco->count() > 0)
                        <div style="margin-bottom:20px;">
                            <div style="font-weight:bold;color:#0D355B;text-align:center;margin-bottom:10px;">
                                🔍 Empresas que necesitan carga
                            </div>

                            @foreach ($serviciosBusco as $item)
                            <div style="background:#F9FAFB;padding:14px;border-radius:10px;border:1px solid #E5E7EB;margin-bottom:12px;">

                                <div style="margin-bottom:6px;">
                                    <span style="background:#0D355B;color:#fff;font-size:11px;padding:3px 8px;border-radius:6px;">
                                        BUSCO
                                    </span>
                                </div>

                                <div style="margin-bottom:4px;">
                                    <strong style="color:#4A5E71;">Ruta:</strong>
                                    <span style="color:#011430;">
                                        {{ $item->origen }} → {{ $item->destino }}
                                    </span>
                                </div>

                                <a href="https://app.mudanzafacil.com.mx/servicios/{{ $item->id }}"
                                    style="font-size:13px;color:#09233E;text-decoration:none;">
                                    Ver servicio
                                </a>

                            </div>
                            @endforeach
                        </div>
                        @endif

                        {{-- ===== OFREZCO ===== --}}
                        @if ($serviciosOfrezco->count() > 0)
                        <div style="margin-bottom:20px;">
                            <div style="font-weight:bold;color:#17785A;text-align:center;margin-bottom:10px;">
                                🚛 Empresas con espacio disponible
                            </div>

                            @foreach ($serviciosOfrezco as $item)
                            <div style="background:#F9FAFB;padding:14px;border-radius:10px;border:1px solid #E5E7EB;margin-bottom:12px;">

                                <div style="margin-bottom:6px;">
                                    <span style="background:#17785A;color:#fff;font-size:11px;padding:3px 8px;border-radius:6px;">
                                        OFREZCO
                                    </span>
                                </div>

                                <div style="margin-bottom:4px;">
                                    <strong style="color:#4A5E71;">Ruta:</strong>
                                    <span style="color:#011430;">
                                        {{ $item->origen }} → {{ $item->destino }}
                                    </span>
                                </div>

                                <a href="https://app.mudanzafacil.com.mx/servicios/{{ $item->id }}"
                                    style="font-size:13px;color:#09233E;text-decoration:none;">
                                    Ver servicio
                                </a>

                            </div>
                            @endforeach
                        </div>
                        @endif

                        {{-- ===== SOLICITUDES ===== --}}
                        @if ($solicitudesMatches->count() > 0)
                        <div style="margin-bottom:20px;">
                            <div style="font-weight:bold;color:#F59E0B;text-align:center;margin-bottom:10px;">
                                📦 Clientes buscando mudanza
                            </div>

                            @foreach ($solicitudesMatches as $item)
                            <div style="background:#F9FAFB;padding:14px;border-radius:10px;border:1px solid #E5E7EB;margin-bottom:12px;">

                                <div style="margin-bottom:6px;">
                                    <span style="background:#F59E0B;color:#fff;font-size:11px;padding:3px 8px;border-radius:6px">
                                        CONTACTO
                                    </span>
                                </div>

                                <div style="margin-bottom:4px;">
                                    <strong style="color:#4A5E71;">Ruta:</strong>
                                    <span style="color:#011430;">
                                        {{ $item->origen }} → {{ $item->destino }}
                                    </span>
                                </div>

                                <div style="margin-bottom:4px;">
                                    <strong style="color:#4A5E71;">Tipo:</strong>
                                    {{ $item->tipo_mudanza }}
                                </div>

                                <a href="https://app.mudanzafacil.com.mx/empresa/login"
                                    style="font-size:13px;color:#09233E;text-decoration:none;">
                                    Ver contacto
                                </a>

                            </div>
                            @endforeach
                        </div>
                        @endif

                        <!-- MENSAJE -->
                        <div style="margin-top:10px; text-align: center;">
                            <p>
                                💡 <strong style="color:#011430;">Estas oportunidades pueden coincidir</strong>
                                con tu ruta y ayudarte a generar ingresos adicionales.
                            </p>
                        </div>

                        <div style="border-top:2px dashed #ABB0B4;margin:24px 0;"></div>

                        <div style="text-align:center;font-size:14px;">
                            Consulta estas oportunidades dentro de la plataforma.
                        </div>

                    </td>
                </tr>

                <!-- CTA -->
                <tr>
                    <td align="center" style="padding:24px;">
                        <a href="https://app.mudanzafacil.com.mx/empresa/login"
                            style="display:inline-block;padding:12px 32px;background:#09233E;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;font-size:16px;">
                            Explorar publicaciones
                        </a>
                    </td>
                </tr>

                <!-- FOOTER -->
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
```

</body>
</html>