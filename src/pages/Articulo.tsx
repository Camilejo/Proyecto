import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Articulo = () => {
  const { id } = useParams<{ id: string }>()
  const articles = JSON.parse(localStorage.getItem("articles") || "[]")
  const article = articles[parseInt(id ?? "0", 10)]

  const [previousTags, setPreviousTags] = useState<string[]>([])

  useEffect(() => {
    if (article?.tags && article.tags.length > 0) {
      setPreviousTags(article.tags)
    }
  }, [article])

  return (
    <div
      className="container border shadow-xl mx-auto p-4 text-lg leading-relaxed"
      style={{ maxWidth: "1000px" }}
    >
      <div className="p-4">
        {(article?.tags && article.tags.length > 0
          ? article.tags
          : previousTags
        ).map((tag: string, index: number) => (
          <label
            key={index}
            className="inline-block m-0.5 bg-black text-white font-semibold py-1 px-2 rounded shadow-md hover:bg-gray-200 hover:text-black transition duration-300"
          >
            {tag}
          </label>
        ))}
      </div>
      <div
        className="contenido"
        dangerouslySetInnerHTML={{ __html: article?.rawContent }}
      ></div>
    </div>
  )
}

export default Articulo
