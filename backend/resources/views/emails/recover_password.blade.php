<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Recuperación de contraseña</title>
</head>

<body style="margin:0;padding:0;background:#F4F7F6;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:14px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#09233E;padding:24px;text-align:center;">
            <h2 style="margin:0;color:#ffffff;font-size:22px;">
              Recuperación de contraseña
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
          <td style="padding:24px;color:#4A5E71;font-size:14px;line-height:1.6;">
            <p>
              Se ha solicitado un <strong>cambio de contraseña</strong> para tu cuenta en
              <strong>Mudanza Facil</strong>.
            </p>

            <p>
              Si <strong>NO reconoces</strong> esta acción, ingresa inmediatamente con el
              siguiente código, cambia tu contraseña y contacta a soporte lo antes posible.
            </p>

            <p>
              Si <strong>reconoces</strong> esta acción, simplemente inicia sesión con el
              siguiente código y cambia tu contraseña desde la sección
              <strong>“Editar perfil”</strong>.
            </p>

            <!-- Código -->
            <div style="margin:24px 0;text-align:center;">
              <div style="font-size:28px;letter-spacing:4px;font-weight:bold;color:#09233E;">
                {{ $password }}
              </div>
            </div>

            <!-- Botones -->
            <div style="text-align:center;margin-top:24px;">

              @if($hasUsuario)
                <a href="https://app.mudanzafacil.com.mx/usuario/login"
                   style="display:inline-block;margin:6px 0;padding:12px 20px;background:#28A745;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;">
                  Iniciar sesión como Usuario
                </a>
              @endif

              @if($hasEmpresa)
                <a href="https://app.mudanzafacil.com.mx/empresa/login"
                   style="display:inline-block;margin:6px 0;padding:12px 20px;background:#09233e;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;">
                  Iniciar sesión como Empresa
                </a>
              @endif

            </div>

            <!-- Links fallback -->
            <p style="margin-top:20px;font-size:12px;color:#6F7F8D;text-align:center;">
              Si los botones no funcionan, copia y pega alguno de estos enlaces en tu navegador:
              <br>
              @if($hasUsuario)
                https://app.mudanzafacil.com.mx/usuario/login
                <br>
              @endif
              @if($hasEmpresa)
                https://app.mudanzafacil.com.mx/empresa/login
              @endif
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px;text-align:center;">
            <p style="font-size:12px;color:#999;">
              Si no reconoces esta acción, por favor contacta a soporte:
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