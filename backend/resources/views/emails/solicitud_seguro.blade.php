<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Solicitud de información de seguro</title>
</head>

<body style="margin:0;padding:0;background:#F4F7F6;font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 16px;">

                <table width="100%" cellpadding="0" cellspacing="0"
                    style="max-width:500px;background:#ffffff;border-radius:14px;overflow:hidden;">

                    <!-- HEADER -->
                    <tr>
                        <td style="background:#09233E;padding:24px;text-align:center;">
                            <h2 style="margin:0;color:#ffffff;font-size:22px;">
                                Nuevo interesado en seguro de mudanza
                            </h2>
                        </td>
                    </tr>

                    <!-- LOGO -->
                    <tr>
                        <td align="center" style="padding:20px;">
                            <img src="https://app.mudanzafacil.com.mx/logo/logo_A.png" alt="Mudanza Fácil"
                                style="height:60px;">
                        </td>
                    </tr>

                    <!-- BODY -->
                    <tr>
                        <td style="padding:24px;color:#4A5E71;">

                            <p>
                                Un usuario ha solicitado recibir información sobre la protección de mudanza
                                disponible en la plataforma.
                            </p>

                            <hr style="margin:20px 0;">

                            <!-- DATOS PERSONALES -->
                            <h4 style="margin-bottom:10px;color:#09233E;">
                                👤 Datos de contacto
                            </h4>

                            <p><strong>Nombre:</strong> {{ $solicitud->nombre }}</p>
                            <p><strong>Correo:</strong> {{ $solicitud->email }}</p>
                            <p><strong>Teléfono:</strong> {{ $solicitud->telefono }}</p>

                            <hr style="margin:20px 0;">

                            <!-- DATOS MUDANZA -->
                            <h4 style="margin-bottom:10px;color:#09233E;">
                                📦 Detalles de la mudanza
                            </h4>

                            <p><strong>Origen:</strong> {{ $solicitud->origen }}</p>
                            <p><strong>Destino:</strong> {{ $solicitud->destino }}</p>

                            <hr style="margin:20px 0;">

                            <!-- INVENTARIO -->
                            <h4 style="margin-bottom:10px;color:#09233E;">
                                📝 Inventario declarado
                            </h4>

                            <div style="padding:12px;border:1px solid #eee;border-radius:8px;background:#fafafa;">
                                {{ $solicitud->inventario }}
                            </div>

                            <hr style="margin:20px 0;">

                            <!-- CTA -->
                            <p style="margin-top:20px;">
                                Se recomienda contactar al cliente a la brevedad para brindarle información detallada
                                sobre la protección disponible.
                            </p>

                            <div style="text-align:center;">
                                <a href="{{ $whatsappUrl }}" target="_blank"
                                    style="display:inline-block;margin-top:10px;padding:12px 20px;background:#1C8F6A;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;">
                                    Contactar por WhatsApp
                                </a>
                            </div>

                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td style="padding:20px;text-align:center;">
                            <p style="font-size:12px;color:#999;">
                                Mudanza Fácil · Sistema de solicitudes
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>
