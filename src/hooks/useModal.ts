import { useState } from "react";

type ModalProps = [boolean, () => void];

export default function useModal(
  isDefaultOption = false
): ModalProps {
  const [isOpen, setIsOpen] = useState(isDefaultOption);

  const toggle: () => void = () => {
    setIsOpen(!isOpen);
  };

  return [
    isOpen,
    toggle
  ]
}