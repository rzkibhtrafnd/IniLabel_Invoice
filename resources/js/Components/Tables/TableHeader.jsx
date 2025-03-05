export default function TableHeader({ children, colSpan = 1 }) {
  return (
    <th className="py-2 text-sm px-4 text-center text-[#171725] font-normal" colSpan={colSpan}>
      {children}
    </th>
  );
}
