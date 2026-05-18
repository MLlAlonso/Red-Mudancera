<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Nueva reseña</title>
</head>

<body style="margin:0;padding:0;background:#F4F7F6;font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 16px;">

                <table width="100%" cellpadding="0" cellspacing="0"
                    style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="background:#09233E;padding:24px;text-align:center;">
                            <h2 style="margin:0;color:#ffffff;font-size:22px;">
                                ⭐ Nueva reseña recibida
                            </h2>
                        </td>
                    </tr>

                    <!-- Logo -->
                    <tr>
                        <td align="center" style="padding:20px;">
                            <a href="https://app.mudanzafacil.com.mx" target="_blank">
                                <img src="https://app.mudanzafacil.com.mx/logo/icon.png" alt="Mudanza Fácil"
                                    style="height:60px;">
                            </a>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding:24px;color:#4A5E71;">

                            @if ($esCliente)
                                <p style="font-size:16px;margin:0 0 12px;">
                                    Un cliente (<strong>{{ $empresaOrigen }}</strong>) ha dejado una reseña sobre tu
                                    empresa.
                                </p>
                            @else
                                <p style="font-size:16px;margin:0 0 12px;">
                                    La empresa <strong>{{ $empresaOrigen }}</strong> ha dejado una reseña sobre tu
                                    empresa.
                                </p>
                            @endif

                            <p style="font-size:18px;margin:12px 0;">
                                Calificación:
                                <span style="color:#1C8F6A;font-size:20px;">
                                    ⭐ {{ $rating }} / 5
                                </span>
                            </p>

                            <div style="background:#F4F7F6;border-radius:10px;padding:16px;margin:16px 0;">
                                <p style="margin:0;font-size:15px;line-height:1.5;">
                                    “{{ $comentario }}”
                                </p>
                            </div>

                            @if ($linkRespuesta)
                                <div style="text-align:center;margin:24px 0;">
                                    <a href="{{ $linkRespuesta }}"
                                        style="display:inline-block;background:#1C8F6A;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:8px;font-size:15px;">
                                        Responder reseña
                                    </a>
                                </div>
                            @endif

                            <!-- Footer -->
                            <p style="font-size:13px;color:#777;margin-top:24px;">
                                Si no reconoces esta reseña, contacta a soporte:
                                <br>
                                soporte@mudanzafacil.com.mx · xxx-xxx-xxxx
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>
