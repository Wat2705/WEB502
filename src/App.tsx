"use client";

import { Navbar } from "flowbite-react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import List from "./List";
import Add from "./Add";
import Update from "./Update";
import Register from "./Register";
import LogIn from "./LogIn";
import NotFound from "./NotFound";

function App() {
  const nav = useNavigate();

  function checked() {
    if (sessionStorage.getItem('token') == null) {
      return false
    }
    return true
  }

  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Collapse>
          <NavLink to='/products'>
            Home
          </NavLink >
          {checked() ? (
            <>
              <div className="cursor-pointer" onClick={() => {
                if (confirm('Bạn có muốn đăng xuất không?')) {
                  sessionStorage.clear()
                  alert('Đăng xuất thành công!');
                  nav('/login')
                  window.location.reload();
                }
              }}>
                Log Out
              </div >
            </>
          ) : (
            <>
              <NavLink to="/register">
                Register
              </NavLink >
              <NavLink to="/login">Log In</NavLink>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/products" element={<List />} />
        {checked() ? (
          <>
            <Route path="/add" element={<Add />} />
            <Route path="/update/:id" element={<Update />} />
          </>
        ) : ""}

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;