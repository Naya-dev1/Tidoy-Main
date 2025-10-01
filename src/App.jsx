import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { HomeProvider } from "./contexts/HomeContext";
import { Toaster } from "react-hot-toast";
import Search from "./pages/Search";
import { PropertiesProvider } from "./contexts/PropertiesContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import NearBy from "./pages/NearBy";
import { DateProvider } from "./contexts/DateContext";
import ProductDetail from "./pages/ProductDetail";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./contexts/AuthContext";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <AuthProvider>
        <PropertiesProvider>
          <HomeProvider>
            <DateProvider>
              <BrowserRouter>
                <Toaster position="top-center" />

                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search-result" element={<Search />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/nearby" element={<NearBy />} />
                  <Route
                    path="/product-detail/:id"
                    element={<ProductDetail />}
                  />
                  <Route path="/profile" element={<ProfilePage />} />

                  {/* 404 Catch All */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </BrowserRouter>
            </DateProvider>
          </HomeProvider>
        </PropertiesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
