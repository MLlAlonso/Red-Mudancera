import { useRef, useEffect } from "react";

export default function SimpleEditor({
    value = "",
    onChange,
    placeholder = "¿Qué lleva la mudanza? Escríbelo o pega la lista del cliente.",
}) {
    const editorRef = useRef(null);
    const lastHtml = useRef(value);

    useEffect(() => {
        if (
            editorRef.current &&
            value !== lastHtml.current &&
            document.activeElement !== editorRef.current
        ) {
            editorRef.current.innerHTML = value || "<br>";
            lastHtml.current = value;
        }
    }, [value]);

    const handleInput = () => {
        const html = editorRef.current.innerHTML;
        lastHtml.current = html;
        onChange?.(html);
    };

    const handleFocus = () => {
        if (editorRef.current.innerHTML === "<br>") {
            editorRef.current.innerHTML = "";
        }
    };

    const handleClick = () => {
        editorRef.current?.focus();
    };

    return (
        <div className="simple-editor">
            <div
                ref={editorRef}
                className="simple-editor__content"
                contentEditable
                suppressContentEditableWarning
                dir="ltr"
                data-placeholder={placeholder}
                tabIndex={0}
                onInput={handleInput}
                onFocus={handleFocus}
                onClick={handleClick}
                style={{
                    minHeight: "120px",
                    outline: "none",
                }}
            />
        </div>
    );
}