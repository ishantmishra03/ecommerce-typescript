import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Auth from './pages/Auth/Auth';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/auth" element={<Auth />}/>
      </Routes>
    </div>
  )
}

export default App
