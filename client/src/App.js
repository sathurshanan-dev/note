import { BrowserRouter, Routes, Route } from 'react-router';
import Register from './pages/Register';
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import EditNote from './pages/EditNote';
import CreateNote from './pages/CreateNote';
import Profile from './pages/Profile';

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
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
