<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Receipt #{{ $receipt->id }}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      background-color: #ffffff;
      margin: 20px auto;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
    }
    .header img {
      max-width: 120px;
    }
    .header h2 {
      font-size: 24px;
      color: #333;
      margin: 10px 0;
    }
    .content {
      font-size: 16px;
      color: #555;
      margin-top: 20px;
      line-height: 1.5;
    }
    .message-box {
      background: #e9f7ef;
      color: #155724;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #c3e6cb;
      margin: 20px 0;
      text-align: center;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #888;
      margin-top: 20px;
      border-top: 1px solid #ddd;
      padding-top: 10px;
    }
    a {
      color: #007bff;
      text-decoration: none;
    }
    @media screen and (max-width: 600px) {
      .container {
        margin: 10px;
        padding: 15px;
      }
    }
  </style>
</head>
<body>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="20" border="0" style="background-color: #f4f4f4;">
    <tr>
      <td align="center">
        <div class="container">
          <div class="header">
            @if(isset($setting->logo))
              <img src="{{ $imageSrc ?? asset('storage/'.$setting->logo) }}" alt="{{ $setting->company_name }} Logo">
            @else
              <img src="{{ asset('assets/logo.png') }}" alt="Default Logo">
            @endif
            <h2>Receipt RCP-00{{ $receipt->id }}</h2>
          </div>
          <div class="content">
            <p>Halo <strong>{{ $receipt->invoice->customer->name }}</strong>,</p>
            <p>Kami telah menerima pembayaran Anda. Terima kasih atas kepercayaan yang telah Anda berikan kepada kami.</p>
          </div>
          <div class="message-box">
            <p>Jumlah Pembayaran: <strong>Rp {{ number_format($receipt->jumlah_bayar, 0, ',', '.') }}</strong></p>
            <p>Status Pembayaran: <strong>{{ $receipt->status }}</strong></p>
            <p>Tanggal Pembayaran: <strong>{{ date('d F Y', strtotime($receipt->tanggal_bayar)) }}</strong></p>
          </div>
          <div class="content">
            <p>Kami lampirkan receipt (struk pembayaran) dalam format PDF sebagai bukti transaksi Anda.</p>
            <p>Jika ada pertanyaan atau informasi lebih lanjut, jangan ragu untuk menghubungi kami di kontak dibawah ini:</p>
            <p>☎️ {{ $receipt->user->notelepon }} | 📧 {{ $receipt->user->email }}</p>
          </div>
          <div class="footer">
            <p>Salam, <br><strong>{{ $setting->company_name ?? 'Nama Perusahaan' }} Customer Support</strong></p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
