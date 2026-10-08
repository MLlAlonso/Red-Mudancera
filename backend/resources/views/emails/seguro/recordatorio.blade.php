<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seguimiento de tu expediente</title>
</head>

<body style="margin:0;padding:0;background:#F4F7F6;font-family:Arial,Helvetica,sans-serif;color:#1F2937;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F4F7F6;">
        <tr>
            <td align="center" style="padding:40px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                    style="max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;">
                    <!-- HEADER -->
                    <tr>
                        <td style="background:#09233E;padding:26px 32px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="border-collapse: collapse;">
                                <tr>
                                    <td align="center" style=" padding: 10px 10px; background-color: #09233E; ">
                                        <table cellpadding="0" cellspacing="0" border="0"
                                            style="border-collapse: collapse;">
                                            <tr>
                                                <!-- Logo -->
                                                <td valign="middle" style=" padding: 0; padding-right: 5px; ">
                                                    <img src="https://app.mudanzafacil.com.mx/logo/icon.png"
                                                        alt="Mudanza Fácil" width="48"
                                                        style=" display: block; width: 50px; height: auto; border: 0; ">
                                                </td>

                                                <!-- Texto -->
                                                <td valign="middle"
                                                    style=" padding: 0; color: #ffffff; font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 20px; font-weight: 500; ">
                                                    Más tranquilidad para lo que más te importa
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>


                    <!-- CONTENIDO -->
                    <tr>
                        <td style="padding:42px 40px 20px;">
                            <!-- BADGE -->
                            <div
                                style=" display:inline-block; background:#E8F5F0; color:#087A50; font-size:12px; font-weight:bold; letter-spacing:.5px; text-transform:uppercase; padding:7px 12px; border-radius:999px; margin-bottom:16px; ">
                                Seguimiento
                            </div>

                            <!-- TITULO -->
                            <h1
                                style=" margin:0 0 22px; color:#09233E; font-size:30px; line-height:1.2; font-weight:700; ">
                                Seguimiento de tu expediente
                            </h1>

                            <!-- TEXTO -->
                            <p style=" margin:0 0 18px; color:#4A5E71; font-size:16px; line-height:1.7; ">
                                Hola {{ $expediente->nombre }},
                            </p>

                            <p style=" margin:0 0 18px; color:#4A5E71; font-size:16px; line-height:1.7; ">
                                Hace unos días comenzaste el proceso para proteger tu mudanza y queremos saber cómo vas.
                            </p>

                            <p style=" margin:0 0 18px; color:#4A5E71; font-size:16px; line-height:1.7; ">
                                Si ya elegiste la empresa que realizará tu mudanza, el siguiente paso es muy sencillo:
                                <strong style="color:#09233E;"> desde tu expediente puedes enviarle el enlace</strong>
                                para que complete los datos de la unidad, operador y placas.
                            </p>

                            <p style=" margin:0 0 28px; color:#4A5E71; font-size:16px; line-height:1.7; ">
                                Si todavía tienes dudas, no sabes cómo enviar el enlace o
                                necesitas ayuda con cualquier parte del proceso, estamos aquí para ayudarte.
                            </p>
                        </td>
                    </tr>


                    <!-- CTA PRINCIPAL -->
                    <tr>
                        <td align="center" style="padding:0 40px 12px;">
                            <a href="{{ config('app.frontend_url') }}/seguros/{{ $expediente->folio }}"
                                style=" display:block; background:#09233E; color:#ffffff; text-decoration:none; padding:16px 24px; border-radius:10px; font-size:16px; font-weight:bold; text-align:center; ">
                                Continuar mi expediente
                            </a>
                        </td>
                    </tr>

                    <!-- CTA WHATSAPP -->
                    <tr>
                        <td align="center" style="padding:0 40px 30px;">
                            <a href="https://wa.me/5214421896433?text=Hola%20Mudanza%20Fácil,%20tengo%20una%20duda%20sobre%20mi%20expediente%20de%20seguro."
                                style=" display:block; background:#E8F5F0; color:#087A50; text-decoration:none; padding:15px 24px; border-radius:10px; font-size:15px; font-weight:bold; text-align:center; border:1px solid #C8E8DC;
                                ">
                                Tengo una duda por WhatsApp
                            </a>
                        </td>
                    </tr>

                    <!-- NOTA -->
                    <tr>
                        <td style="padding:0 40px 34px;">
                            <div style=" background:#F8FAFC; border-radius:10px; padding:16px 18px; text-align:center; ">
                                <p style=" margin:0; color:#6B7280; font-size:13px; line-height:1.6; ">
                                    Tu expediente conserva la información que ya proporcionaste,
                                    así que puedes retomarlo desde donde te quedaste.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- SEPARADOR -->
                    <tr>
                        <td style="padding:0 40px;">
                            <div style="height:1px;background:#ECEFF2;"></div>
                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td align="center" style="padding:30px 40px 20px;">
                            <p style=" margin:0 0 8px; color:#4A5E71; font-size:14px; line-height:1.6; ">
                                Gracias por confiar en Mudanza Fácil.
                            </p>

                            <strong style=" color:#09233E; font-size:14px; ">
                                Equipo Mudanza Fácil
                            </strong>
                        </td>
                    </tr>

                    <!-- FOLIO -->
                    <tr>
                        <td align="center" style="padding:8px 40px 28px;">
                            <p style=" margin:0; color:#9CA3AF; font-size:11px; line-height:1.5; ">
                                Folio de seguimiento: {{ $expediente->folio }}
                            </p>
                        </td>
                    </tr>

                    <!-- SOPORTE -->
                    <tr>
                        <td align="center" style=" padding:16px 20px; background:#F8FAFC; border-top:1px solid #ECEFF2; ">
                            <p style=" margin:0; color:#9CA3AF; font-size:11px; ">
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