<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Datos de tu seguro completados </title>
</head>

<body style="  margin:0; padding:0; background:#F4F7F6; font-family:Arial,Helvetica,sans-serif; ">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F4F7F6;">
        <tr>
            <td align="center" style="padding:40px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style=" max-width:560px; background:#ffffff; border-radius:16px; overflow:hidden; ">

                    <tr>
                        <td style=" background:#09233E; padding:28px; text-align:center; ">
                            <h2 style=" margin:0; color:#ffffff; font-size:21px; line-height:1.3; ">
                                📦 Seguro para tu Mudanza
                            </h2>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:22px;">
                            <img src="https://app.mudanzafacil.com.mx/logo/icon.png" alt="Mudanza Fácil" style=" max-width:180px; height:auto; display:block; ">
                        </td>
                    </tr>

                    <tr>
                        <td style=" padding:0 32px; color:#4A5E71; line-height:1.7; ">
                            <h3 style=" color:#09233E; margin:0 0 15px; font-size:20px; ">
                                Hola {{ $expediente->nombre }}
                            </h3>

                            <p style=" margin:0 0 15px; font-size:15px;  ">
                                La empresa de mudanza ha completado la información correspondiente a la unidad que realizará tu mudanza.
                            </p>

                            <p style=" margin:0 0 15px; font-size:15px; ">
                                Ya puedes ingresar a tu expediente para revisar
                                los datos registrados y continuar con el proceso
                                de tu seguro.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:25px 30px;">
                            <div style=" background:#F8FAFC; border:2px solid #DCE8F4; border-radius:14px; padding:22px; text-align:center; ">
                                <p style=" margin:0; color:#6B7280; font-size:13px; ">
                                    Folio de seguimiento
                                </p>

                                <h2 style=" margin:10px 0 0; color:#09233E; letter-spacing:2px; font-size:22px; ">
                                    {{ $expediente->folio }}
                                </h2>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style=" padding:0 30px 20px; ">
                            <div style=" background:#F4F7F6; border-left:4px solid #1C8F6A; border-radius:0 10px 10px 0; padding:16px 18px; ">
                                <p style=" margin:0; color:#09233E; font-size:14px; line-height:1.6; ">
                                    <strong>
                                        Información de la unidad disponible
                                    </strong>
                                </p>

                                <p style=" margin:5px 0 0; color:#4A5E71; font-size:13px; line-height:1.6; ">
                                    Revisa que los datos proporcionados por la  empresa sean correctos antes de continuar.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:10px 30px 30px;">
                            <a href="{{ config('app.frontend_url') }}/seguros/{{ $expediente->folio }}" style="
                                display:inline-block;
                                background:#09233E;
                                color:#ffffff;
                                text-decoration:none;
                                padding:16px 42px;
                                border-radius:8px;
                                font-weight:bold;
                                font-size:17px;
                            ">
                                Revisar mi expediente
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:0 20px;">
                            <p style=" margin:0; font-size:13px; color:#7A7A7A; text-align:center; line-height:1.7; ">
                                🔒 Este enlace es personal y seguro.
                                No compartas este correo con otras personas.
                                Tu información será utilizada únicamente para
                                dar seguimiento a tu expediente de seguro.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style=" padding:30px; text-align:center; color:#4A5E71; ">
                            <p style=" margin:0 0 8px; font-size:14px; ">
                                Gracias por confiar en nosotros.
                            </p>

                            <strong style=" color:#09233E; font-size:14px; ">
                                Equipo Mudanza Fácil
                            </strong>
                        </td>
                    </tr>

                    <tr>
                        <td style=" padding:18px; text-align:center; border-top:1px solid #ECECEC; ">
                            <p style="  margin:0; font-size:12px; color:#999999;  ">
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