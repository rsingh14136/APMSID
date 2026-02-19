import React, { createContext, useContext, useState } from "react";
import SuccessModal from "./SuccessModal";

const SuccessModalContext = createContext();

export const SuccessModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: ""
  });

  const showSuccess = (message, title = "Success!") => {
    setModal({
      open: true,
      title,
      message
    });
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, open: false }));
  };

  return (
    <SuccessModalContext.Provider value={{ showSuccess }}>
      {children}

      {/* GLOBAL MODAL */}
      <SuccessModal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
      />
    </SuccessModalContext.Provider>
  );
};

export const useSuccessModalContext = () =>
  useContext(SuccessModalContext);
