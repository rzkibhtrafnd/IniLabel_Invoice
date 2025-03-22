<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Receipt Email</title>
</head>
<body>
    <h1>Receipt #{{ $receipt->id }}</h1>
    <p>Halo {{ $receipt->invoice->customer->name }},</p>
    <p>Terima kasih telah melakukan pembayaran. Berikut kami lampirkan struk (Receipt) dalam bentuk PDF.</p>
    <p>Salam,</p>
    <p><strong>Tim {{ config('app.name') }}</strong></p>
</body>
</html>
