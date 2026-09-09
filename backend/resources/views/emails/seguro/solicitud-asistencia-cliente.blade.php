<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>
        Solicitud de póliza asistida recibida
    </title>
</head>

<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: Arial, Helvetica, sans-serif; color: #1f2937;">
    <div style="width: 100%; padding: 40px 20px; box-sizing: border-box;">
        <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
            <div style="padding: 30px; background-color: #111827; color: #ffffff;">
                <h1 style="margin: 0 0 10px 0; font-size: 24px; line-height: 1.3;">
                    Solicitud enviada correctamente
                </h1>

                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #d1d5db;">
                    Hemos recibido tu solicitud de póliza asistida.
                </p>
            </div>

            <div style="padding: 30px;">
                <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.7;">
                    Hola
                    <strong>{{ $expediente->nombre }}</strong>,
                </p>

                <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.7;">
                    Tu solicitud de <strong>póliza asistida</strong> fue enviada correctamente.
                </p>

                <p style="margin: 0 0 25px 0; font-size: 15px; line-height: 1.7;">
                    Nuestro equipo recibió tu solicitud y se pondrá en contacto contigo para ayudarte a completar la
                    información necesaria para tu póliza.
                </p>

                <div style="margin-bottom: 25px; padding: 20px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">

                    <h2 style="margin: 0 0 15px 0; font-size: 17px; color: #111827;">
                        Datos de tu solicitud
                    </h2>

                    <p style="margin: 8px 0; font-size: 14px; line-height: 1.6;">
                        <strong>Folio:</strong>
                        {{ $expediente->folio }}
                    </p>

                    <p style="margin: 8px 0; font-size: 14px; line-height: 1.6;">
                        <strong>Tipo de solicitud:</strong>
                        Póliza asistida
                    </p>

                    <p style="margin: 8px 0; font-size: 14px; line-height: 1.6;">
                        <strong>Empresa de mudanza:</strong>
                        {{ $expediente->asistencia_empresa_mudanza }}
                    </p>

                    <p style="margin: 8px 0; font-size: 14px; line-height: 1.6;">
                        <strong>Contacto:</strong>
                        {{ $expediente->asistencia_contacto }}
                    </p>
                </div>

                <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #4b5563;">
                    Conserva tu folio
                    <strong>{{ $expediente->folio }}</strong>
                    para futuras consultas relacionadas con tu solicitud.
                </p>
            </div>

            <div style="padding: 24px 30px 30px 30px; text-align: center; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #6b7280;">
                    Mudanza Fácil
                </p>
            </div>
        </div>
    </div>
</body>

</html>