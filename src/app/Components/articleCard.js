export default function ArticleCard({ article, onDelete }) {
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
            className="bg-red-200 p-2 rounded-md text-black"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
