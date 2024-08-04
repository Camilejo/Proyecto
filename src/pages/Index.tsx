import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { marked } from "marked"
import { GoogleAIService } from "../services/GoogleAIService"
import Spinner from "./components/spinner/Spinner"
import Editor from "./Editor"
import { extractTitleContent } from "../utils"

const Index = () => {
  const [inputText, setInputText] = useState("")
  const [storedTags, setStoredTags] = useState([])
  const [AiResponseData, setAiResponseData] = useState({
    percentageData: "",
    articleResponse: "",
    error: {
      isError: false,
      message: "",
    },
  })

  const [inputTags, setInputTags] = useState({
    tags: [],
    error: {
      isError: false,
      message: "",
    },
    isLoading: false,
  })

  useEffect(() => {
    if (!inputTags.isLoading && inputTags.tags.length > 0) {
      setStoredTags(inputTags.tags)
    }
  }, [inputTags])

  const [articleCreationData, setArticleCreationData] = useState({
    title: "",
    content: "",
    rawContent: "",
  })
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    setInputTags({
      tags: [],
      error: {
        isError: false,
        message: "",
      },
      isLoading: false,
    })
    try {
      const contentSimilarity = await GoogleAIService.checkContent(inputText)
      if (contentSimilarity >= 60) {
        const generatedContent = await GoogleAIService.generateContent(
          inputText
        )

        setInputTags({
          ...inputTags,
          isLoading: true,
        })

        const tags = await GoogleAIService.generateTags(generatedContent)

        setInputTags({
          tags,
          error: {
            isError: false,
            message: "",
          },
          isLoading: false,
        })

        console.log(tags)

        const markedContent = await marked(generatedContent)

        setAiResponseData({
          ...AiResponseData,
          percentageData: `Contenido suficientemente relacionado con Colombia (${contentSimilarity}%)`,
          articleResponse: markedContent,
          error: {
            isError: false,
            message: "",
          },
        })

        const extractedContent = extractTitleContent(markedContent, true)
        setArticleCreationData({
          title: extractedContent.title,
          content: extractedContent.content,
          rawContent: markedContent,
        })
      } else {
        setAiResponseData({
          ...AiResponseData,
          percentageData: `El contenido no esta muy relacionado con Colombia (${contentSimilarity}%)`,
        })
      }
    } catch (error) {
      setAiResponseData({
        ...AiResponseData,
        percentageData: "Error Interno. Por favor intente de nuevo",
        error: {
          isError: true,
          message: "Error interno.",
        },
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateArticle = () => {
    const articles = JSON.parse(localStorage.getItem("articles") || "[]")
    articles.push({ ...articleCreationData, tags: inputTags.tags })
    localStorage.setItem("articles", JSON.stringify(articles))

    window.alert("Artículo creado exitosamente")
    navigate("/articulos")
  }

  return (
    <div className="min-h-screen flex flex-col items-center  p-4">
      <div className="flex flex-row w-full max-w-6xl space-x-4">
        <div className="flex flex-col w-1/2 p-4 h-[600px] overflow-y-auto">
          <h1 className="text-5xl font-bold mb-6 text-center text-blue-500">
            MADE IN COLOMBIA
          </h1>
          <p className="mb-5">
            Atrévete a generar artículos completamente gratis utilizando
            inteligencia artificial.
          </p>
          <div className="p-4 bg-white border border-gray-200 rounded">
            <input
              type="text"
              id="inputText"
              placeholder="Escribe el tema de Colombia que desees..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="p-2 border border-gray-300 rounded mb-4 w-full"
            />
            <div className="p-4 bg-gray-100 border border-gray-300 rounded">
              {AiResponseData.percentageData
                ? AiResponseData.percentageData
                : "Aún no has generado un artículo..."}
            </div>
          </div>

          <button
            id="generateButton"
            onClick={handleGenerate}
            className={`bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition-colors w-fit self-center my-4 ${
              loading || inputText.trim() === ""
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={loading || inputText.trim() === ""}
          >
            Generar
          </button>
        </div>

        <div className="flex flex-col w-1/2 p-4 overflow-y-auto">
          <h1 className="text-5xl font-bold mb-6 text-center text-blue-500">
            EDITOR
          </h1>
          <p className="mb-5">
            Aquí podrás personalizar el artículo a tu gusto, haz volar tu
            imaginación generando el mejor artículo.
          </p>
          <div className="flex flex-col mb-5">
            <div className="border-gray-200 rounded relative mb-5 overflow-y-auto h-full">
              {loading ? (
                <div className="flex mb-7 justify-center items-center ">
                  <Spinner />
                </div>
              ) : (
                <div className="editor">
                  <Editor
                    initialContent={AiResponseData.articleResponse}
                    setArticleCreationData={setArticleCreationData}
                  />
                </div>
              )}
            </div>
            <div className="p-5 bg-gray-100 border border-gray-300 rounded">
              {inputTags.isLoading
                ? "Generando nuevas etiquetas..."
                : storedTags.length > 0
                ? storedTags.map((tag, index) => (
                    <label
                      key={index}
                      className="inline-block m-0.5 bg-black text-white font-semibold py-1 px-2 rounded shadow-md hover:bg-gray-200 hover:text-black transition duration-300"
                    >
                      {tag}
                    </label>
                  ))
                : "Genere un articulo para ver las etiquetas"}
            </div>
            {!loading && AiResponseData.articleResponse.trim() !== "" && (
              <button
                id="createButton"
                onClick={handleCreateArticle}
                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition-colors w-fit self-center my-4"
              >
                Crear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
