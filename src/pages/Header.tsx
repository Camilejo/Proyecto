import { Link, useLocation } from "react-router-dom"
import image from "/articol.png"

const Header = () => {
  const location = useLocation()
  return (
    <nav className="bg-black mb-5">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/">
                <img src={image} alt="articol" className="h-10 w-auto" />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to="/" className=" px-3 text-3xl font-medium text-white">
                  <span className="text-yellow-300">ART</span>
                  <span className="text-blue-500">IC</span>
                  <span className="text-red-500">OL</span>
                </Link>

                <Link
                  to="/"
                  className={`mx-2 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:underline ${
                    location.pathname === "/" ? "text-yellow-300" : ""
                  }`}
                >
                  Principal
                </Link>
                <Link
                  to="/articulos"
                  className={`mx-5 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:underline ${
                    location.pathname === "/articulos" ? "text-yellow-300" : ""
                  }`}
                >
                  Articulos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
