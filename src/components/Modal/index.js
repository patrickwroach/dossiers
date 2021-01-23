import React, { useEffect } from "react";
import { createPortal } from "react-dom";
const Portal = ({ children }) => {
    const modalRoot = document.getElementById("modal");
    const el = document.createElement("div");

    useEffect(() => {
        modalRoot.appendChild(el);
    });
    useEffect(() => {
        return () => modalRoot.removeChild(el);
    });
    return createPortal(children, el);
};
const Modal = ({ children, toggle, open }) => (
    <Portal>
        {open && (
            <div className="modal_wrapper">
                <div className="modal_card">
                    <button className="modal_close-button material material-black" onClick={toggle}>
                        X
                    </button>
                    {children}
                </div>
                <div className="modal_background" onClick={toggle} />
            </div>
        )}
    </Portal>
);
export default Modal; 