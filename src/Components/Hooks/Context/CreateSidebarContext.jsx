// CreateSidebarContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

const Sidebar_Context = createContext();

export const useMyContext = () => {
  return useContext(Sidebar_Context);
};

export const SidebarProvider = ({ children }) => {
  const [SidebarToggle, setSidebarToggle] = useState(false);
  const sidebarRef = useRef(null);
  // toggleSidebar
  const toggleSidebar = () => {
    setSidebarToggle(!SidebarToggle);
    // $("#main-wrapper").toggleClass("menu-toggle");
  };

  const main_wrapper = () => {
    if (window.innerWidth <= 768) {
      $("#main-wrapper").toggleClass("menu-toggle");
    }
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setSidebarToggle(true);
    } else {
      setSidebarToggle(false);
    }
  };

  // const handleClickOutside = (event) => {
  //   const mainWrapper = document.getElementById("main-wrapper");
  //   if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
  //     //  // Close sidebar
  //     if (mainWrapper) {
  //     }
  //   }
  // };

  const handleClickOutside = (event) => {
    // Check if the viewport width is for mobile (e.g., 768px or smaller)
    if (window.innerWidth > 768) {
      return; // Exit if not mobile
    }
    const mainWrapper = document.getElementById("main-wrapper");
    const sidebar = document.getElementById("menu"); // Assuming sidebar has an id "sidebar"

    // Check if the clicked element is part of the sidebar (e.g., a page link inside sidebar)
    if (sidebar && sidebar.contains(event.target)) {
      return; // Allow the click if inside the sidebar (links inside sidebar)
    }

    // If sidebar is open, and the click is outside sidebar
    if (sidebar && sidebar.classList.contains("menu-toggle")) {
      // Sidebar is open, close it by removing the 'menu-toggle' class
      $("#sidebar").removeClass("menu-toggle");
    } else {
      // Sidebar is closed, prevent click inside the main-wrapper
      $("#main-wrapper").addClass("menu-toggle");
    }
  };

  const aaaaaaa = () => {
    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  };
  useEffect(() => {
    aaaaaaa();
  }, []);

  return (
    <Sidebar_Context.Provider
      value={{ main_wrapper, toggleSidebar, SidebarToggle, sidebarRef }}
    >
      {children}
    </Sidebar_Context.Provider>
  );
};
