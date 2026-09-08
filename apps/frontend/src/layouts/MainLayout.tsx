import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router";
export const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex">
        <Sidebar />
        <div className="max-w-4xl mx-auto p-6">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
