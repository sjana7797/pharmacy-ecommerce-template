import { useState } from "react";

export const useModal = () => {
  // local state
  const [isOpen, setIsOpen] = useState(false);

  // handlers
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const toggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  return {
    isModalOpen: isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};
