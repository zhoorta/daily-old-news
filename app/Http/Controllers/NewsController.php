<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

use Carbon\Carbon;

use App\Models\Doc;

class NewsController extends Controller
{
    public function index() {
        $decades = [];
        $year = 1850;

        while($year < Carbon::now()->year - 10) {
            $decades[] = $year;
            $year += 10;
        }

        return view('welcome', ['decades' => $decades]);
    }

    public function decade($decade) {

        $year = $decade + substr(Carbon::now()->year, 3);
        $date = $year . '-' . Carbon::now()->format('m-d');
        
        $docs = Doc::wherePubDate($date)->orderBy('section_name')->get();

        $sections = array_unique($docs->pluck('section_name')->toArray());
        //dd($sections);
        //dd($docs[0]);
        //dd($docs->pluck('headline'));
        //dd($docs->pluck('abstract'));

        return view('news', [
            'decade' => $decade,
            'date' => $date,
            'docs' => $docs,
            'sections' => $sections,
            'default_section' => count($sections) == 1 ? 'archives' : 'world',
        ]);
    }
}
