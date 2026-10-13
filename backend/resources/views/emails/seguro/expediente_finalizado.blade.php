<!DOCTYPE html>

<html lang="es">

<head>
    <meta charset="UTF-8">
    <title> Expediente de seguro finalizado </title>
</head>

<body style=" margin:0; padding:0; background:#F4F7F6; font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0"
                    style=" max-width:650px; background:#ffffff; border-radius:16px; overflow:hidden; ">

                    <tr>
                        <td style=" background:#09233E; padding:28px 24px; text-align:center; ">
                            <h1 style=" margin:0; color:#ffffff; font-size:22px; ">
                                Expediente de seguro finalizado
                            </h1>
                        </td>
                    </tr>

                    <!-- Logo -->
                    <tr>
                        <td align="center" style="padding:22px;">
                            <img src="https://app.mudanzafacil.com.mx/logo/icon.png" alt="Mudanza Fácil"
                                style="height:60px;">
                        </td>
                    </tr>

                    <tr>
                        <td style=" padding:20px 30px 30px; color:#4A5E71; ">
                             <p style="margin:0 0 15px; font-size:16px; text-align: justify;">
                                Se ha finalizado un expediente de seguro correspondiente a una solicitud de mudanza.
                            </p>

                            <div
                                style=" background:#F4F7F6; border:1px solid #E8ECEB; border-radius:10px; padding:16px; margin:20px 0; ">
                                <span
                                    style=" display:block; color:#6F7F8D; font-size:12px; margin-top:25px;text-transform:uppercase; font-weight:bold; margin-bottom:5px;  ">
                                    Folio
                                </span>

                                <strong style=" color:#09233E; font-size:18px; margin-top:20px;">
                                    {{ $expediente->folio }}
                                </strong>
                            </div>

                            <h2 style=" color:#09233E; font-size:18px; margin-top:25px; ">
                                Cliente
                            </h2>

                            <p style="line-height:1.7; font-size:16px;">
                                <strong>Nombre:</strong>
                                {{ $expediente->nombre ?? 'No registrado' }}

                                <br>

                                <strong>Correo:</strong>
                                {{ $expediente->email ?? 'No registrado' }}

                                <br>

                                <strong>Teléfono:</strong>
                                {{ $expediente->telefono ?? 'No registrado' }}
                            </p>

                            <h2 style=" color:#09233E; font-size:18px; margin-top:25px; ">
                                Seguro
                            </h2>

                           <p style="line-height:1.7; font-size:16px;">
                                <strong>Tipo:</strong>

                                @if($expediente->tipo_seguro === 'menaje')
                                Menaje
                                @elseif($expediente->tipo_seguro === 'automovil')
                                Automóvil
                                @elseif($expediente->tipo_seguro === 'menaje_auto')
                                Menaje + Automóvil
                                @else
                                No especificado
                                @endif
                                <br>

                                @if($expediente->tipo_seguro === 'menaje' || $expediente->tipo_seguro === 'menaje_auto')
                                <strong>Valor menaje:</strong> $
                                {{ number_format((float) ($expediente->valor_menaje ?? 0), 2) }} MXN
                                <br>
                                @endif

                                @if($expediente->tipo_seguro === 'automovil' || $expediente->tipo_seguro ===
                                'menaje_auto')
                                <strong>Valor automóvil:</strong> $
                                {{ number_format((float) ($expediente->valor_automovil ?? 0), 2) }} MXN
                                <br>
                                @endif

                                <strong>Prima estimada:</strong> $
                                {{ number_format((float) ($expediente->prima_estimada ?? 0), 2) }} MXN

                                {{-- <br>

                                <br>
                                <strong>Porcentaje aplicado:</strong>
                                {{ $expediente->modalidad_datos === 'asistida' ? '1.75%' : '1.35%' }} --}}
                            </p>

                            <h2 style=" color:#09233E; font-size:18px; margin-top:25px; ">
                                Datos de la mudanza
                            </h2>

                           <p style="line-height:1.7; font-size:16px;">
                                <strong>Empresa de mudanza:</strong>
                                {{ $expediente->empresa_mudanza ?? 'No registrada' }}
                                <br>

                                <strong>Origen:</strong>
                                {{ $expediente->origen ?? 'No registrado' }}
                                <br>

                                <strong>Destino:</strong>
                                {{ $expediente->destino ?? 'No registrado' }}
                                <br>

                                <strong>Fecha de salida:</strong>
                                {{ $expediente->fecha_salida ?? 'No registrada' }}
                                <br>

                                <strong>Tiempo aproximado de llegada:</strong>
                                @if($expediente->fecha_llegada === '1-7')
                                1-7 días
                                @elseif($expediente->fecha_llegada === '8-12')
                                8-12 días
                                @elseif($expediente->fecha_llegada === '13-18')
                                13-18 días
                                @elseif($expediente->fecha_llegada === '18+')
                                +18 días
                                @else
                                No registrado
                                @endif
                                <br>

                                <strong>Tipo de servicio:</strong>
                                @if($expediente->tipo_servicio === 'compartido')
                                Compartido
                                @elseif($expediente->tipo_servicio === 'exclusivo')
                                Exclusivo
                                @else
                                No especificado
                                @endif
                            </p>

                            @if($expediente->inventario)
                            <div
                                style=" margin-top:15px; padding:15px; background:#F4F7F6; border:1px solid #E8ECEB; border-radius:8px; ">
                                <strong style="color:#09233E;">
                                    Inventario
                                </strong>

                                <p style=" margin:6px 0 0; font-size:14px; line-height:1.5; ">
                                    {{ $expediente->inventario }}
                                </p>
                            </div>
                            @endif

                            <h2 style=" color:#09233E; font-size:18px; margin-top:25px; ">
                                Datos de la unidad
                            </h2>

                            <p style="line-height:1.7; font-size:16px;">
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

                            @if($expediente->tipo_seguro === 'automovil' || $expediente->tipo_seguro === 'menaje_auto')
                            <h2 style=" color:#09233E; font-size:18px; margin-top:25px; ">
                                Datos del automóvil
                            </h2>

                            @if($expediente->automovil_foto_circulacion_url)
                            <div
                                style=" margin-top:20px; padding:18px; background:#F4F7F6; border:1px solid #E8ECEB; border-radius:10px; ">
                                <strong style="color:#09233E;">
                                    Foto de circulación del automóvil
                                </strong>

                                <p style=" margin:8px 0 15px; font-size:14px; line-height:1.5; ">
                                    Se adjuntó una imagen de la documentación de circulación del automóvil al
                                    expediente.
                                </p>

                                <a href="{{ $expediente->automovil_foto_circulacion_url }}" target="_blank"
                                    style=" display:inline-block; padding:10px 16px; background:#09233E; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:bold; font-size:13px; ">
                                    Ver / descargar imagen
                                </a>
                            </div>
                            @endif
                            @endif

                            <div
                                style=" margin-top:30px; padding:20px; background:#E8F4F0; border-left:4px solid #1C8F6A; border-radius:0 8px 8px 0; ">
                                <strong style="color:#1C8F6A;">
                                    Expediente finalizado
                                </strong>

                                <p style=" margin:6px 0 15px; font-size:13px; line-height:1.5; ">
                                    El cliente confirmó y finalizó su expediente.
                                    Puedes consultar y descargar el documento PDF completo desde el siguiente enlace.
                                </p>

                                <a href="{{ config('app.frontend_url') }}/seguros/{{ $expediente->folio }}/pdf"
                                    target="_blank" style=" display:inline-block; padding:12px 20px; background:#09233E; color:#ffffff;
                                    text-decoration:none; border-radius:8px; font-weight:bold; font-size:18px;
                                ">
                                    Ver / descargar expediente PDF
                                </a>
                            </div>
                        </td>
                    </tr>

                    <!-- Despedida -->
                    <tr>
                        <td style="padding:0 30px 24px; text-align:center; color:#4A5E71;">
                            <p style="margin:0 0 8px; font-size:16px;">
                                Gracias por confiar en nosotros.
                            </p>

                            <strong style="color:#09233E; font-size:16px;">
                                Equipo Mudanza Fácil
                            </strong>
                        </td>
                    </tr>

                    <!-- Pie -->
                    <tr>
                        <td
                            style=" padding:16px 30px; text-align:center; background-color:#F9FBFC; border-top:1px solid #E9EEF2; ">
                            <p style=" margin:0; color:#8998A5; font-size:14px; line-height:1.5; ">
                                Folio de seguimiento:
                                <strong style=" color:#2F5C8C; letter-spacing:1px; ">
                                    {{ $expediente->folio }}
                                </strong>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>