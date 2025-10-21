import { BrowserRouter, Routes, Route } from 'react-router';
import Register from './pages/Register';
import Home from './pages/Home';
import Header from './components/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
