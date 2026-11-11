
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">

    <style>
        @page {
            margin: 20px;
        }

        * {
            box-sizing: border-box;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            color: {{ $colores['text'] ?? '#202B35' }};
            font-size: 14px;
        }

        .header {
            background: {{ $colores['primary'] ?? '#09233E' }};
            color: #fff;
            padding: 10px;
        }

        .header-table {
            width: 100%;
        }

        .logo {
            max-width: 130px;
            max-height: 65px;
        }

        .folio {
            text-align: right;
        }

        .folio strong {
            font-size: 18px;
        }

        .section {
            margin-top: 18px;
        }

        .section-title {
            background: {{ $colores['background'] ?? '#F4F7F6' }};
            border-left: 4px solid {{ $colores['accent'] ?? '#1C8F6A' }};
            padding: 5px;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
        }

        .data-table td {
            padding: 4px;
            border-bottom: 1px solid #e5e7eb;
            vertical-align: top;
        }

        .label {
            color: #7b8794;
            font-size: 12px;
            display: block;
            margin-bottom: 2px;
        }

        .value {
            font-weight: bold;
            font-size: 14px;
        }

        .amount {
            background: {{ $colores['background'] ?? '#F4F7F6' }};
            border: 1px solid #e5e7eb;
            padding: 14px;
            margin-top: 16px;
        }

        .amount strong {
            color: {{ $colores['accent'] ?? '#1C8F6A' }};
            font-size: 24px;
        }

        .notes {
            background: #f8fafc;
            padding: 10px;
            margin-top: 10px;
            line-height: 1.7;
        }

        .observations {
            margin-top: 10px;
            padding: 10px;
            border: 1px solid #e5e7eb;
            min-height: 50px;
        }

        .signatures {
            width: 100%;
            margin-top: 30px;
        }

        .signature-cell {
            width: 50%;
            text-align: center;
            vertical-align: bottom;
            padding: 10px 15px;
        }

        .signature-image {
            height: 65px;
            max-width: 180px;
        }

        .signature-line {
            border-top: 1px solid #64748b;
            padding-top: 8px;
        }

        .footer {
            margin-top: 20px;
            border-top: 2px solid {{ $colores['accent'] ?? '#1C8F6A' }};
            padding-top: 10px;
            text-align: center;
            color: #64748b;
            font-size: 12px;
        }
    </style>
</head>

<body>
    <div class="header">
        <table class="header-table">
            <tr>
                <td width="55%">
                    @if($logo)
                        <img src="{{ $logo }}" class="logo">
                    @else
                        <strong style="font-size: 19px;">
                            {{ $empresa['nombre'] }}
                        </strong>
                    @endif
                </td>

                <td class="folio" width="45%">
                    <span>RECIBO DE PAGO</span>
                    <br><br>
                    <strong>{{ $recibo->folio }}</strong>
                    <br>
                    <span>
                        {{ $recibo->fecha_recibo->format('d/m/Y') }}
                    </span>
                </td>
            </tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">
            CLIENTE Y SERVICIO
        </div>

        <table class="data-table">
            <tr>
                <td width="50%">
                    <span class="label">Cliente</span>
                    <span class="value">
                        {{ $recibo->nombre_cliente }}
                    </span>
                </td>

                <td width="50%">
                    <span class="label">Ciudad</span>
                    <span class="value">
                        {{ $recibo->ciudad }}
                    </span>
                </td>
            </tr>

            <tr>
                <td>
                    <span class="label">Origen</span>
                    <span class="value">
                        {{ $recibo->origen }}
                    </span>
                </td>

                <td>
                    <span class="label">Destino</span>
                    <span class="value">
                        {{ $recibo->destino }}
                    </span>
                </td>
            </tr>
        </table>

    </div>

    <div class="section">
        <div class="section-title">
            INFORMACIÓN DEL PAGO
        </div>

        <table class="data-table">
            <tr>
                <td width="50%">
                    <span class="label">Tipo de pago</span>
                    <span class="value">
                        {{ [
                            'anticipo' => 'Anticipo',
                            'pago_parcial' => 'Pago parcial',
                            'liquidacion' => 'Liquidación'
                        ][$recibo->tipo_pago] }}
                    </span>
                </td>

                <td width="50%">
                    <span class="label">Forma de pago</span>
                    <span class="value">
                        {{ [
                            'efectivo' => 'Efectivo',
                            'transferencia' => 'Transferencia',
                            'deposito' => 'Depósito',
                            'retiro_sin_tarjeta' => 'Retiro sin tarjeta',
                            'tarjeta' => 'Tarjeta',
                            'cheque' => 'Cheque'
                        ][$recibo->forma_pago] }}
                    </span>
                </td>
            </tr>

            <tr>
                <td colspan="2">
                    <span class="label">Total acordado</span>
                    <span class="value">
                        @if($recibo->total_acordado !== null)
                            ${{ number_format($recibo->total_acordado, 2) }} MXN
                        @else
                            No especificado
                        @endif
                    </span>
                </td>
            </tr>
        </table>

        <div class="amount">
            <span class="label">MONTO DE ESTE PAGO</span>
            <strong>
                ${{ number_format($recibo->monto, 2) }}
            </strong>
            <span> MXN</span>
        </div>

    </div>

    <div class="notes">
        <strong>NOTAS IMPORTANTES</strong>
        <br>
        Este recibo ampara únicamente el pago descrito en este documento.
        No es una factura ni un comprobante fiscal.
        <br>
        El saldo se liquida a la entrega, antes de descargar.
        <br>
        Los datos de este recibo se usan solo para el servicio contratado.
        <br>
        Conserva este documento hasta que concluya el servicio.
    </div>

    @if($recibo->observaciones)
        <div class="observations">
            <strong>OBSERVACIONES</strong>
            <br><br>
            {{ $recibo->observaciones }}
        </div>
    @endif

    <table class="signatures">
        <tr>
            <td class="signature-cell">
                @if($firmaEmpresa)
                    <img src="{{ $firmaEmpresa }}" class="signature-image">
                @endif

                <div class="signature-line">
                    Firma de {{ $empresa['representante'] ?? $empresa['nombre'] }}
                    <br>
                    {{ $empresa['nombre'] }}
                </div>
            </td>

            <td class="signature-cell">
                @if($firmaCliente)
                    <img src="{{ $firmaCliente }}" class="signature-image">
                @endif

                <div class="signature-line">
                    Firma del cliente
                    <br>
                    {{ $recibo->nombre_cliente }}
                </div>
            </td>
        </tr>
    </table>

    <div class="footer">
        {{ $empresa['nombre'] }} | {{ $empresa['telefono'] ?? '' }}
        <br>
        Documento generado mediante Mudanza Fácil.
    </div>

</body>
</html>
