import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Usuarios from './pages/Usuarios'
import Metas from './pages/Metas'
import Avisos from './pages/Avisos'
import Calendario from './pages/Calendario'
import Perfil from './pages/Perfil'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/metas" element={<Metas />} />
      <Route path="/avisos" element={<Avisos />} />
      <Route path="/Calendario" element={<Calendario />} />
      <Route path="/Perfil" element={<Perfil />} />
    </Routes>
  )
}

export default App
