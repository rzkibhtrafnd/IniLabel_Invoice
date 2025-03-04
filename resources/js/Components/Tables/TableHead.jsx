export default function TableHead ({ children }) {
  return (
    <thead className="bg-primary/25">
      <tr>{children}</tr>
    </thead>
  );
}
