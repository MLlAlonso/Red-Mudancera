<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Reporte Partner</title>
</head>

<body style=" margin:0; padding:0; background:#F4F7F6; font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" 
                style=" max-width:700px; background:#ffffff; border-radius:18px; overflow:hidden;">

                    <!-- HEADER -->
                    <tr>
                        <td style=" background:#09233E; padding:28px; text-align:center;" >
                            <h1 style="margin:0;color:#ffffff;font-size:22px;">
                                Reporte mensual de partner
                            </h1>

                            <p style=" margin-top:10px; color:#DCE6EF;" >
                                {{ $partner->nombre }}
                            </p>
                        </td>
                    </tr>

                    <!-- PERIOD -->
                    <tr>
                        <td style=" padding:24px; text-align:center; " >
                            <p
                                style=" margin:0; color:#4A5E71; font-size:15px; " >
                                Periodo seleccionado
                            </p>

                            <h2 style=" margin-top:10px; color:#09233E; font-size:32px; " >
                                {{ $monthName }} {{ $year }}
                            </h2>
                        </td>
                    </tr>

                    <!-- METRICS -->
                    <tr>
                        <td style="padding:0 24px 24px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;" >
                                <tr>
                                    <td style=" background:#F4F7F6; padding:18px; border-radius:12px; " >
                                        <p style=" margin:0; color:#6F7F8D; font-size:14px; " >
                                            Solicitudes generadas
                                        </p>

                                        <h2 style=" margin:10px 0 0; color:#09233E; font-size:34px; " >
                                            {{ $solicitudesGeneradas }}
                                        </h2>
                                    </td>
                                </tr>

                                <tr>
                                    <td height="16"></td>
                                </tr>

                                <tr>
                                    <td style=" background:#F4F7F6; padding:18px; border-radius:12px; " >
                                        <p style=" margin:0; color:#6F7F8D; font-size:14px; " >
                                            Solicitudes vendidas
                                        </p>

                                        <h2 style=" margin:10px 0 0; color:#09233E; font-size:34px; " >
                                            {{ $solicitudesVendidas }}
                                        </h2>
                                    </td>
                                </tr>

                                <tr>
                                    <td height="16"></td>
                                </tr>

                                <tr>
                                    <td style=" background:#F4F7F6; padding:18px; border-radius:12px; " >
                                        <p style=" margin:0; color:#6F7F8D; font-size:14px; " >
                                            Créditos generados
                                        </p>

                                        <h2 style=" margin:10px 0 0; color:#09233E; font-size:34px; " >
                                            {{ $creditosGenerados }}
                                        </h2>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td style=" padding:24px; text-align:center; border-top:1px solid #E2E8EE; " >
                            <p style=" margin:0; color:#999; font-size:12px; " >
                                Reporte generado automáticamente<br>
                                {{ now()->format('d/m/Y H:i') }}
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>