<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Suscripción activada</title>
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
                            <h2 style="margin:0;color:#ffffff;font-family:Nunito;font-size:22px;">
                                🎉 ¡Ya tienes el Plan {{ $plan }} activo!
                            </h2>
                        </td>
                    </tr>

                    <!-- SUBHEADER -->
                    <tr>
                        <td style="background:#09233E;padding:0 24px 24px 24px;text-align:center;">
                            <p style="margin:0;color:#ffffff;font-family:Nunito;font-size:15px;line-height:1.5;">
                                ¡Bienvenido! A partir de ahora podrás aprovechar las oportunidades de la red .
                            </p>
                        </td>
                    </tr>

                    <!-- LOGO -->
                    <tr>
                        <td align="center" style="padding:20px;">
                            <img src="https://app.mudanzafacil.com.mx/logo/icon.png" style="height:60px;">
                        </td>
                    </tr>

                    <!-- CONTENT -->
                    <tr>
                        <td style="padding:24px;color:#4A5E71;">

                            <!-- INFO PRINCIPAL -->
                            <div style="text-align:center;margin-bottom:20px;">
                                <div style="font-size:14px;color:#6F7F8D;">Suscripción activa</div>

                                <div style="font-size:22px;font-weight:bold;color:#09233E;">
                                    Plan {{ $plan }}
                                </div>

                                <div style="font-size:12px;color:#6F7F8D;margin-top:4px;">
                                    {{ $inicio }} → {{ $fin }}
                                </div>
                            </div>

                            <div
                                style="margin-top:20px;padding:16px;border-radius:12px;background:#F4F7F6; margin-bottom: 20px;">

                                <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;">

                                    @if($plan === 'Conector')
                                    <tr>
                                        <td width="24" style="color:#1C8F6A;font-weight:bold;">✔</td>
                                        <td>Acceso a búsquedas y ofertas limitadas</td>
                                    </tr>
                                    <tr>
                                        <td width="24" style="color:#1C8F6A;font-weight:bold;">✔</td>
                                        <td>Conexiones mensuales</td>
                                    </tr>
                                    <tr>
                                        <td width="24" style="color:#1C8F6A;font-weight:bold;">✔</td>
                                        <td>Mejora tu visibilidad frente a clientes</td>
                                    </tr>
                                    @endif

                                    @if($plan === 'Radar')
                                    <tr>
                                        <td width="24" style="color:#1C8F6A;font-weight:bold;">✔</td>
                                        <td>Detectarás oportunidades automáticamente</td>
                                    </tr>
                                    <tr>
                                        <td width="24" style="color:#1C8F6A;font-weight:bold;">✔</td>
                                        <td>Recibirás coincidencias en tiempo real</td>
                                    </tr>
                                    <tr>
                                        <td width="24" style="color:#1C8F6A;font-weight:bold;">✔</td>
                                        <td>Tendrás ventaja sobre otras empresas</td>
                                    </tr>
                                    @endif

                                </table>

                            </div>

                            <!-- DETALLES -->
                            <div style="font-weight:bold;color:#09233E;margin-bottom:10px;">
                                📦 Detalles de suscripción
                            </div>

                            <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;">

                                <tr>
                                    <td style="color:#6F7F8D;">Empresa:</td>
                                    <td align="right"><strong>{{ $empresa->empresa }}</strong></td>
                                </tr>

                                <tr>
                                    <td style="color:#6F7F8D;">Plan:</td>
                                    <td align="right"><strong>{{ $plan }}</strong></td>
                                </tr>

                                <tr>
                                    <td style="color:#6F7F8D;">Inicio:</td>
                                    <td align="right"><strong>{{ $inicio }}</strong></td>
                                </tr>

                                <tr>
                                    <td style="color:#6F7F8D;">Vigencia:</td>
                                    <td align="right"><strong>{{ $fin }}</strong></td>
                                </tr>

                            </table>

                            <!-- DIVIDER -->
                            <div style="border-top:2px dashed #ABB0B4;margin:28px 0;"></div>

                            <!-- MENSAJE -->
                            <div style="text-align:center;font-size:14px;">
                                Entre más rapido te conectes, más oportunidades puedes encontrar
                            </div>

                        </td>
                    </tr>

                    <!-- CTA -->
                    <tr>
                        <td align="center" style="padding:24px;">
                            <a href="https://app.mudanzafacil.com.mx/empresa/dashboard" target="_blank"
                                style="display:inline-block;padding:12px 32px;background:#09233E;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;font-size:16px;">
                                Ir a la plataforma
                            </a>
                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td style="background:#F4F7F6;padding:16px;text-align:center;">
                            <p style="font-size:12px;color:#6F7F8D;">
                                Si tienes alguna duda sobre tu suscripción puedes responder directamente a este correo:
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