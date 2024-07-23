<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="manifest" href="manifest.json">
    <link rel="stylesheet" href="lib/bootstrap.min.css">
    <title>Lap Calculator</title>

    <style>
        .btn-block { height: 120px; }
        body { 
            background-color: black;
            color: white;
        }
        .monofont { font-family: monospace; }
        .card { background-color: gray; }
        .text-muted { color: white !important; }
        #distance { font-size: 4.8em; }
        #laps { font-size: 9em; }
    </style>
</head>
<body>
    <form>
        <div class="form-group row">
            <div class="col-sm-10">
                <input type="text" class="form-control" id="lapdistance" placeholder="Lap Distance in Feet">
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-10">
                <input type="text" class="form-control" id="lapcount" placeholder="Lap Count">
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-10">
            <button type="button" class="btn btn-primary" id="calculate">Calculate</button>
            </div>
        </div>
    </form>
    <div id="distance"><span id="miles"></span> miles</div>

    <script src="lib/jquery-3.5.1.slim.min.js"></script>
    <script src="lib/bootstrap.bundle.min.js"></script>
    <script>
        let feetInMiles = 5280.0;

        document.getElementById("calculate").onclick = (evt) => {
            let lapcount = $("#lapcount").val();
            let lapdistance = $("#lapdistance").val();


            // 98.5
            let distance = (lapcount * lapdistance / feetInMiles).toFixed(2);
            $("#miles").text(distance);
        }  
    </script>
</body>


