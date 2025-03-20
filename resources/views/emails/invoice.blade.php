<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Invoice #{{ $invoice->id }}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        table {
            border-spacing: 0;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        .container {
            width: 100%;
            max-width: 600px;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .btn {
            display: inline-block;
            background: #007bff;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 20px;
            font-size: 16px;
            border-radius: 6px;
            font-weight: bold;
            text-align: center;
        }
        @media screen and (max-width: 600px) {
            .container {
                padding: 15px;
            }
            .btn {
                display: block;
                width: 100%;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table role="presentation" class="container" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <td align="center">
                            <img src="{{ asset('assets/logo.png') }}" alt="Inilabel Logo" width="120">
                            <h2 style="color: #333; font-family: Arial, sans-serif; font-size: 24px;">Invoice #{{ $invoice->id }}</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style="font-family: Arial, sans-serif; color: #555; font-size: 16px;">Halo <strong>{{ $invoice->customer->name }}</strong>,</p>
                            <p style="font-family: Arial, sans-serif; color: #555; font-size: 16px;">Terima kasih telah bertransaksi dengan <strong>Inilabel</strong>. Berikut detail invoice Anda:</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="5" border="0" style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
                                <tr><td><strong>Nomor Invoice:</strong></td><td>INV-{{ $invoice->id }}</td></tr>
                                <tr><td><strong>Tanggal:</strong></td><td>{{ \Carbon\Carbon::parse($invoice->created_at)->format('d F Y') }}</td></tr>
                                <tr><td><strong>Jumlah Tagihan:</strong></td><td><strong style="color: #007bff;">Rp {{ number_format($invoice->total_amount, 0, ',', '.') }}</strong></td></tr>
                                <tr><td><strong>Jatuh Tempo:</strong></td><td>{{ \Carbon\Carbon::parse($invoice->due_date)->format('d F Y') }}</td></tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <a href="#" class="btn">Bayar Sekarang</a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <p style="font-family: Arial, sans-serif; font-size: 14px; background: #f8f9fa; padding: 15px; border-radius: 8px;">
                                Setelah pembayaran, silakan konfirmasi ke: <br>
                                📧 <a href="mailto:support@inilabel.com" style="color: #007bff;">support@inilabel.com</a> <br>
                                📞 0812-3456-7890
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="font-family: Arial, sans-serif; font-size: 14px; color: #888; padding-top: 10px; border-top: 1px solid #ddd;">
                            <p>Salam, <br><strong>Inilabel Customer Support</strong></p>
                            <p>📞 0812-3456-7890 | 📧 <a href="mailto:support@inilabel.com" style="color: #007bff;">support@inilabel.com</a> | 🌐 <a href="https://www.inilabel.com" style="color: #007bff;">www.inilabel.com</a></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
