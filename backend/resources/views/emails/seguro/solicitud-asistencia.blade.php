<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        Solicitud de póliza asistida
    </title>
</head>

<body style=" margin: 0; padding: 0; background-color: #f4f6f8; font-family: Arial, Helvetica, sans-serif; color: #1f2937;">
    <div style=" width: 100%; padding: 40px 20px; box-sizing: border-box; ">
        <div style=" max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; ">
            <div style=" padding: 30px; background-color: #111827; color: #ffffff; ">
                <h1 style=" margin: 0 0 10px 0; font-size: 24px; line-height: 1.3; ">
                    Solicitud de póliza asistida
                </h1>

                <p style=" margin: 0; font-size: 15px; line-height: 1.6; color: #d1d5db; ">
                    Un cliente ha solicitado asistencia para completar su expediente de seguro.
                </p>
            </div>

            <div style=" padding: 30px; ">
                <p style=" margin: 0 0 25px 0; font-size: 15px; line-height: 1.7; ">
                    Se ha registrado una nueva solicitud de
                    <strong>póliza asistida</strong> en Mudanza Fácil.
                </p>

                <div style=" margin-bottom: 25px; padding: 20px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; ">
                    <h2 style=" margin: 0 0 15px 0; font-size: 17px; color: #111827; ">
                        Datos del expediente
                    </h2>

                    <p style=" margin: 8px 0; font-size: 14px; line-height: 1.6; ">
                        <strong>Folio:</strong>
                        {{ $expediente->folio }}
                    </p>

                    <p style=" margin: 8px 0; font-size: 14px; line-height: 1.6; ">
                        <strong>Cliente:</strong>
                        {{ $expediente->nombre }}
                    </p>

                    <p style=" margin: 8px 0; font-size: 14px; line-height: 1.6; ">
                        <strong>Correo:</strong>
                        {{ $expediente->email }}
                    </p>

                    <p style=" margin: 8px 0; font-size: 14px; line-height: 1.6; ">
                        <strong>Teléfono:</strong>
                        {{ $expediente->telefono }}
                    </p>
                </div>

                <div style=" margin-bottom: 25px; padding: 20px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; ">
                    <h2 style=" margin: 0 0 15px 0; font-size: 17px; color: #111827; ">
                        Datos de asistencia
                    </h2>

                    <p style=" margin: 8px 0; font-size: 14px; line-height: 1.6; ">
                        <strong>Empresa de mudanza:</strong>
                        {{ $expediente->asistencia_empresa_mudanza }}
                    </p>

                    <p style=" margin: 8px 0; font-size: 14px; line-height: 1.6; ">
                        <strong>Contacto:</strong>
                        {{ $expediente->asistencia_contacto }}
                    </p>

                    <p style=" margin: 8px 0; font-size: 14px; line-height: 1.6; ">
                        <strong>Teléfono / WhatsApp:</strong>
                        {{ $expediente->asistencia_telefono }}
                    </p>
                </div>
            </div>

            <div style=" padding: 24px 30px 30px 30px; text-align: center; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                <a href="https://app.mudanzafacil.com.mx/superadmin/login" 
                style=" display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #ffffff; font-size: 14px; font-weight: 600; line-height: 1.4; text-decoration: none; border-radius: 6px; ">
                    Ir al dashboard de Admin
                </a>
            </div>
        </div>
    </div>
</body>

</html>