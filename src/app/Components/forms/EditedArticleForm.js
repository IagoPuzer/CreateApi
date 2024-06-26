export default function EditedArticleForm({
  onClose,
  onSave,
  editedArticle,
  setEditedArticle,
}) {
  const handleSave = () => {
    onSave(editedArticle);
    onClose();
    window.location.reload();
  };

  return (
    <form className="bg-white p-8 rounded-md">
      <h2 className="text-xl font-semibold mb-4 text-black">Editar Artigo</h2>
      <input
        type="text"
        value={editedArticle.title}
        onChange={(e) =>
          setEditedArticle({ ...editedArticle, title: e.target.value })
        }
        className="w-full border text-black border-gray-300 rounded-md p-2 mb-4 bg-white focus:outline-none"
      />
      <input
        type="text"
        value={editedArticle.description}
        onChange={(e) =>
          setEditedArticle({
            ...editedArticle,
            description: e.target.value,
          })
        }
        className="w-full border text-black border-gray-300 rounded-md p-2 mb-4 bg-white focus:outline-none"
      />
      <textarea
        value={editedArticle.body}
        onChange={(e) =>
          setEditedArticle({ ...editedArticle, body: e.target.value })
        }
        className="w-full border text-black border-gray-300 rounded-md p-2 mb-4 bg-white focus:outline-none"
      />
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600"
        >
          Salvar
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
