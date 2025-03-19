import Popup from "./Popup";
import Button from "../Buttons";

export default function DetailPopup({ title, closePopup, data, fields }) {
  return (
    <Popup title={title} closePopup={closePopup}>
      {({ handleClose }) => (
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="border-b pb-2">
              <p className="text-gray-500 text-sm">{field.placeholder}</p>
              <p className="text-lg font-medium text-gray-800">
                {data[field.id] || "-"}
              </p>
            </div>
          ))}

          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleClose} 
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 transition px-4 py-2 rounded-lg"
            >
              Tutup
            </Button>
          </div>
        </div>
      )}
    </Popup>
  );
}
