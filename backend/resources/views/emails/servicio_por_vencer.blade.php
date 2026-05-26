<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Servicio por vencer</title>
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
                                ⏳ Servicio por vencer
                            </h2>
                        </td>
                    </tr>

                    <!-- SUBHEADER -->
                    <tr>
                        <td style="background:#09233E;padding:0 24px 24px 24px;text-align:center;">
                            <p style="margin:0;color:#ffffff;font-size:15px;line-height:1.5;">
                                Tu servicio expirará en menos de 24 horas.
                            </p>
                        </td>
                    </tr>

                    <!-- LOGO -->
                    <tr>
                        <td align="center" style="padding:20px;">
                            <img src="https://app.mudanzafacil.com.mx/logo/icon.png" style="height:60px;">
                        </td>
                    </tr>

                    <!-- BODY -->
                    <tr>
                        <td style="padding:24px;color:#4A5E71;">
                            <p>
                                Hola <strong>{{ $empresa->empresa }}</strong>,
                            </p>

                            <p>
                                El siguiente servicio está próximo a vencer:
                            </p>

                            <div style=" margin-top:20px; padding:18px; border-radius:12px; background:#FFF7ED; border:1px solid #FED7AA; ">
                                <table width="100%" cellpadding="6" cellspacing="0">
                                    <tr>
                                        <td width="140">
                                            <strong style="color:#09233E;">
                                                Ruta
                                            </strong>
                                        </td>

                                        <td>
                                            {{ $servicio->origen }}
                                            →
                                            {{ $servicio->destino }}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <strong style="color:#09233E;">
                                                Tipo de carga
                                            </strong>
                                        </td>

                                        <td>
                                            {{ $servicio->tipo_carga }}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <strong style="color:#09233E;">
                                                Estado actual
                                            </strong>
                                        </td>

                                        <td>
                                            {{ $servicio->estado }}
                                        </td>
                                    </tr>

                                </table>
                            </div>
                        </td>
                    </tr>

                    <!-- CTA -->
                    <tr>
                        <td align="center" style="padding:24px;">
                            <a href="https://app.mudanzafacil.com.mx/empresa/dashboard" target="_blank"
                                style="display:inline-block;padding:12px 32px;background:#09233E;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;font-size:16px;">
                                Ver servicio
                            </a>
                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td style="background:#F4F7F6;padding:16px;text-align:center;">
                            <p style="font-size:12px;color:#6F7F8D;">
                                MudanzaFácil®.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>