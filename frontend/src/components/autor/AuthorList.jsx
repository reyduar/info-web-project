import React, { useState } from "react";
import { useGetAuthorsQuery, useUpdateAuthorMutation } from "../../store/apis";

const AuthorList = () => {
  const { data: authors, isLoading, error, refetch } = useGetAuthorsQuery(); // Obtenemos refetch para actualizar la lista
  const [updateAuthor] = useUpdateAuthorMutation();
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [newName, setNewName] = useState("");

  const handleEdit = (author) => {
    setEditingAuthor(author);
    setNewName(author.full_name); // Inicializamos el input con el nombre actual del autor
  };

  const handleUpdate = async () => {
    try {
      await updateAuthor({
        authorId: editingAuthor.id,
        updatedAuthor: { full_name: newName },
      }).unwrap();
      setEditingAuthor(null); // Salimos del modo de edición
      refetch(); // Refresca la lista de autores manualmente
    } catch (err) {
      console.error("Error al actualizar el autor:", err);
    }
  };

  if (isLoading) return <p>Cargando autores...</p>;
  if (error)
    return <p>Ocurrió un error al obtener los autores: {error.message}</p>;

  return (
    <div>
      <ul>
        {authors?.map((author) => (
          <li key={author.id} className="flex justify-between items-center">
            {editingAuthor?.id === author.id ? (
              <>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="border px-2 py-1"
                />
                <button
                  onClick={handleUpdate}
                  className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
                >
                  Guardar
                </button>
              </>
            ) : (
              <>
                <span>{author.full_name}</span>
                <button
                  onClick={() => handleEdit(author)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  Editar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;
