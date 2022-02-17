import React, { useState, useEffect } from "react";

import { Link, NavLink } from "react-router-dom";

import logo from "assets/logo.png";

import routes from "globals/routes";

import loginServices from "modules/Login/services/login.services";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./style.css";
import authHeader from "globals/auth-header";

export default function Navbar() {
  const [scroll, setScroll] = useState(0);

  const [opened, setOpened] = useState(false);

  const [loggedIn, setLoggetIn] = useState(Object.keys(authHeader()).length ? true : false);

  useEffect(() => {
    // check the scroll to add class to the navbar
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  }, [scroll]);

  useEffect(() => {
    // hide the menu when click the body
    document.body.addEventListener("click", e => {
      setOpened(false);
    });
  }, []);

  // close the menu
  const closeMenu = e => {
    e.stopPropagation();

    setOpened(false);
  };

  // handle navlink click
  const handleNavLinkClick = () => {
    setScroll(0);
    window.scrollTo(0, 0);
  }

  // log out
  const logOut = () => {
    loginServices.logout();
    setLoggetIn(false);
    window.location.reload();
  }

  return (
    <nav
      data-testid="navbar"
      className={`navbar fixed-top navbar-expand-sm ${scroll ? "bg-dark" : ""}`}
    >
      <div className="container">
        <Link className={`navbar-brand ${scroll ? "img-scrolled" : ""}`} to="/">
          <img
            className="logo-img"
            src={logo}
            alt="Energia's Logo"
            title="logo of the team"
          />
        </Link>
        <button
          className="navbar-toggler"
          data-testid="toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpened(true)}
        >
          <FontAwesomeIcon icon={faBars} className="navbar-toggler-icon" />
        </button>
        <div
          data-testid="side-menu"
          style={{ right: opened ? "0" : "-90%" }}
          className="navbar-collapse"
          id="navbarNav"
          // to prevent the closing action when clicking anywhere on the menu
          onClick={() => setOpened(true)}
        >
          <button
            className="menu-close"
            data-testid="closer"
            onClick={e => closeMenu(e)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <ul
            className="navbar-nav ml-auto"
            // to prevent the closing action when clicking anywhere on the menu
            onClick={e => closeMenu(e)}
            data-testid="menu-list"
          >
            {routes &&
              routes.length > 0 &&
              routes.slice(0, routes.length - 2).map(route => {
                return route.inNavbar.shown ? (
                  <li key={route.path} className="nav-item">
                    <NavLink
                      exact
                      data-testid="navlinks"
                      className="nav-link"
                      to={route.path}
                      onClick={() => handleNavLinkClick()}
                    >
                      {route.inNavbar.label}
                    </NavLink>
                  </li>
                ) : null;
              })
            }
            {loggedIn ? (
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={logOut}
                >
                  Log Out
                </span>
              </li>
            ) : routes.slice(routes.length - 2).map(route => (
              <li key={route.path} className="nav-item">
                <NavLink
                  exact
                  data-testid="navlinks"
                  className="nav-link"
                  to={route.path}
                  onClick={() => handleNavLinkClick()}
                >
                  {route.inNavbar.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
