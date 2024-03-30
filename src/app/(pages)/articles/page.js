"use client";
import React, { useState, useEffect } from "react";
import ArticleCard from "../../Components/articleCard";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newArticleData, setNewArticleData] = useState({
    title: "",
    description: "",
    body: "",
  });

  const fetchAllArticles = async () => {
    try {
      const response = await fetch("../../api/articles");
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createNewArticle = async () => {
    try {
      const response = await fetch("../../api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticleData),
      });
      if (response.ok) {
        const newArticle = await response.json();
        setArticles([...articles, newArticle]);
        setShowForm(false);
        setNewArticleData({ title: "", description: "", body: "" });
      } else {
        console.error("Failed to create article");
      }
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleDelete = async (articleId) => {
    try {
      await fetch(`../api/articles/${articleId}`, {
        method: "DELETE",
      });
      setArticles(articles.filter((article) => article.id !== articleId));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Articles</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Criar artigo
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-100 p-4 rounded mb-8">
          <input
            type="text"
            placeholder="Title"
            className="block w-full border border-gray-300 rounded mb-2 p-2 text-black"
            value={newArticleData.title}
            onChange={(e) =>
              setNewArticleData({ ...newArticleData, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            className="text-black block w-full border border-gray-300 rounded mb-2 p-2"
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
            className="text-black block w-full border border-gray-300 rounded mb-2 p-2"
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
              onClick={closeForm}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
            >
              fechar
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
