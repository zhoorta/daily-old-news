<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Oranienbaum&display=swap" rel="stylesheet">

    @vite('resources/css/app.css')
    <title>Daily Old News</title>
</head>
<body>

    <input type="hidden" id="default_section" value="{{$default_section}}">
    <div class="flex items-center justify-center dark:bg-slate-800">

        <div class="container m-auto grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
            <div class="col-span-1 pt-10 pb-5 pl-0">


                <h5 class="mb-2 text-2xl font-bold tracking-tight text-orange-100">
                    <a type="button" class="py-2 px-3 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" href="/{{$decade - 10}}"><</a>
                    {{$date}}&nbsp;
                    <a class="py-2 px-3 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" href="/{{$decade + 10}}">></a>

                </h5>
            </div> 
            <div class="col-span-2 mt-10 pb-5 pl-0 text-right">
                @foreach($sections as $section)
                    <a href="#" onclick="openSection(this.dataset.ref);" data-ref="{{Str::slug($section)}}" class="text-sm text-orange-100 section-link">{{$section}}</a><span class="text-sm text-orange-100">{!! !$loop->last ? ' &nbsp;' : ''!!}</span>
                @endforeach
            </div>
            <div class="columns-3 col-span-3">
                @foreach($docs as $doc)
                    <div class="bg-orange-100 rounded-lg border shadow-lg p-10 mb-5 {{$doc->section_ref}} doc" >
                        <span class="text-sm text-gray-500 dark:text-gray-600">{{$doc->section_name}}</span>
            
                        <h5 class="mb-2 text-2xl font-bold tracking-tight">{{$doc->title}}</h5><br>
                        <p class="font-normal text-gray-300 dark:text-gray-800">{{$doc->abstract ? $doc->abstract : $doc->lead_paragraph}}</p>
                    </div>
                @endforeach
            </div>
            
        </div>
    </div>
    
</body>
<script type="text/javascript">
    
    function hideAll()
    {       
        const docs = Array.from(document.getElementsByClassName('doc'));

        docs.forEach(doc => {
            doc.style.display = 'none';
        }); 

        const sections = Array.from(document.getElementsByClassName('section-link'));

        sections.forEach(section => {
            section.classList.remove("font-bold");
        });
    }


    function openSection(section)
    {
        hideAll();

        const docs = Array.from(document.getElementsByClassName(section));

        docs.forEach(doc => {
            doc.style.display = 'block';
        });

        const el = document.querySelector('[data-ref="' + section + '"]');
        el.classList.add("font-bold");
    }

    hideAll();
    openSection(document.getElementById('default_section').value);



</script>
</html>