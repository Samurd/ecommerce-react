import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import AppNavbar from "./components/AppNavbar";
import { Login } from "./pages/Login";
import { Purchases } from "./pages/Purchases";
import { ProductDetail } from "./pages/ProductDetail";
import { Loader } from "./components/Loader";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import { ProtectedRoutes } from "./components/ProtectedRoutes";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      {isLoading && <Loader />}
      <AppNavbar />

      <Container fluid>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />

          {/*Esta ruta necesita ser protegida */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />} />
          </Route>

          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
