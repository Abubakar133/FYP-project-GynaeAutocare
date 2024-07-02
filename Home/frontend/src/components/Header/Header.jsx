import React, { useContext, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "./../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
const Header = () => {
  const { user, token, role } = useContext(AuthContext);
  const history = useNavigate();

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    
   
    if (window.location.pathname === "/Logout") {

      if (token && user) {
        // Only perform logout logic if the current link is the "Logout" button
        dispatch({ type: "LOGOUT" });
        toast.success("Logout successful");
        Logout();
        navigate("/");
      } else {
       
        
        toast.error("User is not logged in");
        navigate("/");
      }
     
    }
    // Check if the user is authenticated before proceeding with logout
    
  };


  const Logout = async () => {
    try {
        // Make an HTTP POST request to trigger the API
        const response = await fetch("http://localhost:5000/Logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
            // No body needed for this request
        });

        if (response.ok) {
            // If the request was successful
            toast.success("Logout successful");
        } else {
            // If the request was not successful
            
        }
    } catch (error) {
        // Handle errors if any
        console.error("Error:", error);
        alert("logout error2");
    }
};




  const navLinks = [
    {
      path: "/home",
      display: "Home",
    },
    {
      path: "/services",
      display: "Services",
    },
    {
      path: "/doctors",
      display: "Find a Doctor",
    },
    {
      path: "/contact",
      display: "Contact",
    },
    {
      path: "/Content",
      display: "Educational Content",
    },
    
    {
      path: "/Logout",
      display: "Logout",
      isButton: true,
      onClick: handleLogout(),
      style: { color: 'red' }
    }
  ];

  return (
    <header ref={headerRef} className="header flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* =========== logo ========== */}
          <div>
            <img
              src={logo}
              alt="logo"
              style={{ maxWidth: "250px", height: "auto" }}
            />
          </div>

          {/* ========== nav menu =========== */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  {link.external ? (
                    <a
                      href={link.url}
                      rel="noopener noreferrer"
                      className="text-textColor font-[500] text-[16px] leading-7"
                    >
                      {link.display}
                    </a>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={navClass =>
                        navClass.isActive
                          ? "text-[#0067FF] font-[600] text-[16px] leading-7"
                          : "text-textColor font-[500] text-[16px] leading-7"
                      }
                    >
                      {link.display}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ========= nav right ========== */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  to={`${
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  } `}
                >
                  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer ">
                    <img
                      className="w-full rounded-full"
                      src={user?.photo}
                      alt=""
                    />
                  </figure>
                </Link>
              </div>
              
            ) : (

              
            
              <Link to="/login">
                <button className="bg-blue-600 text-white px-6 py-2 sm:px-4 sm:py-1 rounded-full h-10 w-24 sm:h-8 sm:w-20 flex justify-center items-center">
                  Log In
                </button>
              </Link>
          
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
