<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Bienvenido</title>
</head>

<body style="margin:0;padding:0;background:#F4F7F6;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding:40px 16px;">

      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:500px;background:#ffffff;border-radius:14px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#09233E;padding:24px;text-align:center;">
            <h2 style="margin:0;color:#ffffff;font-size:22px;">
              ¡Bienvenido a Mudanza Fácil!
            </h2>
          </td>
        </tr>

        <!-- Logo -->
        <tr>
          <td align="center" style="padding:20px;">
            <img src="https://app.mudanzafacil.com.mx/logo/logo_B.png"
                 alt="Mudanza Fácil"
                 style="height:60px;">
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:24px;text-align:center;color:#4A5E71;">
            <p>
              Has sido agregado como usuario a la empresa
              <strong>{{ $empresa }}</strong>.
            </p>

            <p>
              Tu empresa será la encargada de proporcionarte tu contraseña
              para acceder a la plataforma.
            </p>

            <p style="margin-top:20px;">
              Puedes iniciar sesión desde el siguiente enlace:
            </p>

            <a href="https://app.mudanzafacil.com.mx/usuario/login"
               style="display:inline-block;margin-top:10px;padding:12px 20px;background:#28A745;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;">
              Iniciar sesión
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px;text-align:center;">
            <p style="font-size:12px;color:#999;">
              Si tienes dudas, contacta a soporte:<br>
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
