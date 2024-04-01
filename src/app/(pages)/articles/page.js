"use client";
import { useState, useEffect } from "react";
import ArticleCard from "../../Components/articleCard";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import LogoutButton from "../../Components/buttons/LogoutButton";
import CreateArticleForm from "@/app/Components/forms/CreateArticleForm";
import CreateArticleButton from "@/app/Components/buttons/CreateArticleButton";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [session, setSession] = useState(null);

  const fetchAllArticles = async () => {
    try {
      const response = await fetch("../../api/articles");
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createNewArticle = async (newArticleData) => {
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

  const router = useRouter();
  useEffect(() => {
    fetchAllArticles();
    async function checkSession() {
      const session = await getSession();
      if (!session) {
        router.push("/");
      } else {
        setSession(session);
      }
    }
    checkSession();
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Articles</h1>
        <div className="flex gap-6">
          <CreateArticleButton onCreate={() => setShowForm(true)} />
          <LogoutButton />
          {session && <span>{`Bem vindo ${session.user.name}`}</span>}
        </div>
      </div>

      {showForm && (
        <CreateArticleForm onSubmit={createNewArticle} onClose={closeForm} />
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
