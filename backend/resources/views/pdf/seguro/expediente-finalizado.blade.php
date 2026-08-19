<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">

    <style>
        @page {
            margin: 35px;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            color: #4A5E71;
            font-size: 11px;
            line-height: 1.5;
        }

        .header {
            background: #09233E;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            margin-bottom: 25px;
        }

        .header h1 {
            margin: 0;
            font-size: 22px;
        }

        .header p {
            margin: 6px 0 0;
            font-size: 11px;
        }

        .folio {
            background: #F4F7F6;
            border: 1px solid #E8ECEB;
            padding: 12px;
            margin-bottom: 20px;
        }

        .folio-label {
            color: #6F7F8D;
            font-size: 9px;
            text-transform: uppercase;
        }

        .folio-value {
            color: #09233E;
            font-size: 16px;
            font-weight: bold;
        }

        .section {
            margin-bottom: 22px;
        }

        .section-title {
            background: #09233E;
            color: #ffffff;
            padding: 8px 10px;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 8px;
        }

        table.data {
            width: 100%;
            border-collapse: collapse;
        }

        table.data td {
            border: 1px solid #E8ECEB;
            padding: 7px 9px;
            vertical-align: top;
        }

        table.data td.label {
            width: 35%;
            background: #F4F7F6;
            color: #09233E;
            font-weight: bold;
        }

        .premium {
            background: #FFF4E6;
            border: 1px solid #F1A43F;
            padding: 12px;
            margin-top: 10px;
        }

        .premium-label {
            color: #6F7F8D;
            font-size: 9px;
            text-transform: uppercase;
        }

        .premium-value {
            color: #09233E;
            font-size: 17px;
            font-weight: bold;
        }

        .footer {
            margin-top: 30px;
            padding-top: 12px;
            border-top: 1px solid #E8ECEB;
            text-align: center;
            color: #6F7F8D;
            font-size: 9px;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>Expediente de Seguro</h1>

        <p>
            Mudanza Fácil
        </p>
    </div>

    <div class="folio">
        <div class="folio-label">
            Folio del expediente
        </div>

        <div class="folio-value">
            {{ $expediente->folio }}
        </div>
    </div>

    <!-- Cliente -->
    <div class="section">
        <div class="section-title">
            Datos del cliente
        </div>

        <table class="data">
            <tr>
                <td class="label">
                    Nombre completo
                </td>

                <td>
                    {{ $expediente->nombre ?? 'No registrado' }}
                </td>
            </tr>

            <tr>
                <td class="label">
                    Correo electrónico
                </td>

                <td>
                    {{ $expediente->email ?? 'No registrado' }}
                </td>
            </tr>

            <tr>
                <td class="label">
                    Teléfono / WhatsApp
                </td>

                <td>
                    {{ $expediente->telefono ?? 'No registrado' }}
                </td>
            </tr>
        </table>
    </div>

    <!-- Seguro -->
    <div class="section">
        <div class="section-title">
            Información del seguro
        </div>

        <table class="data">
            <tr>
                <td class="label">
                    Tipo de seguro
                </td>

                <td>
                    {{ $expediente->tipo_seguro ?? 'No registrado' }}
                </td>
            </tr>

            <tr>
                <td class="label">
                    Valor declarado del menaje
                </td>

                <td>
                    $
                    {{ number_format((float) ($expediente->valor_menaje ?? 0), 2) }}
                    MXN
                </td>
            </tr>

            <tr>
                <td class="label">
                    Valor declarado del automóvil
                </td>

                <td>
                    $
                    {{ number_format((float) ($expediente->valor_automovil ?? 0), 2) }}
                    MXN
                </td>
            </tr>
        </table>

        <div class="premium">
            <div class="premium-label">
                Prima estimada
            </div>

            <div class="premium-value">
                $
                {{ number_format((float) ($expediente->prima_estimada ?? 0), 2) }}
                MXN
            </div>

            <div>
                Cálculo: valor declarado por el cliente × 1.35%
            </div>

        </div>

    </div>

    <!-- Mudanza -->
    <div class="section">
        <div class="section-title">
            Datos de la mudanza
        </div>

        <table class="data">
            <tr>
                <td class="label">
                    Origen
                </td>

                <td>
                    {{ $expediente->origen ?? 'No registrado' }}
                </td>
            </tr>

            <tr>
                <td class="label">
                    Destino
                </td>

                <td>
                    {{ $expediente->destino ?? 'No registrado' }}
                </td>
            </tr>

            @if($expediente->inventario)
                <tr>
                    <td class="label">
                        Inventario
                    </td>

                    <td>
                        {{ $expediente->inventario }}
                    </td>
                </tr>
            @endif
        </table>
    </div>

    <!-- Unidad -->
    <div class="section">
        <div class="section-title">
            Datos de la unidad
        </div>

        <table class="data">
            <tr>
                <td class="label">
                    Empresa de mudanza
                </td>

                <td>
                    {{ $expediente->empresa_mudanza ?? 'No registrada' }}
                </td>
            </tr>

            <tr>
                <td class="label">
                    Propietario de la unidad
                </td>

                <td>
                    {{ $expediente->propietario_unidad ?? 'No registrado' }}
                </td>
            </tr>

            <tr>
                <td class="label">
                    Marca
                </td>

                <td>
                    {{ $expediente->marca_unidad ?? 'No registrada' }}
                </td>
            </tr>

            <tr>
                <td class="label">
                    Modelo
                </td>

                <td>
                    {{ $expediente->modelo_unidad ?? 'No registrado' }}
                </td>
            </tr>

            <tr>
                <td class="label">
                    Placas
                </td>

                <td>
                    {{ $expediente->placas ?? 'No registradas' }}
                </td>
            </tr>

            <tr>
                <td class="label">
                    Chofer
                </td>

                <td>
                    {{ $expediente->chofer ?? 'No registrado' }}
                </td>
            </tr>

            <tr>
                <td class="label">
                    Fecha de salida
                </td>

                <td>
                    {{ $expediente->fecha_salida ?? 'No registrada' }}
                </td>
            </tr>

            <tr>
                <td class="label">
                    Fecha de llegada
                </td>

                <td>
                    {{ $expediente->fecha_llegada ?? 'No registrada' }}
                </td>
            </tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">
            Estado del expediente
        </div>

        <table class="data">
            <tr>
                <td class="label">
                    Estado
                </td>

                <td>
                    Completado
                </td>
            </tr>

            <tr>
                <td class="label">
                    Fecha de finalización
                </td>

                <td>
                    {{ optional($expediente->cliente_finalizo_at)->format('d/m/Y H:i') }}
                </td>
            </tr>
        </table>
    </div>

    <div class="footer">
        Documento generado automáticamente por Mudanza Fácil.
        <br>
        Folio:
        {{ $expediente->folio }}
    </div>
</body>

</html>