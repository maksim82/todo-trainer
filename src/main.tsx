import ReactDOM from 'react-dom/client'
import Layout from './components/layout/Layout.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import TodoStore from './store/todo.ts';
import CompletedPage from './pages/CompletedPage/CompletedPage.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        loader: () => ({ vm: new TodoStore() }),
        element: <HomePage />,
      },
      {
        path: 'completed',
        element: <CompletedPage />,
        loader: () => ({ vm: new TodoStore() }),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
