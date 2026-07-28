<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Nueva empresa registrada</title>
</head>

<body style="margin:0;padding:0;background:#F4F7F6;font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 16px;">

                <table width="100%" cellpadding="0" cellspacing="0"
                    style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;">

                    <tr>
                        <td style="background:#09233E;padding:28px;text-align:center;">
                            <h2 style="margin:0;color:#fff;">
                                Nueva empresa registrada
                            </h2>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:20px;">
                            <img src="https://app.mudanzafacil.com.mx/logo/icon.png" style="height:60px;"
                                alt="Mudanza Fácil">
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:0 30px 30px;color:#4A5E71;">
                            <p> Se ha registrado una nueva empresa en la plataforma. </p>

                            <table width="100%" cellpadding="10" cellspacing="0"
                                style="border-collapse:collapse;border:1px solid #E5E7EB;">
                                <tr style="background:#F9FAFB;">
                                    <td width="180"><strong>Empresa</strong></td>
                                    <td>{{ $empresa->empresa }}</td>
                                </tr>

                                <tr>
                                    <td><strong>Representante</strong></td>
                                    <td>{{ $empresa->representante }}</td>
                                </tr>

                                <tr style="background:#F9FAFB;">
                                    <td><strong>Email</strong></td>
                                    <td>{{ $empresa->email }}</td>
                                </tr>

                                <tr>
                                    <td><strong>Teléfono</strong></td>
                                    <td>{{ $empresa->tel }}</td>
                                </tr>

                                <tr>
                                    <td><strong>Fecha de registro</strong></td>
                                    <td>{{ $empresa->created_at->format('d/m/Y H:i') }}</td>
                                </tr>

                            </table>

                            <div
                                style="margin-top:30px;padding:20px;background:#FFF8E8;border-left:5px solid #F1A43F;border-radius:8px;">
                                <strong>Acción recomendada</strong>

                                <p style="margin-bottom:0;">
                                    Contactar a la empresa para darle seguimiento, validar su información y ofrecer la
                                    activación de la cuenta.
                                </p>
                            </div>

                            <!-- Acción -->
                            <div style="text-align:center; margin:35px 0;">
                                <a href="https://app.mudanzafacil.com.mx/superadmin/login"
                                    style=" display:inline-block; background:#0F766E; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:8px; font-size:16px; font-weight:600;">
                                    Ver empresa Panel de Administración
                                </a>

                                <p style="margin-top:15px; color:#666; font-size:13px; line-height:1.5;">
                                    Inicia sesión en el panel de administración para revisar la información
                                    de la empresa, validar su registro o realizar acciones adicionales.
                                </p>
                            </div>

                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>

</body>

</html>