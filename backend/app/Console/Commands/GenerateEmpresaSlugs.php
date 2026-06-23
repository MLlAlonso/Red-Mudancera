<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use App\Modules\Empresa\Models\Empresa;

class GenerateEmpresaSlugs extends Command
{
    protected $signature = 'empresas:generate-slugs';

    protected $description = 'Genera slugs para empresas existentes';

    public function handle()
    {
        Empresa::whereNull('slug')
            ->chunk(100, function ($empresas) {

                foreach ($empresas as $empresa) {

                    $baseSlug = Str::slug($empresa->empresa);
                    $slug = $baseSlug;
                    $counter = 1;

                    while (
                        Empresa::where('slug', $slug)
                            ->where('id', '!=', $empresa->id)
                            ->exists()
                    ) {
                        $slug = $baseSlug . '-' . $counter;
                        $counter++;
                    }

                    $empresa->slug = $slug;
                    $empresa->save();
                }
            });

        $this->info('Slugs generados');
    }
}