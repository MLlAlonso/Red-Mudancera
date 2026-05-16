<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Tu prueba ha terminado</title>
</head>

<body style="margin:0;padding:0;background:#F4F7F6;font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 16px;">

                <table width="100%" cellpadding="0" cellspacing="0"
                    style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 20px rgba(0,0,0,0.05);">

                    <!-- HEADER -->
                    <tr>
                        <td style="background:#09233E;padding:24px;text-align:center;">
                            <h2 style="margin:0;color:#ffffff;font-size:22px;">
                                ⚠️ Tu prueba ha finalizado
                            </h2>
                        </td>
                    </tr>

                    <!-- SUBHEADER -->
                    <tr>
                        <td style="background:#09233E;padding:0 24px 24px 24px;text-align:center;">
                            <p style="margin:0;color:#ffffff;font-size:15px;line-height:1.5;">
                                Tu acceso completo a Radar ya no está disponible.
                            </p>
                        </td>
                    </tr>

                    <!-- LOGO -->
                    <tr>
                        <td align="center" style="padding:20px;">
                            <img src="https://app.mudanzafacil.com.mx/logo/logo_B.png" style="height:60px;">
                        </td>
                    </tr>

                    <!-- BODY -->
                    <tr>
                        <td style="padding:24px;color:#4A5E71;">

                            <p>
                                Hola <strong>{{ $empresa->empresa }}</strong>,
                            </p>

                            <p>
                                Tu prueba gratuita ha finalizado.
                            </p>

                            <p>
                                Tu cuenta sigue activa en modo exploración, pero con funcionalidades limitadas.
                            </p>

                            <!-- LIMITACIONES -->
                            <div style="
                                margin-top:20px;
                                padding:16px;
                                border-radius:12px;
                                background:#F4F7F6;
                                border:1px solid #E8ECEB;
                            ">
                                <div style="font-weight:bold;color:#09233E;margin-bottom:10px;">
                                    🔒 Actualmente tienes acceso limitado
                                </div>

                                <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;">
                                    <tr>
                                        <td width="24" style="color:#ABB0B4;">✖</td>
                                        <td>Sin coincidencias automáticas</td>
                                    </tr>
                                    <tr>
                                        <td style="color:#ABB0B4;">✖</td>
                                        <td>Sin oportunidades en tiempo real</td>
                                    </tr>
                                    <tr>
                                        <td style="color:#ABB0B4;">✖</td>
                                        <td>Sin prioridad frente a otras empresas</td>
                                    </tr>
                                </table>
                            </div>

                            <!-- MENSAJE DE EMPUJE -->
                            <div style="margin-top:20px;text-align:center;font-size:14px;">
                                Activa un plan para recuperar todas las funcionalidades y seguir generando oportunidades dentro de la red.
                            </div>

                        </td>
                    </tr>

                    <!-- CTA -->
                    <tr>
                        <td align="center" style="padding:24px;">
                            <a href="https://app.mudanzafacil.com.mx/empresa/planes" target="_blank"
                                style="display:inline-block;padding:12px 32px;background:#09233E;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;font-size:16px;">
                                Activar plan
                            </a>
                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td style="background:#F4F7F6;padding:16px;text-align:center;">
                            <p style="font-size:12px;color:#6F7F8D;">
                                Si tienes alguna duda puedes responder directamente a este correo:<br>
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