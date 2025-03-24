<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Notifikasi Pembayaran</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #eee; padding-bottom: 20px; }
        .content { margin: 20px 0; }
        .footer { text-align: center; color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="{{ asset('assets/logo.png') }}" alt="Logo" width="120">
            <h2>Notifikasi Pembayaran #{{ $receipt->id }}</h2>
        </div>
        
        <div class="content">
            <p>Halo {{ $receipt->user->username }},</p>
            <p>Pembayaran untuk Invoice #{{ $receipt->invoice->id }} telah berhasil diproses:</p>
            
            <table>
                <tr>
                    <td><strong>Tanggal Pembayaran</strong></td>
                    <td>{{ \Carbon\Carbon::parse($receipt->tanggal_bayar)->format('d F Y') }}</td>
                </tr>
                <tr>
                    <td><strong>Jumlah Bayar</strong></td>
                    <td>Rp {{ number_format($receipt->jumlah_bayar, 0, ',', '.') }}</td>
                </tr>
                <tr>
                    <td><strong>Metode Pembayaran</strong></td>
                    <td>{{ $receipt->metode_pembayaran }}</td>
                </tr>
            </table>
        </div>

        <div class="footer">
            <p>{{ $setting->company_name ?? 'Perusahaan Anda' }}</p>
            <p>{{ $setting->company_address ?? 'Alamat Perusahaan' }}</p>
        </div>
    </div>
</body>
</html>