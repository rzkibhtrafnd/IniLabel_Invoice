<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Invoice #{{ $invoice->id }}</title>
</head>
<body>
    <p>Halo {{ $invoice->customer->name }},</p>
    <p>Berikut terlampir invoice Anda.</p>
    <p>Terima kasih atas kepercayaan Anda.</p>
</body>
</html>
