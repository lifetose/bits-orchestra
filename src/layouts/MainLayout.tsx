import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen w-full'>
      <Header />
      <div className='flex flex-grow'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
