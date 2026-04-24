<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Compra de créditos</title>
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
                                COMPRA CONFIRMADA - Tus créditos ya están disponibles
                            </h2>
                        </td>
                    </tr>

                    <tr>
                        <td style="background:#09233E;padding:0 24px 24px 24px;text-align:center;">
                            <p style="margin:0;color:#ffffff;font-family:Nunito;font-size:15px;line-height:1.5;">
                                Gracias por tu compra. Tus créditos ya fueron agregados correctamente a tu cuenta y
                                están
                                disponibles para usarse en Mudanza Fácil.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:20px;">
                            <img src="https://app.mudanzafacil.com.mx/logo/logo_A.png" style="height:60px;">
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:24px;color:#4A5E71;">

                            <div style="text-align:center;margin-bottom:20px;">
                                <div style="font-size:14px;color:#6F7F8D;">Folio</div>

                                <div style="font-size:22px;font-weight:bold;color:#09233E;letter-spacing:2px;">
                                    {{ $folio }}
                                </div>

                                <div style="font-size:12px;color:#6F7F8D;margin-top:4px;">
                                    {{ $fecha }}
                                </div>
                            </div>

                            <div style="font-weight:bold;color:#09233E;margin-bottom:10px;">
                                🧾 Detalles de compra
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
                                    <td style="color:#6F7F8D;">Créditos agregados:</td>
                                    <td align="right"><strong>{{ $creditos }}</strong></td>
                                </tr>

                            </table>

                            <div style="border-top:2px dashed #ABB0B4;margin:28px 0;"></div>

                            <div style="text-align:center;font-size:14px;">
                                Tus créditos han sido añadidos correctamente a tu cuenta. Ya puedes utilizarlos para
                                adquirir contactos de mudanza dentro de la red.
                            </div>

                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:24px;">
                            <a href="https://app.mudanzafacil.com.mx/empresa/login" target="_blank"
                                style="display:inline-block;padding:12px 32px;background:#09233E;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;font-size:16px;">
                                Ir a Mudanza Fácil
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td style="background:#F4F7F6;padding:16px;text-align:center;">
                            <p style="font-size:12px;color:#6F7F8D;">
                                Si tienes alguna duda sobre tu compra puedes responder directamente a este correo:
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
