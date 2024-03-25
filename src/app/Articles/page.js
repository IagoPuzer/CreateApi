"use client";
import { useState, useEffect } from "react";
import ArticleCard from "../Components/articleCard";

export default function ArticlePage() {
  const [articles, setArticles] = useState([]);

  const fetchAllArticles = async () => {
    try {
      const response = await fetch("../api/articles");
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (articleId) => {
    setArticles(articles.filter((article) => article.id !== articleId));
    fetchAllArticles();
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);

  return (
    <div className="w-1/2 mx-auto flex justify-between">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
