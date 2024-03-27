"use client";
import { useState } from "react";
import EditedCardModal from "./Modals/EditedCardModal";

export default function ArticleCard({ article, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [editedArticle, setEditedArticle] = useState({
    title: article.title,
    description: article.description,
    body: article.body,
  });

  const handleDelete = async () => {
    try {
      const response = await fetch(`../api/articles/${article.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onDelete(article.id);
      } else {
        console.error("Failed to delete article");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleEdit = () => {
    setShowModal(true);
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
      } else {
        console.error("Failed to update article");
      }
    } catch (error) {
      console.error("Error updating article:", error);
    }
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
          <p>{article.body}</p>
          <button
            className="bg-red-200 p-2 rounded-md text-black mr-2"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="bg-red-200 p-2 rounded-md text-black"
            onClick={handleEdit}
          >
            Editar
          </button>
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
