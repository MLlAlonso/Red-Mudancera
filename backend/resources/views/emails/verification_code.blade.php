<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Código de verificación</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
    <tr>
      <td align="center">

        <table width="100%" max-width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; padding:30px; max-width:500px;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h2 style="margin:0; color:#009E66;">Red Mudancera</h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="color:#333333; font-size:16px; line-height:1.5; text-align:center;">
              <p style="margin:0 0 10px;">
                {{ $tipo === 'empresa' ? 'Verificación de empresa' : 'Verificación de cuenta' }}
              </p>

              <p style="margin:0 0 20px;">
                Usa el siguiente código para continuar:
              </p>

              <div style="font-size:32px; letter-spacing:6px; font-weight:bold; color:#000;">
                {{ $code }}
              </div>

              <p style="margin-top:20px; font-size:14px; color:#777;">
                Este código expira en 15 minutos.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:30px; text-align:center; font-size:12px; color:#999;">
              Si no solicitaste este código, puedes ignorar este mensaje.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
