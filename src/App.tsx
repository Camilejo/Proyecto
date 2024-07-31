import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Index from "./pages/Index"
import Articulos from "./pages/Articulos"
import Articulo from "./pages/Articulo"
import { Layout } from "./pages/Layout"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/articulo/:id" element={<Articulo />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
