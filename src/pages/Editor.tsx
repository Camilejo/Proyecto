import { useRef } from "react"
import {
  ClassicEditor,
  Context,
  Essentials,
  Bold,
  Italic,
  Paragraph,
  HeadingButtonsUI,
  Heading,
  ParagraphButtonUI,
  ImageInsertViaUrl,
  Image,
} from "ckeditor5"
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react"
import "ckeditor5/ckeditor5.css"
import { extractTitleContent } from "../utils"

interface EditorProps {
  initialContent: string
  setArticleCreationData: (data: {
    title: string
    content: string
    rawContent: string
  }) => void
}

const Editor: React.FC<EditorProps> = ({
  initialContent,
  setArticleCreationData,
}) => {
  const editorRef = useRef<ClassicEditor | null>(null)

  return (
    <CKEditorContext context={Context}>
      <CKEditor
        editor={ClassicEditor}
        config={{
          plugins: [
            Essentials,
            Heading,
            Paragraph,
            HeadingButtonsUI,
            ParagraphButtonUI,
            Bold,
            Italic,
            Image,
            ImageInsertViaUrl,
          ],
          toolbar: [
            "undo",
            "redo",
            "|",
            {
              label: "Text Type",
              items: ["heading1", "heading2", "heading3", "paragraph"],
              icon: "text",
            },
            "|",
            "bold",
            "italic",
            "insertImage",
            "|",
          ],
        }}
        data={initialContent}
        onReady={(editor) => {
          editorRef.current = editor
        }}
        onChange={(_event, editor) => {
          const data = editor.getData()
          const extractedContent = extractTitleContent(data)
          setArticleCreationData({
            title: extractedContent.title,
            content: extractedContent.content,
            rawContent: data,
          })
        }}
      />
    </CKEditorContext>
  )
}

export default Editor
