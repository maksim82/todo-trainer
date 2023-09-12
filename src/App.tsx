import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage";
import CompletedPage from "./pages/CompletedPage/CompletedPage";
import Layout from './components/Layout/Layout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/completed" element={<CompletedPage />} />
      </Route>
    </Routes>
  )
}

export default App;