import { useState } from "react";

export default function CreateArticleForm({ onSubmit, onClose }) {
  const [newArticleData, setNewArticleData] = useState({
    title: "",
    description: "",
    body: "",
  });

  const createNewArticle = () => {
    onSubmit(newArticleData);
    setNewArticleData({ title: "", description: "", body: "" });
  };

  return (
    <form className="bg-gray-100 p-4 rounded mb-8">
      <input
        type="text"
        placeholder="Title"
        className="block w-full border border-gray-300 rounded mb-2 p-2 text-black bg-white focus:outline-none"
        value={newArticleData.title}
        onChange={(e) =>
          setNewArticleData({ ...newArticleData, title: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Description"
        className="text-black block w-full border border-gray-300 rounded mb-2 p-2 bg-white focus:outline-none"
        value={newArticleData.description}
        onChange={(e) =>
          setNewArticleData({
            ...newArticleData,
            description: e.target.value,
          })
        }
      />
      <textarea
        placeholder="Body"
        className="text-black block w-full border border-gray-300 rounded mb-2 p-2 bg-white focus:outline-none"
        value={newArticleData.body}
        onChange={(e) =>
          setNewArticleData({ ...newArticleData, body: e.target.value })
        }
      />
      <div className="flex gap-4">
        <button
          onClick={createNewArticle}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Criar
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
        >
          Fechar
        </button>
      </div>
    </form>
  );
}
