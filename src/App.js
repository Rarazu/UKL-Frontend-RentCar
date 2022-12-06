import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./pages/Navbar"
import Login from "./pages/Login"
import Pelanggan from "./pages/Pelanggan"
import Mobil from "./pages/Mobil"
import Sewa from "./pages/Sewa"

export default function App(){
  return(
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/pelanggan" element={<Pelanggan />} />
        <Route path="/mobil" element={<Mobil />} />
        <Route path="/sewa" element={<Sewa />} />
      </Routes>
    </BrowserRouter>
  )
}