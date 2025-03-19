import { useState } from "react";

export default function usePopup() {
  const [isOpen, setIsOpen] = useState(false);

  function openPopup() {
    setIsOpen(true);
  }

  function closePopup() {
    setIsOpen(false);
  }

  return [ isOpen, openPopup, closePopup ];
}
