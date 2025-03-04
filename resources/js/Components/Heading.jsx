export default function Heading({ title, subTitle }) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-light-slate text-lg">{subTitle}</p>
    </div>
  );
}
