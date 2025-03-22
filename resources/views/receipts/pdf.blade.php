<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Receipt</title>
  <style>
    * { margin: 0; padding: 0; color: #0A2540; font-family: 'Work Sans', sans-serif; }  
    header, main, footer { padding: 28px; }  
    header img { width: 143px; margin-bottom: 8px; }  
    header h2 { font-size: 16px; font-weight: bold; margin-bottom: 5px; }  
    table { width: 100%; }
    th, td { text-align: left; width: auto; }
    .table-header table { width: auto; }
    .table-header td { vertical-align: top; text-transform: uppercase; }
    .table-header td th { font-weight: normal; }
    .table-header td th, .table-header td td { text-transform: uppercase; font-size: 12px; }
    .table-items { border-collapse: collapse; border: 1px solid #DFE4EA; }
    .table-summary div { margin-top: 30px; background-color: #F2F2F2; border-radius: 8px; padding: 20px 16px; font-size: 10px; }
    footer { font-size: 10px; background-color: #F9F9FA; }
    footer h2 { color: #635BFF; }
  </style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>
<body>
  <header>
    @if($imageSrc)
      <img src="{{ $imageSrc }}" alt="Logo">
    @endif
    <table class="table-header">
      <tr>
        <td>
          <h2>{{ $setting->company_name ?? 'Company Name' }}</h2>
          <table>
            <tr>
              <th>No Receipt</th>
              <td>: RCP-00{{ $receipt->id }}</td>
            </tr>
            <tr>
              <th>Dicetak</th>
              <td>: {{ date('d M Y', strtotime($receipt->created_at)) }}</td>
            </tr>
            <tr>
              <th>No Invoice</th>
              <td>: INV-00{{ $receipt->invoice->id }}</td>
            </tr>
            <tr>
              <th>Dibuat oleh</th>
              <td>: {{ $receipt->user->username }}</td>
            </tr>
          </table>
        </td>
        <td>
          <h2>STRUK PEMBAYARAN</h2>
          <table>
            <tr>
              <th>Nama Customer</th>
              <td>: {{ $receipt->invoice->customer->name }}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>: {{ $receipt->invoice->customer->email }}</td>
            </tr>
            <tr>
              <th>Nomor Telepon</th>
              <td>: {{ $receipt->invoice->customer->phone }}</td>
            </tr>
            <tr>
              <th>Alamat</th>
              <td>: {{ $receipt->invoice->customer->address }}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </header>

  <main>
    <!-- Info Pembayaran -->
    <table style="border-collapse: collapse; border: 1px solid #DFE4EA; width: 100%;">
      <thead>
        <tr>
          <th style="border-bottom: 1px solid #DFE4EA; font-size: 10px; text-align: center; padding: 10px;">Metode Pembayaran</th>
          <th style="border-bottom: 1px solid #DFE4EA; font-size: 10px; text-align: center; padding: 10px;">Status</th>
          <th style="border-bottom: 1px solid #DFE4EA; font-size: 10px; text-align: center; padding: 10px;">Jumlah Bayar</th>
          <th style="border-bottom: 1px solid #DFE4EA; font-size: 10px; text-align: center; padding: 10px;">Tanggal Bayar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border-bottom: 1px solid #DFE4EA; text-align: center; padding: 10px;">{{ $receipt->metode_pembayaran }}</td>
          <td style="border-bottom: 1px solid #DFE4EA; text-align: center; padding: 10px;">{{ $receipt->status }}</td>
          <td style="border-bottom: 1px solid #DFE4EA; text-align: center; padding: 10px;">Rp {{ number_format($receipt->jumlah_bayar, 0, ',', '.') }}</td>
          <td style="border-bottom: 1px solid #DFE4EA; text-align: center; padding: 10px;">{{ date('d M Y', strtotime($receipt->tanggal_bayar)) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- KODE TAMBAHAN UNTUK ITEM INVOICE -->
    <br>
    <table style="border-collapse: collapse; border: 1px solid #DFE4EA; width: 100%;">
      <thead>
        <tr>
          <th style="border-bottom: 1px solid #DFE4EA; font-size: 10px; text-align: start; padding: 10px; width: 100%;">Item</th>
          <th style="border-bottom: 1px solid #DFE4EA; font-size: 10px; text-align: center; padding: 10px 20px;">Jumlah</th>
          <th style="border-bottom: 1px solid #DFE4EA; font-size: 10px; text-align: center; padding: 10px 20px;">Harga</th>
          <th style="border-bottom: 1px solid #DFE4EA; font-size: 10px; text-align: center; padding: 10px 20px;">Total</th>
        </tr>
      </thead>
      <tbody>
        @foreach($receipt->invoice->details as $item)
          <tr>
            <td style="border-bottom: 1px solid #DFE4EA; font-size: 10px; text-align: start; padding: 10px; width: 100%;">
              {{ $item->product->name }}
            </td>
            <td style="border-bottom: 1px solid #DFE4EA; font-size: 10px; text-align: center; padding: 10px 20px;">
              {{ $item->kuantitas }}
            </td>
            <td style="border-bottom: 1px solid #DFE4EA; font-size: 10px; text-align: center; padding: 10px 20px;">
              {{ $item->harga }}
            </td>
            <td style="border-bottom: 1px solid #DFE4EA; font-size: 10px; text-align: center; padding: 10px 20px;">
              {{ $item->total_harga }}
            </td>
          </tr>
        @endforeach
      </tbody>
    </table>

    <!-- RINGKASAN (SUBTOTAL, DISKON, DST) DARI INVOICE -->
    <table class="table-summary">
      <tr>
        <td style="width: 65%;"></td>
        <td style="width: 35%;">
          <div>
            <table>
              <tr>
                <th style="text-align: left;">Sub Total:</th>
                <td style="text-align: right;">Rp {{ $receipt->invoice->total_harga }}</td>
              </tr>
              <tr>
                <th style="text-align: left;">Diskon/Promo:</th>
                <td style="text-align: right;">Rp {{ $receipt->invoice->diskon }}</td>
              </tr>
              <tr>
                <th style="text-align: left;">Ongkos Kirim:</th>
                <td style="text-align: right;">Rp {{ $receipt->invoice->ongkir }}</td>
              </tr>
              <tr>
                <th style="text-align: left;">Pajak/Tax:</th>
                <td style="text-align: right;">Rp {{ $receipt->invoice->tax }}</td>
              </tr>
              <tr>
                <th style="text-align: left; font-size: 16px; padding-top: 21px;">Total Bayar:</th>
                <td style="text-align: right; font-size: 16px; font-weight: bold; padding-top: 21px;">
                  Rp {{ $receipt->invoice->total_bayar }}
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
    </table>
  </main>

  <footer>
    <h2>RECEIPT INSTRUCTIONS</h2>
    <table>
      <tr>
        <td>
            <li>Receipt ini adalah bukti pembayaran, bukan invoice atau tagihan.</li>
            <li>Komplain hanya diterima dalam 2x24 jam setelah barang diterima.</li>
            <li>Kesalahan input data pemesan bukan tanggung jawab IniLabel.</li>
            <li>Pembayaran tidak dapat dibatalkan atau direfund, kecuali kesalahan produksi.</li>
        </td>
        <td>
          <p>{{ $setting->company_name }} – {{ $setting->slogan }}</p>
          <strong>Email</strong>
          <p>{{ $receipt->user->email }}</p>
          <strong>Alamat</strong>
          <p>{{ $receipt->user->alamat }}</p>
          <p>Untuk Pertanyaan Lebih Lanjut Bisa Menghubungi {{ $receipt->user->notelepon }}</p>
        </td>
      </tr>
    </table>
  </footer>
</body>
</html>
