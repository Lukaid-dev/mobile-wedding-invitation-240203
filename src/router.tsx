import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import GuestBook, { loader } from './pages/GuestBook/GuestBook';
import App from './App';
import Invitation from './pages/Invitation/Invitation';
import Gallery from './pages/Gallery/Gallery';
import NotFound from './pages/NotFound';
import Landing from './pages/Landing';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Landing />,
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
