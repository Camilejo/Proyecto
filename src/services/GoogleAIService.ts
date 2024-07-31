import { GoogleGenerativeAI } from "@google/generative-ai"
import { GEMINI_API_KEY as API_KEY, GEMINI_MODEL } from "../config"

const getAI = new GoogleGenerativeAI(API_KEY)

const generateContent = async (systemPrompt: string, content: string) => {
  const model = getAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: systemPrompt,
  })

  try {
    const result = await model.generateContent(content)
    const response = result.response
    const text = response.text()
    return text
  } catch (error) {
    throw new Error("Error al generar contenido: " + error)
  }
}

export const GoogleAIService = {
  checkContent: async (content: string) => {
    const systemPrompt =
      "Eres un verificador de temas de colombia. Tienes que revisar que el texto introducido por el usuario este relacionado con algo de Colombia, tu salida debe ser un porcentaje 0% nada de relacion 100% Muy relacionado"

    try {
      const result = await generateContent(systemPrompt, content)
      const number = result.match(/\d+/)
      return number ? parseInt(number[0]) : 0
    } catch (error) {
      throw new Error("Error al verificar contenido: " + error)
    }
  },
  generateContent: async (content: string) => {
    const prompt =
      "Eres un generador de articulos, tu funcion es generar articulos interesantes, llamativos e ingeniosos acerca de Colombia. El usuario te dara el tema y deberas generar todo el contenido del articulo incluyendo titulo, subtitulos en negrilla con el contenido y una conclusion. SOLO puedes generar articulos de temas relacionados a Colombia, no puedes generar contenido de zonas geograficas, costumbres, cultura o absolutamente nada que tenga que ver con otros paises."

    try {
      const generatedContent = await generateContent(prompt, content)

      return generatedContent
    } catch (error) {
      return "Error al generar contenido: " + error
    }
  },
  generateTags: async (content: string) => {
    const prompt =
      "Eres un generador de etiquetas y quiero que con el contenido del articulo generes las etiquetas, pueden ser palabras clave, temas, lugares, personas, etc. Puedes generar entre 3 a 5 etiquetas que describan el contenido del articulo. La salida siempre debe ser un array de etiquetas en json de la siguiente forma: [etiqueta 1, etiqueta 2...]"

    try {
      const generatedTags = await generateContent(prompt, content)

      // get the json from the generated tags output: "Aqui tienes las etiquetas ```json\n[\"tag1\", \"tag2\"]\n```"
      const extractedJson = generatedTags
        .split("```json\n")[1]
        .split("\n```")[0]

      const tags = JSON.parse(extractedJson || "[]")

      return tags
    } catch (error) {
      return "Error al generar contenido: " + error
    }
  },
}
