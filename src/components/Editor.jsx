import { forwardRef, useRef, useImperativeHandle } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const Editor = forwardRef(({ value, onChange }, ref) => {
  const quillRef = useRef(null);
  useImperativeHandle(ref, () => {
    getQuil: () => {
      return quillRef.current.getEditor();
    };
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
  ];

  return (
    <ReactQuill
      ref={quillRef}
      className="h-48"
      modules={modules}
      formats={formats}
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
});

export default Editor;
