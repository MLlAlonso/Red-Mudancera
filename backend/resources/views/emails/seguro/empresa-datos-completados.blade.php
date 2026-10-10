<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datos de tu seguro completados</title>
</head>

<body style="margin:0; padding:0; background:#F4F7F6; font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F4F7F6;">
        <tr>
            <td align="center" style="padding:40px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                    style="max-width:560px; background:#ffffff; border-radius:16px; overflow:hidden;">

                    <!-- Encabezado -->
                    <tr>
                        <td style="background:#09233E; padding:28px; text-align:center;">
                            <h2 style="margin:0; color:#ffffff; font-size:21px; line-height:1.4;">
                                Tu empresa ya registró los datos de tu unidad
                            </h2>
                        </td>
                    </tr>

                    <!-- Logo -->
                    <tr>
                        <td align="center" style="padding:22px;">
                            <img
                                src="https://app.mudanzafacil.com.mx/logo/icon.png"
                                alt="Mudanza Fácil"
                                width="180"
                                style="max-width:180px; height:100px; object-fit:contain; display:block;"
                            >
                        </td>
                    </tr>

                    <!-- Mensaje principal -->
                    <tr>
                        <td style="padding:0 32px; color:#4A5E71; line-height:1.7;">
                            <h3 style="color:#09233E; margin:0 0 15px; font-size:20px;">
                                Hola {{ $expediente->nombre }},
                            </h3>

                            <p style="margin:0 0 15px; font-size:15px;">
                                La empresa de mudanzas ya completó la información de la unidad que realizará tu traslado.
                            </p>

                            <p style="margin:0 0 15px; font-size:15px;">
                                Ahora puedes ingresar a tu expediente,
                                <span style="color:#09233E; font-weight:bold;">
                                    revisar que todos los datos sean correctos
                                </span>
                                y completar los pasos pendientes para contratar tu seguro.
                            </p>
                        </td>
                    </tr>

                    <!-- Aviso importante -->
                    <tr>
                        <td style="padding:10px 24px 24px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EDF4FA; border:1px solid #D5E5F2; border-radius:12px;">
                                <tr>
                                    <td width="76" valign="middle" align="center" style="padding:20px 8px 20px 16px;">
                                        <img src="https://app.mudanzafacil.com.mx/icons/verificado.png" alt="" width="48" height="48" style="display:block; width:48px; height:48px;" >
                                    </td>

                                    <td valign="middle" style="padding:20px 18px 20px 8px;">
                                        <h3 style="margin:0 0 8px; color:#09233E; font-size:17px;">
                                            Importante
                                        </h3>

                                        <p style="margin:0; color:#4A5E71; font-size:14px; line-height:1.7;">
                                            Para que tu menaje viaje protegido, es necesario completar el expediente y realizar el pago a la aseguradora con tiempo suficiente para que tu póliza quede emitida antes de la salida.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- CTA -->
                    <tr>
                        <td align="center" style="padding:0 30px 24px;">
                            <a
                                href="{{ rtrim(config('app.frontend_url'), '/') }}/seguros/{{ $expediente->folio }}"
                                style=" display:inline-block; background:#09233E; color:#ffffff; text-decoration:none; padding:16px 30px; border-radius:8px; font-weight:bold; font-size:16px; line-height:1.4; text-align:center; "
                            >
                                Revisar y finalizar mi expediente
                            </a>
                        </td>
                    </tr>

                    <!-- Ayuda por WhatsApp -->
                    <tr>
                        <td align="center" style="padding:0 30px 28px;">
                            <p style="margin:0; color:#4A5E71; font-size:14px; line-height:1.7;">
                                Si encuentras algún dato incorrecto o necesitas ayuda,
                                <a href="https://wa.me/5214421896433" target="_blank" style="color:#009E66; font-weight:bold; text-decoration:none;" >
                                    escríbenos por WhatsApp
                                </a>.
                            </p>
                        </td>
                    </tr>

                    <!-- Despedida -->
                    <tr>
                        <td style="padding:0 30px 24px; text-align:center; color:#4A5E71;">
                            <p style="margin:0 0 8px; font-size:14px;">
                                Gracias por confiar en nosotros.
                            </p>

                            <strong style="color:#09233E; font-size:14px;">
                                Equipo Mudanza Fácil
                            </strong>
                        </td>
                    </tr>

                    <!-- Pie -->
                    <tr>
                        <td style=" padding:16px 30px; text-align:center; background-color:#F9FBFC; border-top:1px solid #E9EEF2; ">
                            <p style=" margin:0; color:#8998A5; font-size:12px; line-height:1.5; ">
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