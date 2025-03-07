export default function Heading({ title, subTitle, children }) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
      <div className="flex justify-between">
        <p className="text-sm text-light-slate md:text-lg">{subTitle}</p>
        {children}
      </div>
    </div>
  );
}
