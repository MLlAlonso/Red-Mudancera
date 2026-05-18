<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Cuenta verificada</title>
</head>

<body style="margin:0;padding:0;background:#F4F7F6;font-family:Inter,Arial;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 16px;">

                <table width="100%" cellpadding="0" cellspacing="0"
                    style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 20px rgba(0,0,0,0.05);">

                    <!-- HEADER -->
                    <tr>
                        <td style="background:#09233E;padding:24px;text-align:center;">
                            <h2 style="margin:0;color:#ffffff;font-family:Nunito;font-size:24px;">
                                🎉 ¡Tu cuenta ha sido verificada!
                            </h2>
                        </td>
                    </tr>

                    <!-- SUBHEADER -->
                    <tr>
                        <td style="background:#09233E;padding:0 24px 24px;text-align:center;">
                            <p style="margin:0;color:#ffffff;font-size:15px;line-height:1.5;">
                                Ya puedes comenzar a utilizar todas las ventajas de Radar.
                            </p>
                        </td>
                    </tr>

                    <!-- LOGO -->
                    <tr>
                        <td align="center" style="padding:24px;">
                            <img src="https://app.mudanzafacil.com.mx/logo/icon.png" style="height:60px;" >
                        </td>
                    </tr>

                    <!-- BODY -->
                    <tr>
                        <td style="padding:24px;color:#4A5E71;">
                            <p>
                                Hola <strong>{{ $empresa->empresa }}</strong>,
                            </p>

                            <p>
                                Tu empresa fue aprobada correctamente y ahora cuentas con acceso al plan <strong>Radar</strong> en modalidad de prueba gratuita durante 30 días.
                            </p>

                            <!-- BENEFICIOS -->
                            <div style=" margin-top:24px; padding:18px; border-radius:14px; background:#F4F7F6; border:1px solid #E8ECEB; ">
                                <div style=" font-weight:bold; color:#09233E; margin-bottom:12px; ">
                                    Beneficios activos
                                </div>

                                <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;">
                                    <tr>
                                        <td width="24" style="color:#1C8F6A;font-weight:bold;">
                                            ✔
                                        </td>

                                        <td>
                                            Coincidencias automáticas de servicios
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="color:#1C8F6A;font-weight:bold;">
                                            ✔
                                        </td>

                                        <td>
                                            Oportunidades en tiempo real
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="color:#1C8F6A;font-weight:bold;">
                                            ✔
                                        </td>

                                        <td>
                                            Ventaja frente a otras empresas
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="color:#1C8F6A;font-weight:bold;">
                                            ✔
                                        </td>

                                        <td>
                                            Acceso completo al sistema Radar
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <!-- DETALLES -->
                            <div style=" margin-top:28px; font-weight:bold; color:#09233E; margin-bottom:10px; ">
                                📦 Detalles del trial
                            </div>

                            <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;" >
                                <tr>
                                    <td style="color:#6F7F8D;">
                                        Empresa:
                                    </td>

                                    <td align="right">
                                        <strong>{{ $empresa->empresa }}</strong>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="color:#6F7F8D;">
                                        Plan:
                                    </td>

                                    <td align="right">
                                        <strong>Radar Trial</strong>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="color:#6F7F8D;">
                                        Inicio:
                                    </td>

                                    <td align="right">
                                        <strong>{{ $inicio }}</strong>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="color:#6F7F8D;">
                                        Finaliza:
                                    </td>

                                    <td align="right">
                                        <strong>{{ $fin }}</strong>
                                    </td>
                                </tr>
                            </table>

                            <!-- DIVIDER -->
                            <div style=" border-top:2px dashed #ABB0B4; margin:28px 0; "></div>

                            <!-- MENSAJE -->
                            <div style=" text-align:center; font-size:14px; ">
                                Mientras más rápido actives Radar, más oportunidades podrás detectar dentro de la red.
                            </div>
                        </td>
                    </tr>

                    <!-- CTA -->
                    <tr>
                        <td align="center" style="padding:24px;">
                            <a href="https://app.mudanzafacil.com.mx/empresa/dashboard" target="_blank"
                                style=" display:inline-block; padding:12px 32px; background:#09233E; color:#fff; text-decoration:none; border-radius:8px; font-weight:bold; font-size:16px;"
                            >
                                Ir a la plataforma
                            </a>
                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td style=" background:#F4F7F6; padding:16px; text-align:center; ">
                            <p style=" font-size:12px; color:#6F7F8D; ">
                                Si tienes dudas puedes responder directamente a este correo:<br>
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