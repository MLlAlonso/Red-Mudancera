<?php

require __DIR__ . '/vendor/autoload.php';

use Minishlink\WebPush\VAPID;

$keys = VAPID::createVapidKeys();
echo "PUBLIC_KEY=" . $keys['publicKey'] . PHP_EOL;
echo "PRIVATE_KEY=" . $keys['privateKey'] . PHP_EOL;