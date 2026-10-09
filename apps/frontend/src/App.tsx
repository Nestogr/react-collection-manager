import { Routes, Route } from "react-router";
import { AttributesPage } from "./pages/AttributesPage.tsx";
import { ItemsPage } from "./pages/ItemsPage.tsx";
import { CategoriesPage } from "./pages/CategoriesPage.tsx";
import { MainLayout } from "./layouts/MainLayout.tsx";
import { HomePage } from "./pages/HomePage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/attributes" element={<AttributesPage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
