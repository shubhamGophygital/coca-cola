import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/errorPage/ErrorPage";
import FallBackPage from "./pages/fallBackPage/FallBackPage";
import navigationConstants from "./navigationConstants";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";

import { Suspense, lazy } from "react";
const Home = lazy(() => import("../modules/home/pages/home/Home"));
const Login = lazy(() => import("../modules/auth/pages/login/Login"));
const BrandTagsPage = lazy(() =>
  import("../modules/workSpace/pages/BrandTagsPage/BrandTagsPage")
);
const QuestionsPage = lazy(() =>
  import("../modules/workSpace/pages/QuestionsPage/QuestionsPage")
);

export const router = createBrowserRouter([
  {
    path: navigationConstants.LOGIN,
    element: (
      <Suspense fallback={<FallBackPage />}>
        <Login />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: navigationConstants.HOME,
    element: (
      <ProtectedRoutes>
        <Home />
      </ProtectedRoutes>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: navigationConstants.BRAND_TAGS,
    element: (
      <ProtectedRoutes>
        <BrandTagsPage />
      </ProtectedRoutes>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: navigationConstants.QUESTION_ID,
    element: (
      <ProtectedRoutes>
        <QuestionsPage />
      </ProtectedRoutes>
    ),
    errorElement: <ErrorPage />,
  },
]);
