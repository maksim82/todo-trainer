import ReactDOM from 'react-dom/client'
import Layout from './components/layout/Layout.tsx';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { CompletedPage } from './pages/CompletedPage';
import TodoStore from './store/todo.ts';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css'
import { Suspense } from 'react';
import Loader from './components/loader/Loader.tsx';
import ErrorBoundary from './providers/ErrorBoundary/ErrorBoundary.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        loader: () => ({ vm: new TodoStore() }),
        element: <Suspense fallback={<Loader />}><HomePage /></Suspense>,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'completed',
        element: <Suspense fallback={<Loader />}><CompletedPage /></Suspense>,
        loader: () => ({ vm: new TodoStore() }),
        errorElement: <ErrorBoundary />,
      },
      {
        path: '*',
        element: <Suspense fallback={<Loader />}><NotFoundPage /></Suspense>,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
