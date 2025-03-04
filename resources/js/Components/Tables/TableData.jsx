export default function TableData({ children, className }) {
  return (
    <td
      className={`px-4 py-6 text-center border-b border-[#ecf1f4] ${className ? className : ''}`}
    >
      {children}
    </td>
  );
}
