import Button from "../Buttons";
import Popup from "./Popup";

export default function FormPopup({ title, closePopup, handleSubmit, fields, data, handleChange }) {
  return (
    <Popup title={title} closePopup={closePopup}>
      {({ handleClose }) => (
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.id} className="mb-3">
              {field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  autoComplete="off"
                  value={data[field.id] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required={field.required}
                />
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete || "off"}
                  value={data[field.id] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required={field.required}
                />
              )}
            </div>
          ))}

          <div className="flex gap-2">
            <Button type="submit" className="bg-[#4D4FED] text-white">
              Simpan
            </Button>
            <Button onClick={handleClose} className="bg-[#E0E0E0] text-[#4F4F4F]">
              Batal
            </Button>
          </div>
        </form>
      )}
    </Popup>
  );
}
