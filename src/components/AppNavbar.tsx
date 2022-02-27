import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbarStyles.css";
import Offcanvas from "react-bootstrap/esm/Offcanvas";
import Navbar from "react-bootstrap/esm/Navbar";
import Nav from "react-bootstrap/esm/Nav";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import User from "../types/User";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/userSlice";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownButton from "react-bootstrap/esm/DropdownButton";

const AppNavbar = () => {
  const user: User | null = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand={false} className="app-navbar">
      <DropdownButton
        title="menu"
        variant="secondary"
        id="dropdown-btn"
        align="end"
      >
        {!user && (
          <>
            <Dropdown.Item href="/login">Log In</Dropdown.Item>
            <Dropdown.Item href="/signup">Sign Up</Dropdown.Item>
          </>
        )}
        {user && (
          <>
            <Dropdown.Item href="/calendar">Calendar</Dropdown.Item>
            <Dropdown.Item href="/login" onClick={(e) => handleLogout()}>
              Log Out
            </Dropdown.Item>
          </>
        )}
      </DropdownButton>
    </Navbar>
  );
};

export default AppNavbar;
