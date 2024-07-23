<?php
	$path = "/home/jayson/sensors/data.json";
	$file = fopen($path, "r") or die ("Error getting data.");

	$data = fread($file, filesize($path));
	fclose($file);

	$obj = json_decode($data);
?>
<!doctype html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <title>Sensor Data</title>
    <style>
		
    </style>
</head>
<body class="bg-dark">
	<table class="table table-dark">
		<?php foreach ($obj as $key => $value): ?>
			<tr>
				<td><?php echo $key; ?></td>
				<td><?php echo $value; ?></td>
			</tr>
		<?php endforeach; ?>
	</table>
	<script src="js/jquery-3.6.0.min.js"></script>
	<script src="js/bootstrap.bundle.min.js"></script>
</body>