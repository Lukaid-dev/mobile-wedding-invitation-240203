import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import GuestBook from './pages/GuestBook';
import App from './App';
import Invitation from './pages/Invitation';
import Gallery from './pages/Gallery';
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
      { path: '/Gallery', element: <Gallery /> },
      { path: '/Guestbook', element: <GuestBook /> },
    ],
  },
]);
