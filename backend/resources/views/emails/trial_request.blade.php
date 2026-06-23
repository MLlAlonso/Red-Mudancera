<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Solicitud de prueba gratuita</title>
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
                                Nueva solicitud de prueba gratuita
                            </h2>
                        </td>
                    </tr>

                    <!-- Logo -->
                    <tr>
                        <td align="center" style="padding:20px;">
                            <img src="https://app.mudanzafacil.com.mx/logo/icon.png" alt="Mudanza Fácil"
                                style="height:60px;">
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:24px;color:#4A5E71;">

                            <p>
                                Se ha recibido una nueva solicitud de prueba gratuita.
                            </p>

                            <hr style="margin:20px 0;">

                            <p><strong>Empresa:</strong> {{ $trial->empresa }}</p>
                            <p><strong>Representante:</strong> {{ $trial->representante }}</p>
                            <p><strong>RFC:</strong> {{ $trial->rfc }}</p>
                            <p><strong>Sede:</strong> {{ $trial->base }}</p>
                            <p><strong>Teléfono:</strong> {{ $trial->tel }}</p>

                            @if ($trial->google_url)
                                <p><strong>Google My Business:</strong> {{ $trial->google_url }}</p>
                            @endif

                            @if ($trial->web)
                                <p><strong>Página web:</strong> {{ $trial->web }}</p>
                            @endif

                            <hr style="margin:20px 0;">

                            <h4 style="margin-bottom:10px;">Referencias</h4>

                            @if ($trial->referencias && count($trial->referencias))
                                @foreach ($trial->referencias as $ref)
                                    <div
                                        style="margin-bottom:12px;padding:10px;border:1px solid #eee;border-radius:8px;">
                                        <p><strong>Empresa:</strong> {{ $ref['nombre'] ?? '-' }}</p>
                                        <p><strong>Teléfono:</strong> {{ $ref['telefono'] ?? '-' }}</p>
                                        <p><strong>Correo:</strong> {{ $ref['correo'] ?? '-' }}</p>
                                        @if (!empty($ref['web']))
                                            <p><strong>Web:</strong> {{ $ref['web'] }}</p>
                                        @endif
                                    </div>
                                @endforeach
                            @else
                                <p>No se proporcionaron referencias.</p>
                            @endif

                            <hr style="margin:20px 0;">

                            <p>
                                Los documentos (INE, Constancia fiscal y comprobante de domicilio)
                                se encuentran adjuntos en este correo.
                            </p>

                            <p>INE: <a href="{{ $trial->ine_url }}">Ver documento</a></p>
                            <p>CSF: <a href="{{ $trial->csf_url }}">Ver documento</a></p>
                            <p>Domicilio: <a href="{{ $trial->domicilio_url }}">Ver documento</a></p>

                            <p style="margin-top:20px;">
                                Accede al dashboard para revisar la empresa:
                            </p>

                            <div style="text-align:center;">
                                <a href="https://app.mudanzafacil.com.mx/superadmin/login"
                                    style="display:inline-block;margin-top:10px;padding:12px 20px;background:#28A745;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;">
                                    Ir al dashboard
                                </a>
                            </div>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:20px;text-align:center;">
                            <p style="font-size:12px;color:#999;">
                                Mudanza Fácil
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>
