<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Expediente de seguro finalizado</title>
</head>

<body style=" margin:0; padding:0; background:#F4F7F6; font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 16px;">

                <table width="100%" cellpadding="0" cellspacing="0"
                    style="  max-width:650px; background:#ffffff; border-radius:16px; overflow:hidden; ">
                    <!-- Header -->
                    <tr>
                        <td style=" background:#09233E; padding:28px 24px; text-align:center; ">
                            <h1 style="  margin:0;  color:#ffffff;  font-size:24px; ">
                                Expediente de seguro finalizado
                            </h1>
                        </td>
                    </tr>

                    <!-- Logo -->
                    <tr>
                        <td align="center" style="padding:25px 20px 10px;">
                            <img src="https://app.mudanzafacil.com.mx/logo/icon.png" alt="Mudanza Fácil"
                                style="height:55px;">
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style=" padding:20px 30px 30px; color:#4A5E71; ">

                            <p style="font-size:16px;line-height:1.6;">
                                Se ha finalizado un expediente de seguro correspondiente a una solicitud de mudanza.
                            </p>

                            <!-- Folio -->
                            <div
                                style=" background:#F4F7F6; border:1px solid #E8ECEB; border-radius:10px; padding:16px; margin:20px 0;  ">
                                <span
                                    style=" display:block; color:#6F7F8D; font-size:12px; text-transform:uppercase; font-weight:bold;  margin-bottom:5px; ">
                                    Folio
                                </span>

                                <strong style=" color:#09233E; font-size:18px; ">
                                    {{ $expediente->folio }}
                                </strong>
                            </div>

                            <h2 style=" color:#09233E; font-size:18px; margin-top:25px; ">
                                Cliente
                            </h2>

                            <p style="line-height:1.7;">
                                <strong>Nombre:</strong>
                                {{ $expediente->nombre ?? 'No registrado' }}
                                <br>

                                <strong>Correo:</strong>
                                {{ $expediente->email ?? 'No registrado' }}
                                <br>

                                <strong>Teléfono:</strong>
                                {{ $expediente->telefono ?? 'No registrado' }}
                            </p>

                            <h2 style="  color:#09233E;  font-size:18px;  margin-top:25px; ">
                                Seguro
                            </h2>

                            <p style="line-height:1.7;">
                                <strong>Tipo:</strong>
                                {{ $expediente->tipo_seguro ?? 'No registrado' }}
                                <br>

                                <strong>Valor menaje:</strong>
                                $
                                {{ number_format((float) ($expediente->valor_menaje ?? 0), 2) }}
                                MXN
                                <br>

                                <strong>Valor automóvil:</strong>
                                $
                                {{ number_format((float) ($expediente->valor_automovil ?? 0), 2) }}
                                MXN
                                <br>

                                <strong>Prima estimada:</strong>
                                $
                                {{ number_format((float) ($expediente->prima_estimada ?? 0), 2) }}
                                MXN

                                <br>

                                <strong>Modalidad:</strong>
                                {{ $expediente->modalidad_datos === 'asistida'
    ? 'Póliza asistida'
    : 'Póliza estándar' }}

                                <br>

                                <strong>Porcentaje aplicado:</strong>
                                {{ $expediente->modalidad_datos === 'asistida'
    ? '1.75%'
    : '1.35%' }}
                            </p>

                            <h2 style=" color:#09233E;  font-size:18px;  margin-top:25px;  ">
                                Datos de la mudanza
                            </h2>

                            <p style="line-height:1.7;">
                                <strong>Origen:</strong>
                                {{ $expediente->origen ?? 'No registrado' }}
                                <br>

                                <strong>Destino:</strong>
                                {{ $expediente->destino ?? 'No registrado' }}
                                <br>

                                <strong>Fecha de recolección:</strong>
                                {{ $expediente->fecha_recoleccion ?? 'No registrada' }}
                            </p>

                            @if($expediente->modalidad_datos === 'asistida')
                                <h2 style="color:#09233E;font-size:18px;margin-top:25px;">
                                    Póliza asistida
                                </h2>

                                <p style="line-height:1.7;">
                                    <strong>Empresa de mudanza:</strong>
                                    {{ $expediente->asistencia_empresa_mudanza ?? 'No registrada' }}

                                    <br>

                                    <strong>Contacto:</strong>
                                    {{ $expediente->asistencia_contacto ?? 'No registrado' }}

                                    <br>

                                    <strong>Teléfono / WhatsApp:</strong>
                                    {{ $expediente->asistencia_telefono ?? 'No registrado' }}
                                </p>

                                <div
                                    style=" margin-top:20px; padding:18px; background:#F4F7F6; border-left:4px solid #09233E; border-radius:0 8px 8px 0; ">

                                    <strong style="color:#09233E;">
                                        Seguimiento asistido
                                    </strong>

                                    <p style=" margin:6px 0 0; font-size:13px; line-height:1.5; ">
                                        El cliente solicitó una póliza asistida.
                                        El equipo deberá solicitar, revisar y validar
                                        la información necesaria con la empresa de mudanza
                                        y dar seguimiento con la aseguradora.
                                    </p>
                                </div>
                            @endif

                            <h2 style=" color:#09233E; font-size:18px; margin-top:25px; ">
                                Datos de la unidad
                            </h2>

                            <p style="line-height:1.7;">
                                <strong>Empresa:</strong>
                                {{ $expediente->empresa_mudanza ?? 'No registrada' }}
                                <br>

                                <strong>Propietario:</strong>
                                {{ $expediente->propietario_unidad ?? 'No registrado' }}
                                <br>

                                <strong>Marca:</strong>
                                {{ $expediente->marca_unidad ?? 'No registrada' }}
                                <br>

                                <strong>Modelo:</strong>
                                {{ $expediente->modelo_unidad ?? 'No registrado' }}
                                <br>

                                <strong>Placas:</strong>
                                {{ $expediente->placas ?? 'No registradas' }}
                                <br>

                                <strong>Chofer:</strong>
                                {{ $expediente->chofer ?? 'No registrado' }}
                            </p>

                            <div
                                style=" margin-top:30px; padding:20px; background:#E8F4F0; border-left:4px solid #1C8F6A; border-radius:0 8px 8px 0;">
                                <strong style="color:#1C8F6A;">
                                    Expediente finalizado
                                </strong>

                                <p style=" margin:6px 0 15px; font-size:13px; line-height:1.5; ">
                                    El cliente confirmó y finalizó su expediente.
                                    Puedes consultar y descargar el documento PDF completo
                                    desde el siguiente enlace.
                                </p>

                                <a href="{{ config('app.api_url') }}/api/seguros/{{ $expediente->folio }}/pdf"
                                    target="_blank"
                                    style=" display:inline-block; padding:12px 20px; background:#09233E; 
                                    color:#ffffff; text-decoration:none; border-radius:8px; font-weight:bold; font-size:14px;  ">
                                    Ver / descargar expediente PDF
                                </a>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style=" padding:20px;  text-align:center;  border-top:1px solid #E8ECEB; ">
                            <p style=" margin:0; font-size:12px; color:#6F7F8D; ">
                                Mudanza Fácil
                                <br>
                                Expediente de seguro {{ $expediente->folio }}
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>