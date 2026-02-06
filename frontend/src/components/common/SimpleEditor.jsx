import { useRef, useEffect } from "react";

export default function SimpleEditor({
    value = "",
    onChange,
    placeholder = "¿Qué lleva la mudanza? Escríbelo o pega la lista del cliente.",
}) {
    const editorRef = useRef(null);
    const lastHtml = useRef(value);

    // SOLO sincroniza si el valor viene de FUERA
    useEffect(() => {
        if (
            editorRef.current &&
            value !== lastHtml.current &&
            document.activeElement !== editorRef.current
        ) {
            editorRef.current.innerHTML = value;
            lastHtml.current = value;
        }
    }, [value]);

    const handleInput = () => {
        const html = editorRef.current.innerHTML;
        lastHtml.current = html;
        onChange?.(html); // solo reporta, NO re-renderiza
    };

    return (
        <div className="simple-editor">
            {/* <div className="simple-editor__toolbar">
                <button type="button" onClick={() => document.execCommand("bold")}> B </button>
                <button type="button" onClick={() => document.execCommand("italic")}> I </button>
                <button type="button" onClick={() => document.execCommand("insertUnorderedList")}> • Lista </button>
                <button type="button" onClick={() => document.execCommand("insertOrderedList")}> 1. </button>
            </div> */}

            <div
                ref={editorRef}
                className="simple-editor__content"
                contentEditable
                suppressContentEditableWarning
                dir="ltr"
                data-placeholder={placeholder}
                onInput={handleInput}
            />
        </div>
    );
}