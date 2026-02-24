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
            <a href="https://app.mudanzafacil.com.mx" target="_blank">
              <img src="https://app.mudanzafacil.com.mx/logo/logo_A.png"
                   alt="Mudanza Fácil"
                   style="height:60px;">
            </a>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:24px;text-align:center;color:#4A5E71;">
            <p>Tu cuenta ha sido verificada correctamente.</p>

            <p>
              Se creó automáticamente un usuario administrador para
              <strong>{{ $empresa->empresa }}</strong>
              utilizando el mismo correo y contraseña con los que te registraste.
            </p>

            <p style="margin-top:20px;">
              Ya puedes iniciar sesión y comenzar a publicar servicios.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px;text-align:center;">
            <p style="font-size:12px;color:#999;">
              Gracias por confiar en nosotros.<br>
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
