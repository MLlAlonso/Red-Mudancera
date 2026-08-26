<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Continúa tu expediente de seguro</title>
</head>

<body style="margin:0;padding:0;background:#F4F7F6;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 16px;">

                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;">
                    <tr>
                        <td style="background:#09233E;padding:28px;text-align:center;">
                            <h2 style="margin:0;color:#ffffff;">
                                📦 Seguro para tu Mudanza
                            </h2>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:22px;">
                            <img src="https://app.mudanzafacil.com.mx/logo/icon.png" alt="Mudanza Fácil" style="height:60px;">
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:0 32px;color:#4A5E71;line-height:1.7;">
                            <h3 style="color:#1F2937;margin-top:0;">
                                Hola {{ $expediente->nombre }}
                            </h3>

                            <p>
                                Hace unos días solicitaste información sobre nuestro seguro para tu mudanza.
                            </p>

                            <p>
                                Tu expediente todavía está pendiente de completar. 
                                Puedes continuar desde donde lo dejaste 
                                para que nuestro equipo pueda revisar tu información y preparar tu cotización.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:25px 30px;">
                            <div style=" background:#F8FAFC; border:2px solid #DCE8F4; border-radius:14px; padding:22px; text-align:center; ">
                                <p style="margin:0;color:#6B7280;">
                                    Folio de seguimiento
                                </p>

                                <h2 style=" margin:10px 0; color:#09233E; letter-spacing:2px; ">
                                    {{ $expediente->folio }}
                                </h2>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:10px 30px 30px;">
                            <a href="{{ config('app.frontend_url') }}/seguros/{{ $expediente->folio }}" 
                            style=" display:inline-block; background:#09233E; color:#ffffff; text-decoration:none; padding:16px 42px; border-radius:8px; font-weight:bold; font-size:17px; ">
                                Continuar expediente
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:0 30px 25px;">
                            <div style=" background:#F8FAFC; border-radius:10px; padding:16px; ">
                                <p style=" margin:0; font-size:13px; color:#6B7280; text-align:center; line-height:1.7; ">
                                    Tu expediente conserva la información que ya proporcionaste. 
                                    Solo necesitas continuar con los datos pendientes.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:0 20px;">
                            <p style=" font-size:13px; color:#7A7A7A; text-align:center; line-height:1.7; ">
                                🔒 Este enlace es personal y seguro.
                                No compartas este correo con otras personas.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style=" padding:30px; text-align:center; color:#4A5E71; ">
                            <p style="margin-bottom:8px;">
                                Gracias por confiar en nosotros.
                            </p>

                            <strong style="color:#1F2937;">
                                Equipo Mudanza Fácil
                            </strong>
                        </td>
                    </tr>

                    <tr>
                        <td style=" padding:18px; text-align:center; border-top:1px solid #ECECEC; ">
                            <p style=" margin:0; font-size:12px; color:#999; ">
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