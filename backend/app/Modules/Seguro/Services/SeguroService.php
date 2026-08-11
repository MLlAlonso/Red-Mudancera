<?php

namespace App\Modules\Seguro\Services;

use App\Modules\Seguro\Repositories\SeguroRepository;

class SeguroService
{
    protected SeguroRepository $repository;

    public function __construct(SeguroRepository $repository)
    {
        $this->repository = $repository;
    }
}