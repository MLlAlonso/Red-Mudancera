<?php

use Illuminate\Support\Facades\Route;
use App\Modules\PartnerReferral\Controllers\PartnerReferralController;

Route::prefix('partners')->group(function () {

    Route::get('/{slug}', [PartnerReferralController::class, 'show']);

});