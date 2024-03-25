export default function ArticleCard({ article }) {
  return (
    <>
      {/*<!-- Component: Basic card --> */}
      <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
        <div className="p-6">
          <div className="flex flex-col">
            <h3 className=" mb-4 text-xl font-medium text-slate-700">
              {article.title}
            </h3>
            <h6>{article.description}</h6>
          </div>
          <p>{article.body}.</p>
        </div>
      </div>
      {/*<!-- End Basic card --> */}
    </>
  );
}
