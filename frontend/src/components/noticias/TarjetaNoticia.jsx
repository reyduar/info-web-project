import { FaPencil, FaTrashCan } from "react-icons/fa6";

export const TarjetaNoticia = ({ noticia, onDelete }) => {
  const { id, title, category, content, publication_date, author } = noticia;
  const editOnClick = (item) => {};
  const deleteOnClick = (item) => onDelete(item);
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title},</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => editOnClick(noticia)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
          >
            <FaPencil />
          </button>
          <button
            onClick={() => deleteOnClick(id)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
          >
            <FaTrashCan />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-2">{category}</p>
      <p className="text-gray-600 mb-2">{content}</p>
      <div className="text-sm text-gray-500">
        <span>{author}</span> • <span>{publication_date}</span>
      </div>
    </div>
  );
};
