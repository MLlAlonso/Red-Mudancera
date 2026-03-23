<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Verificación de solicitud</title>
</head>

<body style="margin:0;padding:0;background:#F4F7F6;font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F7F6;">
        <tr>
            <td align="center" style="padding:30px 16px;">

                <!-- CONTENEDOR -->
                <table width="100%" cellpadding="0" cellspacing="0"
                    style="max-width:520px;background:#ffffff;border-radius:14px;overflow:hidden;">

                    <!-- HEADER -->
                    <tr>
                        <td style="background:#0B2A47;padding:24px;text-align:center;">
                            <h2 style="margin:0;color:#ffffff;font-size:22px;">
                                Verifica tu solicitud de mudanza
                            </h2>
                        </td>
                    </tr>

                    <!-- LOGO -->
                    <tr>
                        <td align="center" style="padding:24px 20px 10px;">
                            <img src="https://app.mudanzafacil.com.mx/logo/logo_A.png" alt="Mudanza Fácil"
                                style="height:60px;">
                        </td>
                    </tr>

                    <!-- TEXTO PRINCIPAL -->
                    <tr>
                        <td style="padding:10px 28px;text-align:center;color:#2D3E50;">
                            <p style="margin:0 0 10px;font-size:18px;font-weight:bold;">
                                Estamos validando tu solicitud para conectarte con empresas reales y confiables.
                            </p>

                            <p style="margin:20px 0 10px;font-size:15px;">
                                Para continuar, ingresa el siguiente <strong>código:</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- CODIGO -->
                    <tr>
                        <td align="center" style="padding:10px 0 20px;">
                            <div style="font-size:36px;letter-spacing:8px;font-weight:bold;color:#2FA77A;">
                                {{ $code }}
                            </div>
                        </td>
                    </tr>

                    <!-- EXPIRACIÓN -->
                    <tr>
                        <td align="center" style="padding:0 20px 20px;">
                            <p style="font-size:14px;color:#6F7F8D;margin:0;">
                                Este código es válido por <strong style="color: #000000; font-weight: bold;">5
                                    minutos</strong> por tu seguridad
                            </p>
                        </td>
                    </tr>

                    <!-- BLOQUE INFO -->
                    <tr>
                        <td style="padding:0 20px 20px;">

                            <!-- CONTENEDOR AZUL -->
                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="background:#E8EFF7;border-radius:12px;">
                                <tr>

                                    <!-- TEXTO -->
                                    <td style="padding:16px;vertical-align:top;width:65%;">

                                        <!-- TÍTULO -->
                                        <p style="margin:0 0 12px;font-weight:700;font-size:16px;color:#000000;">
                                            ¿Por qué verificamos tu correo?
                                        </p>

                                        <!-- BLOQUE BLANCO -->
                                        <table width="100%" cellpadding="0" cellspacing="0"
                                            style="background:#ffffff;border-radius:15px;padding:8px;">
                                            <tr>
                                                <td style="font-size:14px;color:#2D3E50;">

                                                    <p style="margin:6px 0;">
                                                        <span style="color:#2FA77A;font-weight:bold;">✔</span>
                                                        <strong
                                                            style="font-weight: 700; color: #000000;">Evitamos</strong>
                                                        solicitudes falsas o duplicadas
                                                    </p>

                                                    <p style="margin:6px 0;">
                                                        <span style="color:#2FA77A;font-weight:bold;">✔</span>
                                                        <strong style="font-weight: 700; color: #000000;">Solo
                                                            empresas</strong>
                                                        reales podrán cotizarte
                                                    </p>

                                                    <p style="margin:6px 0;">
                                                        <span style="color:#2FA77A;font-weight:bold;">✔</span>
                                                        <strong
                                                            style="font-weight: 700; color: #000000;">Recibes</strong>
                                                        opciones más rápidas y confiables
                                                    </p>

                                                </td>
                                            </tr>
                                        </table>

                                    </td>

                                    <!-- IMAGEN -->
                                    <td align="center" style="padding-right: 5px;vertical-align:middle;width:35%;">
                                        <img src="https://res.cloudinary.com/dt3jhwxfw/image/upload/v1774235071/correo_verificado_zjtfig.png"
                                            alt="Verificación"
                                            style="max-width:180px;width:100%;height:auto;display:block;">
                                    </td>

                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- DISCLAIMER -->
                    <tr>
                        <td style="padding:0 20px 20px;">
                            <table width="100%" style="background:#EDEFF1;border-radius:10px;padding:16px;">
                                <tr>
                                    <td style="font-size:13px;color:#5F6F7F;text-align:center;">
                                        Si no solicitaste una mudanza, puedes ignorar este mensaje sin problema.
                                        <br>
                                        Tu información está protegida con nosotros.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- AYUDA -->
                    <tr>
                        <td align="center" style="padding:10px 20px 20px;">
                            <p style="margin:0 0 8px;font-weight:bold;color:#2D3E50;">
                                ¿Necesitas ayuda?
                            </p>

                            <a href="mailto:soporte@mudanzafacil.com.mx" style="color:#1C8F6A;text-decoration:none;">
                                soporte@mudanzafacil.com.mx
                            </a>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>
