<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('docs', function (Blueprint $table) {
            $table->id();
            $table->date('pub_date');
            $table->string('source')->nullable();
            $table->text('abstract')->nullable();
            $table->string('web_url')->nullable();
            $table->string('snippet')->nullable();
            $table->text('lead_paragraph')->nullable();
            $table->json('multimedia')->nullable();
            $table->json('headline')->nullable();
            $table->json('keywords')->nullable();
            $table->string('document_type')->nullable();
            $table->string('section_name')->nullable();
            $table->json('byline')->nullable();
            $table->string('type_of_material')->nullable();
            $table->string('uri')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('docs');
    }
};
