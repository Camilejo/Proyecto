export const extractTitleContent = (data: string, isFirst = false) => {
  const splittedContent = data.split(isFirst ? "\n" : "><")
  const title = splittedContent[0] || ""
  const content = splittedContent.slice(1).join("\n") || ""

  return {
    title,
    content,
  }
}

export const removeHTMLTags = (data: string) => {
  return data.replace(/<[^>]*>?/gm, "")
}
