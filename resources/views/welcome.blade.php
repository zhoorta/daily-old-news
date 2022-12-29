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
    <div class="flex items-center justify-center h-screen dark:bg-slate-800">

        <div class="container m-auto grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">

            @foreach($decades as $decade)
                <a href="/{{$decade}}">
                    <div class="bg-orange-100 font-bold rounded-lg border shadow-lg p-10">
                        {{$decade}}s
                    </div>
                </a>
            @endforeach

        </div>
    </div>
    
</body>
</html>