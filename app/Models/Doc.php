<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Str;

class Doc extends Model
{
    use HasFactory;

    public function getTitleAttribute()
    {
        $headline = json_decode($this->headline);
        return $headline->main;
    }

    public function getSectionRefAttribute()
    {
        return Str::slug($this->section_name);
    }
}
