import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Loading from "@/components/ui/Loading";
import { LOADING_LABELS } from "@/constants/labels";
import { ROUTES } from "@/constants/routes";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@/components/Layout/Home"));
const About = lazy(() => import("@/components/Pages/About"));
const Login = lazy(() => import("@/components/Pages/Login"));
const Register = lazy(() => import("@/components/Pages/Register"));

const AppRoutes = () => (
  <Suspense fallback={<Loading message={LOADING_LABELS.PAGE} />}>
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ABOUT}
        element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        }
      />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
