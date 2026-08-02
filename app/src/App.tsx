// import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeView from "./views/Employee";
import ManagerView from "./views/Manager";
import AdminView from "./views/Admin";
import AccountCreationView from "./views/AccountCreation";
import LoginView from "./views/Login";
import { RoleProtectedRoute } from "./components/RoleProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/login" element={<LoginView />}></Route>

        {/* role based */}
        <Route
          path="/"
          element={
            <RoleProtectedRoute
              allowedRoles={["employee", "admin", "manager"]}
            ></RoleProtectedRoute>
          }
        >
          <Route path="/" element={<EmployeeView />}></Route>
        </Route>
        <Route
          path="/manager"
          element={
            <RoleProtectedRoute
              allowedRoles={["admin", "manager"]}
            ></RoleProtectedRoute>
          }
        >
          <Route path="/manager" element={<ManagerView />}></Route>
        </Route>
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}></RoleProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminView />}></Route>
          <Route path="/admin/new" element={<AccountCreationView />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
  // return <EmployeeView />;
}

export default App;
