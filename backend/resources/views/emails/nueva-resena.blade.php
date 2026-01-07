<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva reseña</title>
</head>
<body style="margin:0; padding:0; background:#f4f4f4; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:14px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#0D0A0B; padding:24px; text-align:center;">
              <h2 style="margin:0; color:#ffffff; font-size:22px;">
                ⭐ Nueva reseña recibida
              </h2>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:24px; color:#333333;">

              <p style="font-size:16px; margin:0 0 12px;">
                <strong>{{ $empresaOrigen }}</strong> ha dejado una reseña sobre tu empresa.
              </p>

              <!-- Rating -->
              <p style="font-size:18px; margin:12px 0;">
                Calificación:
                <span style="color:#f5b301; font-size:20px;">
                  ⭐ {{ $rating }} / 5
                </span>
              </p>

              <!-- Comment box -->
              <div style="background:#f9f9f9; border-radius:10px; padding:16px; margin:16px 0;">
                <p style="margin:0; font-size:15px; line-height:1.5;">
                  “{{ $comentario }}”
                </p>
              </div>

              <!-- CTA -->
              @if($linkRespuesta)
              <div style="text-align:center; margin:24px 0;">
                <a href="{{ $linkRespuesta }}"
                   style="display:inline-block; background:#009E66; color:#ffffff; text-decoration:none; padding:12px 20px; border-radius:8px; font-size:15px;">
                  Reseñar a esta empresa
                </a>
              </div>
              @endif

              <!-- Footer -->
              <p style="font-size:13px; color:#777777; margin-top:24px;">
                Si no reconoces esta reseña, por favor contacta a soporte:
                <br>
                example@outlook.com · xxx-xxx-xxxx
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
