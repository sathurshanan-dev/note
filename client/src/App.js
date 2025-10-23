import { BrowserRouter, Routes, Route } from 'react-router';
import Register from './pages/Register';
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import EditNote from './pages/EditNote';
import CreateNote from './pages/CreateNote';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/note/:id/edit" element={<EditNote />} />
          <Route path="/new" element={<CreateNote />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
