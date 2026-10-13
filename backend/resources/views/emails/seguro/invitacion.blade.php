<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Mudanza Fácil: así se ve tu expediente digital de seguro</title>
</head>

<body style="margin:0;padding:0;background:#F4F7F6;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0"
                    style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background:#09233E;padding:28px;text-align:center;">
                            <h2 style="margin:0;color:#ffffff; font-size:22px; line-height:1.4;">
                                📄 Conoce tu expediente digital de seguro
                            </h2>
                        </td>
                    </tr>

                    <!-- Logo -->
                    <tr>
                        <td align="center" style="padding:22px;">
                            <img src="https://app.mudanzafacil.com.mx/logo/icon.png" alt="Mudanza Fácil"
                                style="height:60px;">
                        </td>
                    </tr>

                    <!-- Contenido -->
                    <tr>
                        <td style="padding:0 32px;color:#4A5E71;line-height:1.7; text-align: justify;">
                            <h3 style="color:#09233E; margin:0 0 15px; font-size:20px;">
                                Hola {{ $expediente->nombre }}
                            </h3>

                            <p style="margin:0 0 15px; font-size:16px; text-align: justify;">
                                Sabemos que todavía estás organizando tu mudanza y que el seguro normalmente se contrata
                                más adelante, cuando ya tienes definida la empresa que realizará el servicio. Por eso,
                                no necesitas completar ningún dato por ahora.
                            </p>

                            <p style="margin:0 0 15px; font-size:16px; text-align: center;">
                                Lo que sí hicimos fue dejar todo preparado para cuando llegue el momento: </br>
                                <strong style="color:#15996f;margin-top:0; font-size: 18px;"> Ya tienes tu expediente
                                    digital creado.</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Botón -->
                    <tr>
                        <td align="center" style="padding:10px 30px 5px;">
                            <a href="{{ config('app.frontend_url') }}/seguros/{{ $expediente->folio }}"
                                style=" display:inline-block; background:#09233E; color:#ffffff; text-decoration:none; padding:16px 42px; border-radius:8px; font-weight:bold; font-size:20px;">
                                Ver mi expediente
                            </a>
                        </td>
                    </tr>

                    <!-- Folio -->
                    <tr>
                        <td style="padding:25px 30px;">
                            <div
                                style=" background:#EDF4FA; border:1px solid #D5E5F2; border-radius:12px; padding:20px; text-align:center;">
                                <h2 style="margin:0 0 8px; color:#09233E; font-size:17px;">
                                    Puedes empezar a dejar algunos datos desde ahora
                                </h2>

                                <p style="margin:0;color:#6B7280; font-size: 16px;">
                                    Se guardan automaticamente, así cuando confirmes tu mudanza solo te faltará lo
                                    último.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:0 32px;color:#4A5E71;line-height:1.7; text-align: justify; font-size: 14px;">
                            <p style="margin:0 0 15px; font-size:16px; text-align: justify;">
                                Cuando llegue el momento, desde ahí podrás completar la información necesaria,
                                dar seguimiento al proceso y gestionar tu seguro sin llamadas, sin papeleo y sin
                                perseguir a nadie por WhatsApp.
                                Todo desde un solo lugar.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:0 32px;color:#4A5E71;line-height:1.7; text-align: justify; font-size: 14px;">
                            <p style="margin:0 0 15px; font-size:16px; text-align: justify;">
                                Nada de esto te compromete a contratar. Simplemente queremos que sepas que, si decides
                                asegurar tu mudanza,
                                ya tienes listo el lugar desde donde podrás hacerlo de forma fácil y ordenada.
                            </p>
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