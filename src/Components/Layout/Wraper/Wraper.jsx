import { useState, useEffect } from "react";
import Logo from "../Logo/Logo.jsx";
import Header from "../Header/Header.jsx";
import SIdebar from "../SIdebar/SIdebar";
import Main_Contain from "../Main/Main_Containt.jsx";
import Footer from "../Footer/Footer.jsx";
import Dashboard from "../../Pages/Superadmin/Dashboard/Dashboard.jsx";
import {
  SidebarProvider,
  useMyContext,
} from "../../Hooks/Context/CreateSidebarContext.jsx";
import { Outlet } from "react-router-dom";
import PagesIndex from "../../Pages/PagesIndex.jsx";
import { object } from "yup";

function MainContent() {
  const { SidebarToggle, sidebarRef } = useMyContext();

  let userdetails = JSON.parse(localStorage.getItem("userdetails")) || {};

  const [isResponsive, setIsResponsive] = useState(window.innerWidth > 550);

  const [first, setfirst] = useState(false);

  const handleResize = () => {
    setIsResponsive(window.innerWidth > 550);
    // $('#main-wrapper').removeClass('menu-toggle');
  };

  const ffffff = () => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  };
  useEffect(() => {
    ffffff;
  }, [window.innerWidth]);

  const getPermissionApi121 = () => {
    console.log("location.pathname", location.pathname);
    console.log("userdetails", userdetails);

    if (Object.keys(userdetails).length > 0 && location.pathname === "/") {
      console.log("SAdsadasd");

      setfirst(true);
      localStorage.setItem("token", "");
      localStorage.setItem("userdetails", JSON.stringify({}));
    }
  };

  PagesIndex.useEffect(() => {
    getPermissionApi121();
  }, [location, userdetails]);

  return (
    <div
      ref={sidebarRef}
      id={`main-wrapper`}
      className={`show ${SidebarToggle ? "menu-toggle" : ""}`}
    >
      {Object.keys(userdetails).length > 0 && (
        <>
          <Logo />
          <Header />
          <SIdebar />
        </>
      )}

      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <SidebarProvider>
      <MainContent />
    </SidebarProvider>
  );
}

export default App;

// import { useState, useEffect } from "react";
// import Logo from "../Logo/Logo.jsx";
// import Header from "../Header/Header.jsx";
// import SIdebar from "../SIdebar/SIdebar";
// import Main_Contain from "../Main/Main_Containt.jsx";
// import Footer from "../Footer/Footer.jsx";
// import Dashboard from "../../Pages/Superadmin/Dashboard/Dashboard.jsx";
// import {
//   SidebarProvider,
//   useMyContext,
// } from "../../Hooks/Context/CreateSidebarContext.jsx";
// import { Outlet } from "react-router-dom";
// import PagesIndex from "../../Pages/PagesIndex.jsx";

// function MainContent() {
//   const { SidebarToggle, sidebarRef } = useMyContext();

//   let userdetails = JSON.parse(localStorage.getItem("userdetails")) || {};

//   const [isResponsive, setIsResponsive] = useState(window.innerWidth > 550);

//   const [first, setfirst] = useState(false);

//   const handleResize = () => {
//     setIsResponsive(window.innerWidth > 550);
//     // $('#main-wrapper').removeClass('menu-toggle');
//   };

//   const ffffff = () => {
//     handleResize();

//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   };
//   useEffect(() => {
//     ffffff;
//   }, [window.innerWidth]);

//   // const getPermissionApi121 = () => {
//   //   console.log("location.pathname", location.pathname);
//   //   console.log("userdetails", userdetails);

//   //   if (userdetails && location.pathname === "/") {
//   //     console.log("SAdsadasd");

//   //     setfirst(true);
//   //     localStorage.setItem("token", "");
//   //     localStorage.setItem("userdetails", JSON.stringify({}));
//   //   }
//   // };

//   // PagesIndex.useEffect(() => {
//   //   getPermissionApi121();
//   // }, [location, userdetails]);

//   return (
//     <div
//       ref={sidebarRef}
//       id={`main-wrapper`}
//       className={`show ${SidebarToggle ? "menu-toggle" : ""}`}
//     >

//       <Logo />
//       <Header />
//       <SIdebar />
//       <Outlet />
//       <Footer />
//     </div>
//   );
// }

// function App() {
//   return (
//     <SidebarProvider>
//       <MainContent />
//     </SidebarProvider>
//   );
// }

// export default App;
