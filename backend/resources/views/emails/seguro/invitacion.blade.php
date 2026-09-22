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
                            <h2 style="margin:0;color:#ffffff;">
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
                            <h3 style="color:#1F2937;margin-top:0;">
                                Hola {{ $expediente->nombre }}
                            </h3>

                            <p>
                                Sabemos que todavía estás organizando tu mudanza y que el seguro normalmente se contrata
                                más adelante, cuando ya tienes definida la empresa que realizará el servicio. Por eso,
                                no necesitas completar ningún dato por ahora.
                            </p>

                            <p style="text-align: center;">
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
                                style=" background:#F8FAFC; border:2px solid #DCE8F4; border-radius:14px; padding:20px; text-align:center;">
                                <h2 style=" margin:10px 0; color:#2F5C8C; letter-spacing:2px; font-size: 14px">
                                    Puedes empezar a dejar algunos datos desde ahora
                                </h2>

                                <p style="margin:0;color:#6B7280; font-size: 14px;">
                                    Se guardan automaticamente, así cuando confirmes tu mudanza solo te faltará lo
                                    último.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:0 32px;color:#4A5E71;line-height:1.7; text-align: justify; font-size: 14px;">
                            <p>
                                Cuando llegue el momento, desde ahí podrás completar la información necesaria,
                                dar seguimiento al proceso y gestionar tu seguro sin llamadas, sin papeleo y sin
                                perseguir a nadie por WhatsApp.
                                Todo desde un solo lugar.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:0 32px;color:#4A5E71;line-height:1.7; text-align: justify; font-size: 14px;">
                            <p>
                                Nada de esto te compromete a contratar. Simplemente queremos que sepas que, si decides
                                asegurar tu mudanza,
                                ya tienes listo el lugar desde donde podrás hacerlo de forma fácil y ordenada.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style=" padding:30px; text-align:center; color:#4A5E71;">
                            <p style="margin-bottom:8px;">
                                Nos vemos por ahí,
                            </p>

                            <strong style="color:#1F2937;">
                                El equipo de Mudanza Fácil
                            </strong>
                        </td>
                    </tr>

                    <tr>
                        <td style=" padding:18px; text-align:center; border-top:1px solid #ECECEC;">
                            <p style=" margin:0; font-size:14px; color:#999;">
                                Folio de seguimiento: {{ $expediente->folio }}
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>