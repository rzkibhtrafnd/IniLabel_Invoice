export default function Input({ name, type, value, onChange, placeholder }) {
  return (
    <input
      id={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full bg-white mt-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-[#003465] focus:ring-1 focus:ring-[#003465]"
      placeholder={placeholder}
    />
  );
}