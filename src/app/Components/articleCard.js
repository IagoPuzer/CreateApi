"use client";
import { useState } from "react";
import EditedCardModal from "./Modals/EditedCardModal";

export default function ArticleCard({ article, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [editedArticle, setEditedArticle] = useState({
    title: article.title,
    description: article.description,
    body: article.body,
    published: article.published,
  });

  const handleDelete = async () => {
    try {
      await onDelete(article.id); // Chama a função de exclusão diretamente com o ID do artigo
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveEdit = async (updatedArticle) => {
    try {
      const response = await fetch(`../api/articles/${article.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedArticle),
      });
      if (response.ok) {
        setEditedArticle(updatedArticle);
        setShowModal(false);
      } else {
        console.error("Failed to update article");
      }
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  const handlePublish = async () => {
    try {
      const updatedArticle = {
        ...editedArticle,
        published: !editedArticle.published,
      };

      await handleSaveEdit(updatedArticle);
      window.location.reload();
    } catch (error) {
      console.error("Error publishing article:", error);
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
        <div className="p-6">
          <div className="flex flex-col">
            <h3 className=" mb-4 text-xl font-medium text-slate-700">
              {article.title}
            </h3>
            <h6>{article.description}</h6>
          </div>
          <p className="truncate">{article.body}</p>
          <div className="flex justify-end gap-4 mt-6">
            <button
              className="bg-red-200 p-2 rounded-md text-black"
              onClick={handleDelete}
            >
              Deletar post
            </button>
            <button
              className="bg-sky-100 p-2 rounded-md text-black"
              onClick={handleEdit}
            >
              Editar post
            </button>
            <button
              className="bg-green-200 p-2 rounded-md text-black"
              onClick={handlePublish}
            >
              {article.published ? "despublicar" : "publicar"}
            </button>
          </div>
        </div>
      </div>
      <EditedCardModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveEdit}
        editedArticle={editedArticle}
        setEditedArticle={setEditedArticle}
      />
    </>
  );
}
