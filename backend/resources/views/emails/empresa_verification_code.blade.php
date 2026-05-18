<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Verificación de empresa</title>
</head>

<body style="margin:0;padding:0;background:#F4F7F6;font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 16px;">

                <table width="100%" cellpadding="0" cellspacing="0"
                    style="max-width:500px;background:#ffffff;border-radius:14px;overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="background:#09233E;padding:24px;text-align:center;">
                            <h2 style="margin:0;color:#ffffff;font-size:22px;">
                                Verificación de empresa
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

                    <!-- Body -->
                    <tr>
                        <td style="padding:24px;color:#4A5E71;text-align:center;">
                            <p style="margin:0 0 12px;">
                                Tu código de verificación es:
                            </p>

                            <div style="font-size:32px;letter-spacing:6px;font-weight:bold;color:#09233E;">
                                {{ $code }}
                            </div>

                            <p style="margin-top:16px;font-size:14px;color:#6F7F8D;">
                                Este código expira en 5 minutos.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:20px;text-align:center;">
                            <p style="font-size:12px;color:#999;">
                                Si no reconoces esta acción, puedes ignorar o contactar a soporte:
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
