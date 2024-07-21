import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
    isOpen: boolean;
    content: string;
    openModal: (content: string) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
    children: ReactNode;
}

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState('');

    const openModal = (content: string) => {
    setContent(content);
    setIsOpen(true);
};

const closeModal = () => {
    setIsOpen(false);
    setContent('');
};

return (
    <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
        {children}
    </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    
    if (!context) {
        throw new Error('ModalContext의 값이 존재하지 않습니다.');
    }
    return context;
}
