<?php

namespace App\Services;
use Cloudinary\Cloudinary;

class CloudinaryService
{
    protected Cloudinary $cloudinary;
    public function __construct()
    {
        $this->cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => config('services.cloudinary.cloud_name'),
                'api_key'    => config('services.cloudinary.api_key'),
                'api_secret' => config('services.cloudinary.api_secret'),
            ],
        ]);
    }

    public function upload($file, string $folder): string
    {
        $result = $this->cloudinary->uploadApi()->upload(
            $file->getRealPath(),
            [
                'folder' => $folder,
                'resource_type' => 'image',
                'overwrite' => true,
            ]
        );
        return $result['secure_url'];
    }

    public function deleteByUrl(?string $url): void
    {
        if (!$url || !str_contains($url, 'cloudinary')) return;

        $publicId = $this->extractPublicId($url);
        if ($publicId) {
            $this->cloudinary->uploadApi()->destroy($publicId);
        }
    }

    private function extractPublicId(string $url): ?string
    {
        preg_match('/upload\/(?:v\d+\/)?(.+)\.\w+$/', $url, $matches);
        return $matches[1] ?? null;
    }
}