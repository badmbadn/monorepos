import {createRoot} from 'react-dom/client';
import {App} from "./components/App";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { About } from './pages/about';
import { Shop } from './pages/shop';
import { Suspense } from 'react';

const root = document.getElementById('root')

if (!root) {
  throw new Error('root not found')
}

const router = createBrowserRouter( [
  {
    path:'/',
    element: <App />,
    children : [
      {
        path: 'about',
        element: <Suspense><About /></Suspense>
      },
      {
        path:'/shop',
        element: <Suspense><Shop /></Suspense>
      }
    ]
  }
])

const container = createRoot(root);
container.render(
  <RouterProvider router={router}/>
);