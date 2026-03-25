<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class MailtrapService
{
    public static function send(array $to, string $subject, string $html)
    {
        return Http::withToken(config('services.mailtrap.token'))
            ->post('https://send.api.mailtrap.io/api/send', [
                'from' => [
                    'email' => config('mail.from.address'),
                    'name'  => config('mail.from.name'),
                ],
                'to' => $to,
                'subject' => $subject,
                'html' => $html,
                'category' => 'Transactional',
            ]);
    }
}
