import { useNavigate } from "react-router-dom"
import { removeHTMLTags } from "../utils"
import { useEffect } from "react"

const Articulos = () => {
  const articles = JSON.parse(localStorage.getItem("articles") || "[]")
  const navigate = useNavigate()

  const handleCardClick = (index: number) => {
    navigate(`/articulo/${index}`)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <h1 className="text-5xl font-bold mb-6 text-center text-blue-500">
        ARTÍCULOS
      </h1>
      <hr />
      <div className="min-h-screen flex flex-col items-center p-4">
        <div className="grid grid-cols-3 gap-4 w-full max-w-6xl">
          {articles.map(
            (article: { title: string; content: string }, index: number) => (
              <div
                key={index}
                className="cards p-4 bg-white border border-gray-200 rounded cursor-pointer"
                onClick={() => handleCardClick(index)}
              >
                <h2 className="text-xl font-bold mb-2">
                  {removeHTMLTags(article.title)}
                </h2>
                <p className="text-gray-700">
                  {`${removeHTMLTags(article.content).slice(2, 150)}...`}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  )
}

export default Articulos
