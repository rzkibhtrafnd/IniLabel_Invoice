export default function Status({ children }) {
  return (
    <div
      className={children === '' ? '' : ''}
    >
      {children}
    </div>
  );
}