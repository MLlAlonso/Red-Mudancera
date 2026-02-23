<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Verificación de solicitud</title>
</head>

<body style="margin:0;padding:0;background:#F4F7F6;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:500px;background:#ffffff;border-radius:14px;overflow:hidden;">

        <tr>
          <td style="background:#09233E;padding:24px;text-align:center;">
            <h2 style="margin:0;color:#ffffff;font-size:22px;">
              Verifica tu solicitud de mudanza
            </h2>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding:20px;">
            <img src="https://app.mudanzafacil.com.mx/logo/logo.png"
                 alt="Mudanza Fácil"
                 style="height:60px;">
          </td>
        </tr>

        <tr>
          <td style="padding:24px;text-align:center;color:#4A5E71;">
            <p>Tu código de verificación es:</p>

            <div style="margin:24px 0;font-size:32px;letter-spacing:6px;font-weight:bold;color:#1C8F6A;">
              {{ $code }}
            </div>

            <p style="font-size:14px;color:#6F7F8D;">
              Este código expira en 15 minutos.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:20px;text-align:center;">
            <p style="font-size:12px;color:#999;">
              Si no realizaste esta solicitud puedes ignorar este correo.
              <br>
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