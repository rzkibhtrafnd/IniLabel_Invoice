export default function formatToRupiah(price) {
  return new Intl.NumberFormat('id', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
}
