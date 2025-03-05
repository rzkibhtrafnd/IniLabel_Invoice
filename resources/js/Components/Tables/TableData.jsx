export default function TableData({ children, className }) {
  return (
    <td
      className={`p-4 text-sm text-center border-b text-[#171725] border-[#ecf1f4] ${className ? className : ''}`}
    >
      {children}
    </td>
  );
}
