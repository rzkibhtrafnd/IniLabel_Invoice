<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Invoice</title>
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
    <img src="{{ $imageSrc }}" alt="Logo">
    <table class="table-header">
      <tr>
        <td>
          <h2>PT INILABEL SEJAHTERA</h2>
          <table>
            <tr>
              <th>No Invoice</th>
              <td>: INV-0002</td>
            </tr>
            <tr>
              <th>Dicetak</th>
              <td>: 02 Jan 2023</td>
            </tr>
            <tr>
              <th>Dicetak</th>
              <td>: 02 Jan 2023</td>
            </tr>
            <tr>
              <th>Dicetak</th>
              <td>: 02 Jan 2023</td>
            </tr>
          </table>
        </td>
        <td>
          <h2>PT INILABEL SEJAHTERA</h2>
          <table>
            <tr>
              <th>Cabang</th>
              <td>: Surabaya</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>: inilabel@mail.com</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </header>

  <main>
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
        @foreach($invoice->details as $item)
          <tr>
            <td style="border-bottom: 1px solid #DFE4EA; font-size: 10px; text-align: start; padding: 10px; width: 100%;">{{ $item->product->name }}</td>
            <td style="border-bottom: 1px solid #DFE4EA; font-size: 10px; text-align: center; padding: 10px 20px;">{{ $item->kuantitas }}</td>
            <td style="border-bottom: 1px solid #DFE4EA; font-size: 10px; text-align: center; padding: 10px 20px;">{{ $item->harga }}</td>
            <td style="border-bottom: 1px solid #DFE4EA; font-size: 10px; text-align: center; padding: 10px 20px;">{{ $item->total_harga }}</td>
          </tr>
        @endforeach
      </tbody>
    </table>

    <table class="table-summary">
      <tr>
        <td style="width: 65%;"></td>
        <td style="width: 35%;">
          <div>
            <table>
              <tr>
                <th style="text-align: left;">Sub Total:</th>
                <td style="text-align: right;">Rp 10.000,00</td>
              </tr>
              <tr>
                <th style="text-align: left;">Potongan:</th>
                <td style="text-align: right;">Rp 10.000,00</td>
              </tr>
              <tr>
                <th style="text-align: left;">PPN 12%:</th>
                <td style="text-align: right;">Rp 5.000,00</td>
              </tr>
              <tr>
                <th style="text-align: left;">Biaya Pengiriman:</th>
                <td style="text-align: right;">Rp 5.000,00</td>
              </tr>
              <tr>
                <th style="text-align: left; font-size: 16px; padding-top: 21px;">Total:</th>
                <td style="text-align: right; font-size: 16px; font-weight: bold; padding-top: 21px;">Rp 6.000.000,00</td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
    </table>
  </main>

  <footer>
    <h2>PAYMENT INSTRUCTIONS</h2>
    <table>
      <tr>
        <td>
          <p>Lakukan Pembayaran Sebelum Batas Akhir Yang Telah ditentukan</p>
          <strong>Bank Bri</strong>
          <p>3444291029</p>
          <strong>Bank Mandiri</strong>
          <p>99839382929</p>
        </td>
        <td>
          <p>IniLabel – Penyedia Label Custom Berkualitas</p>
          <strong>Email</strong>
          <p>mail@inilabel.com</p>
          <strong>Alamat</strong>
          <p>0899485739</p>
          <p>Untuk Pertanyaan Lebih Lanjut Bisa Menghubungi @inilabel.co</p>
        </td>
      </tr>
    </table>
  </footer>
</body>
</html>
