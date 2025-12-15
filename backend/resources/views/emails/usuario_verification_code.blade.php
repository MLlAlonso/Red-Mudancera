<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Verificación de correo</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="500" style="background:#ffffff;border-radius:10px;padding:30px;">
          <tr>
            <td align="center">
              <h2 style="color:#09233E;margin-bottom:10px;">Red Mudancera</h2>
              <p style="color:#4A5E71;">Tu código de verificación es:</p>

              <div style="margin:30px 0;
                          font-size:32px;
                          letter-spacing:6px;
                          font-weight:bold;
                          color:#009E66;">
                {{ $code }}
              </div>

              <p style="font-size:14px;color:#6F7F8D;">
                Este código expira en 15 minutos.
              </p>

              <hr style="margin:30px 0;border:none;border-top:1px solid #eee;">

              <p style="font-size:12px;color:#999;">
                Si no solicitaste este código, puedes ignorar este correo.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
