import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import GuestBook from './pages/GuestBook';
import App from './App';
import Invitation from './pages/Invitation';
import Gallery from './pages/Gallery';
import NotFound from './pages/NotFound';
import { storage } from './firebase';
import { getDownloadURL, ref } from 'firebase/storage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: async (): Promise<string> => {
          const imageRef = ref(storage, 'background_image.png');
          const url = getDownloadURL(imageRef)
            .then((url) => {
              return url;
            })
            .catch((error) => {
              // Handle any errors
              new Error(error);
              return '';
            });
          return url;
        },
      },
      {
        path: '/Home',
        element: <Home />,
        loader: async (): Promise<string> => {
          const imageRef = ref(storage, 'background_image.png');
          const url = getDownloadURL(imageRef)
            .then((url) => {
              return url;
            })
            .catch((error) => {
              // Handle any errors
              new Error(error);
              return '';
            });
          return url;
        },
      },
      {
        path: '/Invitation',
        element: <Invitation />,
        loader: async (): Promise<string> => {
          const imageRef = ref(storage, 'image_test.png');
          const url = getDownloadURL(imageRef)
            .then((url) => {
              return url;
            })
            .catch((error) => {
              // Handle any errors
              new Error(error);
              return '';
            });
          return url;
        },
      },
      { path: '/Gallery', element: <Gallery /> },
      { path: '/Guestbook', element: <GuestBook /> },
    ],
  },
]);
