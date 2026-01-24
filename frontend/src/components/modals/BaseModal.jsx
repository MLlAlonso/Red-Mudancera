"use client";

import { useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";

export default function BaseModal({ onClose, children }) {
  const modalRef = useRef(null);

  useClickOutside(modalRef, onClose);

  return (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        {children}
      </div>
    </div>
  );
}
