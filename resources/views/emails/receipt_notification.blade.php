<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Notifikasi Pembayaran</title>
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
        .message-box {
            background: #e2f0fb;
            color: #004085;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #b8daff;
            font-family: Arial, sans-serif;
            font-size: 16px;
            margin: 20px 0;
            text-align: center;
        }
        @media screen and (max-width: 600px) {
            .container {
                padding: 15px;
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
                            <img src="{{ asset('assets/logo.png') }}" alt="Company Logo" width="120">
                            <h2 style="color: #333; font-family: Arial, sans-serif; font-size: 24px;">Notifikasi Pembayaran</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style="font-family: Arial, sans-serif; color: #555; font-size: 16px;">Halo <strong>{{ $receipt->user->username }}</strong>,</p>
                            <p style="font-family: Arial, sans-serif; color: #555; font-size: 16px;">
                                Pembayaran untuk Invoice <strong>#{{ $receipt->invoice->id }}</strong> telah berhasil diproses.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="5" border="0" style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
                                <tr>
                                    <td><strong>ID Pembayaran:</strong></td>
                                    <td>RCP-00{{ $receipt->id }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tanggal Pembayaran:</strong></td>
                                    <td>{{ \Carbon\Carbon::parse($receipt->tanggal_bayar)->format('d F Y') }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Jumlah Bayar:</strong></td>
                                    <td><strong style="color: #007bff;">Rp {{ number_format($receipt->jumlah_bayar, 0, ',', '.') }}</strong></td>
                                </tr>
                                <tr>
                                    <td><strong>Metode Pembayaran:</strong></td>
                                    <td>{{ $receipt->metode_pembayaran }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Status Pembayaran:</strong></td>
                                    <td>{{ $receipt->status }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Customer:</strong></td>
                                    <td>{{ $receipt->invoice->customer->name }}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="message-box">
                                Silakan cek lampiran PDF untuk detail receipt.
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="font-family: Arial, sans-serif; font-size: 14px; color: #888; padding-top: 10px; border-top: 1px solid #ddd;">
                            <p>Salam,<br><strong>{{ $setting->company_name ?? 'Perusahaan Anda' }} Customer Support</strong></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
