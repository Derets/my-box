import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LanguageProvider from "./context/LanguageContext";
import AuthProvider from "./context/AuthContext";
import React, { Suspense } from "react";

import "./App.css";
import Root from "./pages/Root";
import Loader from "./UI/Loader";
const Edit = React.lazy(() => import("./pages/Edit"));
const Main = React.lazy(() => import("./pages/Main"));
const About = React.lazy(() => import("./pages/About"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Profile = React.lazy(() => import("./pages/Profile"));
const ErrorPage = React.lazy(() => import("./pages/Error"));
const Ordering = React.lazy(() => import("./pages/Ordering"));
const AdminPanel = React.lazy(() => import("./pages/AdminPanel"));
const Constructor = React.lazy(() => import("./pages/Constructor"));
const Authentication = React.lazy(() => import("./pages/Authentication"));
const EmailConfirmation = React.lazy(() => import("./pages/EmailConfirmation"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/emailconfirmation/:token", element: <EmailConfirmation /> },
      { path: "/authentication", element: <Authentication /> },
      { path: "/constructor", element: <Constructor /> },
      { path: "/ordering", element: <Ordering /> },
      { path: "/admin", element: <AdminPanel /> },
      { path: "/profile", element: <Profile /> },
      { path: "/orders", element: <Orders /> },
      { path: "/about", element: <About /> },
      { path: "/edit", element: <Edit /> },
    ],
  },
]);

function App() {
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
      <AuthProvider>
        <LanguageProvider>
          <Suspense
            fallback={
              <div className="Suspense">
                <Loader light />
                <p>Loading...</p>
              </div>
            }
          >
            <RouterProvider router={router} />
          </Suspense>
        </LanguageProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
