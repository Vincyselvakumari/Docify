
import Register from './pages/Register.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddDoc from './pages/AddDoc.jsx';
import EditDoc from './pages/EditDocs.jsx';
import Profile from './pages/Profile.jsx';

function App() {


  return (
   <BrowserRouter>
   <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-doc" element={<AddDoc />} />
        <Route path="/edit/:id" element={<EditDoc />} />
        <Route path="/profile" element={<Profile />} />
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
