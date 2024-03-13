import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import GuestBook, { loader } from './pages/GuestBook/GuestBook';
import App from './App';
import Invitation from './pages/Invitation/Invitation';
import Gallery from './pages/Gallery/Gallery';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Navigate to="/Home" />,
      },
      {
        path: '/Home',
        element: <Home />,
      },
      {
        path: '/Invitation',
        element: <Invitation />,
      },
      {
        path: '/Gallery',
        element: <Gallery />,
      },
      {
        path: '/Guestbook',
        element: <GuestBook />,
        loader: loader,
      },
    ],
  },
]);
