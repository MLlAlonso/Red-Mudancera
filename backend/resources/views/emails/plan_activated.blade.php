<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Suscripción activada</title>
</head>

<body style="font-family: Arial; background:#F4F7F6; padding:20px;">

    <div style="max-width:520px;margin:auto;background:white;padding:24px;border-radius:12px;">

        <h2 style="color:#09233E;text-align:center;">
            🎉 ¡Bienvenido al plan {{ $plan }}!
        </h2>

        <p style="text-align:center;color:#555;">
            Tu suscripción ya está activa. Ahora tienes acceso a nuevas oportunidades dentro de la red.
        </p>

        <hr>

        <p><strong>Empresa:</strong> {{ $empresa->empresa }}</p>
        <p><strong>Plan:</strong> {{ $plan }}</p>
        <p><strong>Inicio:</strong> {{ $inicio }}</p>
        <p><strong>Vigencia:</strong> {{ $fin }}</p>

        <hr>

        <p style="text-align:center;">
            Accede a tu panel para comenzar a aprovechar tu plan.
        </p>

        <div style="text-align:center;margin-top:20px;">
            <a href="https://app.mudanzafacil.com.mx/empresa/dashboard"
               style="background:#09233E;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;">
                Ir a la plataforma
            </a>
        </div>

    </div>

</body>
</html>