import React, {createContext, useState} from 'react';

interface ModalContextData {
  modal: {
    modalName: string,
    active: boolean,
    device: number
  };
  changeModal(dadosModal: {modalName: string, active: boolean, device: number}): void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export const ModalProvider: React.FC = ({ children }) => {
  const [modal, setModal] = useState({modalName: '', active: false, device: 0});

  async function changeModal(dadosModal: {modalName: string, active: boolean, device: number}) {
    setModal(dadosModal);
  }

  return (
    <ModalContext.Provider
      value={{
        modal,
        changeModal
      }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
