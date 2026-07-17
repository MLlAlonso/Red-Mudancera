"use client";

import "@/styles/components/_floatingNoteButton.scss";

export default function FloatingNoteButton({ onClick }) {
    return (
        <button className="floating-note-button" onClick={onClick} type="button" >
            📝
        </button>
    );
}