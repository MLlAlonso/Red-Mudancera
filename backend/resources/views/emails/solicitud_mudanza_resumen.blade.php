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
                            <img src="https://app.mudanzafacil.com.mx/logo/icon.png" alt="Mudanza Fácil"
                                style="height:60px;">
                        </td>
                    </tr>


                    <!-- ================= ÉXITO ================= -->
                    <tr>
                        <td style="padding:24px;color:#4A5E71;text-align:center;">

                            <!-- Título -->
                            <h3 style="margin:0;color:#09233E;font-size:18px;">
                                ¡Tu solicitud ya está en la red!
                            </h3>

                            <!-- Texto -->
                            <p style="margin:12px 0 20px;">
                                Empresas de mudanza verificadas ya pueden ver tu solicitud y enviarte cotizaciones.
                            </p>

                            <!-- Item 1 -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                                <tr>
                                    <td align="center">
                                        <img src="https://app.mudanzafacil.com.mx/icons/tel.png"
                                            style="height:20px;margin-right:6px;vertical-align:middle;">
                                        <span style="font-size:14px;">
                                            Comenzarás a recibir propuestas por <strong>WhatsApp</strong> o teléfono
                                        </span>
                                    </td>
                                </tr>
                            </table>

                            <!-- Item 2 -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                                <tr>
                                    <td align="center">
                                        <img src="https://app.mudanzafacil.com.mx/icons/verificado.png"
                                            style="height:20px;margin-right:6px;vertical-align:middle;">
                                        <span style="font-size:14px;">
                                            Solo trabajamos con <strong>empresas validadas</strong> para tu seguridad
                                        </span>
                                    </td>
                                </tr>
                            </table>

                            <!-- Subtitulo -->
                            <h4 style="margin:16px 0 10px;color:#09233E;">
                                No olvides proteger tu mudanza
                            </h4>

                            <!-- Botón -->
                            <a href="https://mudanzafacil.com.mx/seguro-para-mudanzas/" style="display:inline-block;background:#1C8F6A;color:#ffffff;
                  padding:12px 20px;border-radius:8px;text-decoration:none;
                  font-weight:bold;font-size:14px;">
                                Recibir información
                            </a>

                            <!-- Texto final -->
                            <p style="margin-top:16px;font-size:13px;">
                                Respuesta rápida, sin compromiso y con grandes ventajas
                            </p>

                        </td>
                    </tr>

                    <!-- Línea final -->
                    <div style="border-top:2px dashed #ABB0B4;margin:28px 0;"></div>


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

                            <!-- ================= ORIGEN ================= -->
                            <div style="margin-top:24px;">
                                <div style="font-weight:bold;color:#09233E;font-size:15px;margin-bottom:8px;">
                                    📍 Origen
                                </div>

                                <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;">
                                    <tr>
                                        <td style="color:#6F7F8D;">Ubicación:</td>
                                        <td align="right"><strong>{{ $solicitud->origen }}</strong></td>
                                    </tr>

                                    <tr>
                                        <td style="color:#6F7F8D;">Tipo vivienda:</td>
                                        <td align="right"><strong>{{ ucfirst($solicitud->tipo_vivienda) }}</strong>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="color:#6F7F8D;">Pisos:</td>
                                        <td align="right"><strong>{{ $solicitud->origen_pisos ?? '—' }}</strong></td>
                                    </tr>

                                    <tr>
                                        <td style="color:#6F7F8D;">Elevador:</td>
                                        <td align="right"><strong>{{ $solicitud->origen_elevador ?? '—' }}</strong>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="color:#6F7F8D;">Acarreo:</td>
                                        <td align="right"><strong>{{ $solicitud->origen_acarreo ?? '—' }}</strong></td>
                                    </tr>
                                </table>
                            </div>

                            <!-- ================= DESTINO ================= -->
                            <div style="margin-top:28px;">
                                <div style="font-weight:bold;color:#09233E;font-size:15px;margin-bottom:8px;">
                                    🚚 Destino
                                </div>

                                <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;">
                                    <tr>
                                        <td style="color:#6F7F8D;">Ubicación:</td>
                                        <td align="right"><strong>{{ $solicitud->destino }}</strong></td>
                                    </tr>

                                    <tr>
                                        <td style="color:#6F7F8D;">Tipo vivienda:</td>
                                        <td align="right"><strong>{{ ucfirst($solicitud->vivienda_destino) }}</strong>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="color:#6F7F8D;">Pisos:</td>
                                        <td align="right"><strong>{{ $solicitud->destino_pisos ?? '—' }}</strong></td>
                                    </tr>

                                    <tr>
                                        <td style="color:#6F7F8D;">Elevador:</td>
                                        <td align="right"><strong>{{ $solicitud->destino_elevador ?? '—' }}</strong>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="color:#6F7F8D;">Acarreo:</td>
                                        <td align="right"><strong>{{ $solicitud->destino_acarreo ?? '—' }}</strong>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <!-- ================= DETALLES ================= -->
                            <div style="margin-top:28px;">
                                <div style="font-weight:bold;color:#09233E;font-size:15px;margin-bottom:8px;">
                                    📦 Detalles del servicio
                                </div>

                                <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;">
                                    <tr>
                                        <td style="color:#6F7F8D;">Inventario:</td>
                                        <td align="right">
                                            <strong>{{ $solicitud->inventario }}</strong>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="color:#6F7F8D;">Fecha estimada:</td>
                                        <td align="right">
                                            <strong>{{ $solicitud->fecha_recoleccion }} días</strong>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="color:#6F7F8D;">Tipo mudanza:</td>
                                        <td align="right">
                                            <strong>{{ ucfirst($solicitud->tipo_mudanza) }}</strong>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="color:#6F7F8D;">Distancia estimada:</td>
                                        <td align="right">
                                            <strong>
                                                {{ $solicitud->distancia_km ? $solicitud->distancia_km . ' km' : 'No
                                                disponible' }}
                                            </strong>
                                        </td>
                                    </tr>

                                </table>
                            </div>

                            <!-- ================= CONTACTO ================= -->
                            <div style="margin-top:28px;">
                                <div style="font-weight:bold;color:#09233E;font-size:15px;margin-bottom:8px;">
                                    👤 Datos de contacto
                                </div>

                                <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;">

                                    <tr>
                                        <td style="color:#6F7F8D;">Nombre:</td>
                                        <td align="right"><strong>{{ $solicitud->nombre }}</strong></td>
                                    </tr>

                                    <tr>
                                        <td style="color:#6F7F8D;">Email:</td>
                                        <td align="right"><strong>{{ $solicitud->email }}</strong></td>
                                    </tr>

                                    <tr>
                                        <td style="color:#6F7F8D;">Teléfono:</td>
                                        <td align="right"><strong>{{ $solicitud->telefono }}</strong></td>
                                    </tr>

                                </table>
                            </div>

                            <!-- Línea final -->
                            <div style="border-top:2px dashed #ABB0B4;margin:28px 0;"></div>

                            <div style="text-align:center;font-size:14px;">
                                <p>
                                    Algún agente se pondrá en contacto contigo pronto.
                                </p>

                                <p style="color:#1C8F6A;font-weight:bold;margin-top:16px;">
                                    Gracias por confiar en Mudanza Fácil
                                </p>
                            </div>

                        </td>
                    </tr>

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