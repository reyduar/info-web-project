import { FaPencil, FaTrashCan } from "react-icons/fa6";

export const TarjetaNoticia = ({ noticia, onDelete }) => {
  const { id, title, category_name, content, publication_date, author_name } =
    noticia;
  const editOnClick = (item) => {};
  const deleteOnClick = (item) => onDelete(item);
  const formatterDate = new Date(publication_date).toLocaleString("en-UK");
  const publicationDate = formatterDate.split(",")[0];
  const authorName = author_name.split("@")[0];

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-large font-medium text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-500 mb-2">{category_name}</p>
      <p
        className="text-foreground/90 mt-2 text-xs"
        dangerouslySetInnerHTML={{ __html: truncateText(content, 150) }}
      ></p>
      <div className="text-sm text-gray-500">
        <span>By {authorName}</span>
        <p>{publicationDate}</p>
      </div>
      <div className="flex justify-between items-center space-x-2">
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
  );
};
