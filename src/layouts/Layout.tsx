import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { DashboardHeader } from "../components/DashboardHeader/DashboardHeader";
const Layout = () => {

  return (
    <div
      className={`flex bg-gray-5`}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <DashboardHeader />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
