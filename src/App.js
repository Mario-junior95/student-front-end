import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import StudentList from "./pages/StudentList/StudentList";
import UpdateStudent from "./pages/CreateUpdateStudent/UpdateStudent";
import CreateStudent from "./pages/CreateUpdateStudent/CreateStudent";
import Department from "./pages/Departments/Department";
import CreateDepartment from "./pages/Departments/CreateDepartment/CreateDepartment";
import { PublicRoutes, RequireAuth } from "./components/routes/RequireAuth";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const checkToken = Cookies.get("token");

  useEffect(() => {}, [checkToken]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/** public  routes */}
        <Route path="/" element={<PublicRoutes />}>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/** protected routes */}
        <Route path="/" element={<RequireAuth />}>
          <Route path="/welcome-page" element={<WelcomePage />} />
          <Route path="/student" element={<StudentList />} />
          <Route path="/create-student" element={<CreateStudent />} />
          <Route path="/update-student/:id" element={<UpdateStudent />} />
          <Route path="/department" element={<Department />} />
          <Route path="/create-parent-department" element={<CreateDepartment />} />
        </Route>

        {/** Catch All */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
