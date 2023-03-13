import { useState } from "react";

type useModal = [boolean, () => void];

function useModal(isDefaultOption = false): useModal {
  const [isOpen, setIsOpen] = useState(isDefaultOption);

  const toggle: () => void = () => {
    setIsOpen(!isOpen);
  };

  return [
    isOpen,
    toggle
  ]
}

export default useModal