import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Pelanggan from "./pages/Pelanggan"

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/pelanggan" element={<Pelanggan />} />
      </Routes>
    </BrowserRouter>
  )
}