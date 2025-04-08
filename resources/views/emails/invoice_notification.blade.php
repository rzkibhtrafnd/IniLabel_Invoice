<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Notifikasi Invoice</title>
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
            background: #e9f7ef;
            color: #155724;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #c3e6cb;
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
                            <h2 style="color: #333; font-family: Arial, sans-serif; font-size: 24px;">Notifikasi Invoice</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style="font-family: Arial, sans-serif; color: #555; font-size: 16px;">Halo <strong>{{ $invoice->user->username }}</strong>,</p>
                            <p style="font-family: Arial, sans-serif; color: #555; font-size: 16px;">Invoice <strong>#{{ $invoice->id }}</strong> telah dikirim ke customer <strong>{{ $invoice->customer->name }}</strong>.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="5" border="0" style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
                                <tr>
                                    <td><strong>Nomor Invoice:</strong></td>
                                    <td>INV-00{{ $invoice->id }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tanggal Pembuatan:</strong></td>
                                    <td>{{ \Carbon\Carbon::parse($invoice->created_at)->format('d F Y') }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tanggal Jatuh Tempo:</strong></td>
                                    <td>{{ \Carbon\Carbon::parse($invoice->due_date)->format('d F Y') }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Status Invoice:</strong></td>
                                    <td>{{ $invoice->status }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Total Tagihan:</strong></td>
                                    <td><strong style="color: #007bff;">Rp {{ number_format($invoice->total_bayar, 0, ',', '.') }}</strong></td>
                                </tr>
                                <tr>
                                    <td><strong>Total Dibayar:</strong></td>
                                    <td><strong style="color: #007bff;">Rp {{ number_format($invoice->total_dibayar, 0, ',', '.') }}</strong></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <!-- Pesan pengganti tombol bayar -->
                            <div class="message-box">
                                Silakan cek lampiran PDF untuk detail invoice.
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="font-family: Arial, sans-serif; font-size: 14px; color: #888; padding-top: 10px; border-top: 1px solid #ddd;">
                            <p>Salam, <br><strong>{{ $setting->company_name ?? 'Perusahaan Anda' }} Customer Support</strong></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>