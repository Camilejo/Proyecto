// src/context/ArticuloContext.tsx
import { createContext, useState, ReactNode, useContext } from "react"

interface ArticuloContextType {
  article: string
  title: string
  setArticle: (article: string) => void
  setTitle: (article: string) => void
}

const ArticuloContext = createContext<ArticuloContextType | undefined>(
  undefined
)

export const useArticuloContext = () => {
  const context = useContext(ArticuloContext)
  if (!context) {
    throw new Error("Error")
  }
  return context
}

export const ArticuloProvider = ({ children }: { children: ReactNode }) => {
  const [article, setArticle] = useState<string>("")
  const [title, setTitle] = useState<string>("")

  return (
    <ArticuloContext.Provider value={{ article, setArticle, title, setTitle }}>
      {children}
    </ArticuloContext.Provider>
  )
}
