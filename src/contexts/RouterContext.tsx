import { createContext, useContext, useEffect, useState } from "react";
import { RouterContextInterface, RouterContextEnum } from "../types";
import { useLocation } from "react-router-dom";

const RouterContext = createContext<RouterContextInterface>(
  {} as RouterContextInterface
);

export const RouterProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const location = useLocation();

  const [router, setRouter] = useState<RouterContextEnum>(
    RouterContextEnum.Home
  );

  function updateRouter(router: RouterContextEnum) {
    setRouter(router);
  }

  useEffect(() => {
    setRouter(
      RouterContextEnum[location.pathname.slice(1) as RouterContextEnum]
    );
    console.log(location.pathname.slice(1));
  }, [location]);

  return (
    <RouterContext.Provider
      value={{
        router: router,
        updateRouter: updateRouter,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRoute = () => useContext(RouterContext);
