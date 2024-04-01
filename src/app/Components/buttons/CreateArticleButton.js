export default function CreateArticleButton({ onCreate }) {
  return (
    <button
      onClick={onCreate}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
    >
      Criar artigo
    </button>
  );
}
