<!DOCTYPE html>

<html lang="es">

<head>
    <meta charset="UTF-8">
    <title> Expediente de seguro finalizado </title>
</head>

<body style="margin:0; padding:0; background:#F4F7F6; font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 16px;">

                <table width="100%" cellpadding="0" cellspacing="0"
                    style="max-width:650px; background:#ffffff; border-radius:16px; overflow:hidden;">
                    <tr>
                        <td style=" background:#09233E; padding:28px 24px; text-align:center; ">
                            <h1 style=" margin:0; color:#ffffff; font-size:22px; ">
                                Expediente de seguro finalizado
                            </h1>
                        </td>
                    </tr>

                    <!-- Logo -->
                    <tr>
                        <td align="center" style="padding:22px;">
                            <img src="https://app.mudanzafacil.com.mx/logo/icon.png" alt="Mudanza Fácil"
                                style="height:60px;">
                        </td>
                    </tr>

                    <tr>
                        <td style=" padding:20px 30px 30px; color:#4A5E71; ">
                            <p style="color:#09233E; margin:0 0 15px; font-size:20px;">
                                Hola
                                <strong>
                                    {{ $expediente->nombre ?? '' }}
                                </strong>,
                            </p>

                            <p style="margin:0 0 15px; font-size:16px; text-align: justify;">
                                Tu expediente de seguro ha sido finalizado correctamente.
                                A continuación encontrarás la información necesaria para realizar el pago de tu seguro.
                            </p>

                            <div
                                style=" background:#F4F7F6; border:1px solid #E8ECEB; border-radius:10px; padding:16px; margin:20px 0; ">
                                <span
                                    style=" display:block; color:#6F7F8D; font-size:14px; text-transform:uppercase; font-weight:bold; margin-bottom:5px; ">
                                    Folio
                                </span>

                                <strong style=" color:#09233E; font-size:16px; ">
                                    {{ $expediente->folio }}
                                </strong>
                            </div>

                            <div
                                style=" margin-top:30px; padding:22px; background:#F4F7F6; border:1px solid #E8ECEB; border-radius:12px; ">
                                <h2 style=" color:#09233E; font-size:20px; margin:0 0 18px; ">
                                    Datos para realizar el pago
                                </h2>

                                <p style=" margin:0 0 18px; font-size:16px; line-height:1.6; ">
                                    Realiza el pago de tu seguro utilizando los siguientes datos bancarios:
                                </p>

                                <p style=" margin:0; line-height:1.8; color:#4A5E71; font-size:16px;">
                                    <strong style="color:#09233E;">
                                        CUENTA PARA PAGOS EN MONEDA NACIONAL (PESOS)
                                    </strong>
                                    <br>

                                    <strong> Beneficiario: </strong>
                                    Prevención Global de Carga SA de CV
                                    <br>

                                    <strong> R.F.C.: </strong>
                                    PGC140409TC5
                                    <br>

                                    <strong> Banco: </strong>
                                    Scotiabank
                                    <br>

                                    <strong> Cuenta: </strong>
                                    01003103307
                                    <br>

                                    <strong> Cuenta Clabe: </strong>
                                    044320010031033073
                                    <br>

                                    <strong> Correo electrónico: </strong>
                                    atnclientes@segurosdecarga.com
                                </p>
                            </div>

                            <div
                                style=" margin-top:20px; padding:20px; background:#E8F4F0; border-left:4px solid #1C8F6A; border-radius:0 8px 8px 0; ">
                                <span
                                    style=" display:block; color:#1C8F6A; font-size:14px; text-transform:uppercase; font-weight:bold; margin-bottom:6px; ">
                                    Importe a pagar
                                </span>

                                <strong style=" color:#09233E; font-size:22px; ">
                                    $ {{ number_format((float) ($expediente->prima_estimada ?? 0), 2) }} MXN
                                </strong>
                            </div>

                            <h2 style=" color:#09233E; font-size:16px; margin-top:30px; ">
                                Envía tu comprobante
                            </h2>

                            <p style=" font-size:16px; line-height:1.6; ">
                                Una vez realizado el pago, puedes enviar tu comprobante para continuar con el proceso de
                                tu seguro.
                            </p>

                            <div style="margin-top:20px; text-align:center;">
                                <a href="https://wa.me/524421896433?text={{ urlencode(
                                        'Hola, buen día.' . " \n\n" . 'Mi nombre es ' . ($expediente->nombre ?? '') . '
                                    y he realizado el pago correspondiente a mi seguro.' . "\n\n" .
                                    'Nombre: ' . ($expediente->nombre ?? '') . "\n" .
                                    'Folio: ' . ($expediente->folio ?? '') . "\n\n" .
                                    'Quiero enviar mi comprobante de pago para continuar con el proceso.'
                                    ) }}" target="_blank"
                                    style=" display:inline-block; padding:12px 20px; background:#25D366; color:#ffffff;
                                    text-decoration:none; border-radius:8px; font-weight:bold; font-size:14px;
                                    margin:5px;"
                                    >
                                    Enviar por WhatsApp
                                </a>

                                <a href="mailto:atnclientes@segurosdecarga.com?subject={{ rawurlencode(
                                        'Comprobante de pago - ' . ($expediente->nombre ?? '') . ' - Folio ' . ($expediente->folio ?? '')
                                    ) }}&body={{ rawurlencode(
                                        'Hola, buen día.' . " \n\n" . 'Mi nombre es ' . ($expediente->nombre ?? '') . '
                                    y adjunto mi comprobante de pago correspondiente a mi seguro.' . "\n\n" .
                                    'Nombre: ' . ($expediente->nombre ?? '') . "\n" .
                                    'Folio: ' . ($expediente->folio ?? '') . "\n\n" .
                                    'Quedo atento(a) a la confirmación de la recepción de mi comprobante.' . "\n\n" .
                                    'Saludos.'
                                    ) }}"
                                    style=" display:inline-block; padding:12px 20px; background:#09233E; color:#ffffff;
                                    text-decoration:none; border-radius:8px; font-weight:bold; font-size:16px;
                                    margin:5px;
                                    ">
                                    Enviar por correo
                                </a>

                            </div>

                            <div
                                style=" margin-top:25px; padding:18px; background:#FFF8E8; border-left:4px solid #D6A928; border-radius:0 8px 8px 0; ">
                                <strong style="color:#09233E;">
                                    Importante
                                </strong>

                                <p style=" margin:6px 0 0; font-size:14px; line-height:1.5;">
                                    Conserva tu comprobante de pago y envíalo por WhatsApp o correo electrónico.
                                    <br><br>

                                    <a href="https://wa.me/5214421896433" target="_blank"
                                        style=" color:#4A5E71; text-decoration:underline; font-weight:bold; ">
                                        ¿Tienes alguna duda? Escríbenos por WhatsApp a Mudanza Fácil
                                    </a>
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Despedida -->
                    <tr>
                        <td style="padding:0 30px 24px; text-align:center; color:#4A5E71;">
                            <p style="margin:0 0 8px; font-size:16px;">
                                Gracias por confiar en nosotros.
                            </p>

                            <strong style="color:#09233E; font-size:16px;">
                                Equipo Mudanza Fácil
                            </strong>
                        </td>
                    </tr>

                    <!-- Pie -->
                    <tr>
                        <td
                            style=" padding:16px 30px; text-align:center; background-color:#F9FBFC; border-top:1px solid #E9EEF2; ">
                            <p style=" margin:0; color:#8998A5; font-size:14px; line-height:1.5; ">
                                Folio de seguimiento:
                                <strong style=" color:#2F5C8C; letter-spacing:1px; ">
                                    {{ $expediente->folio }}
                                </strong>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>