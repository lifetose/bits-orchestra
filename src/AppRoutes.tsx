import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layouts/MainLayout";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const BookForm = lazy(() => import("./pages/BookForm"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/book/:id?' element={<BookForm />} />
          <Route path='*' element={<div>Page Not Found</div>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
