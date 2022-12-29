<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\Http;

use App\Models\Doc;

use Carbon\Carbon;

class ImportData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        ini_set('memory_limit', '256M');
        
        $month = Carbon::now()->month;
        $curr_year = '185'.substr(Carbon::now()->year, 3);

        while($curr_year < Carbon::now()->year) {


            if(Doc::whereYear('pub_date', $curr_year)->whereMonth('pub_date', $month)->count()) {
                $this->info('Already have '.$curr_year.'-'.$month);
            }
            else {

                $this->info('Reading '.$curr_year.'-'.$month);

                $response = Http::timeout(100000)->get('https://api.nytimes.com/svc/archive/v1/'.$curr_year.'/'.$month.'.json', [
                    'api-key' => 'uceVkiEMVnF62o77zdVok0o1ltGXexay',
                ]);


                $imp_docs = $response->json()['response']['docs'];
                $this->info('Got ' . count($imp_docs));

                foreach ($imp_docs as $imp_doc) {
                    $doc = new Doc();
                    $doc->pub_date = Carbon::parse($imp_doc['pub_date'])->toDateString();
                    $doc->source = $imp_doc['source'];
                    $doc->abstract = $imp_doc['abstract'];
                    $doc->web_url = $imp_doc['web_url'];
                    $doc->snippet = $imp_doc['snippet'];
                    $doc->lead_paragraph = $imp_doc['lead_paragraph'];
                    $doc->multimedia = json_encode($imp_doc['multimedia']);
                    $doc->headline = json_encode($imp_doc['headline']);
                    $doc->keywords = json_encode($imp_doc['keywords']);
                    $doc->document_type = $imp_doc['document_type'];
                    $doc->section_name = $imp_doc['section_name'];
                    $doc->byline = json_encode($imp_doc['byline']);
                    $doc->type_of_material = $imp_doc['type_of_material'];
                    $doc->uri = $imp_doc['uri'];
           
                    $doc->save();

                };

                $this->info('Done inserting');

            }

            $curr_year += 10;
        }




        
        $this->info('All good!');

        return Command::SUCCESS;
    }
}
