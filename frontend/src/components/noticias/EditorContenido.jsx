import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const EditorContenido = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      className="bg-white rounded-md border-gray-300 shadow-sm"
    />
  );
};
