import { useLocation } from "react-router-dom";
import { useEffect } from "react";
// import new123 from "../../assets/Images/newradha.png"
const DynamicFavicon = () => {
  const location = useLocation();

  useEffect(() => {
    const faviconPath = "/assets/images/newradha.png"; // Must be in public/
    const isLoginPage = location.pathname === "/";

    const existingFavicon = document.querySelector("link[rel*='icon']");

    if (isLoginPage) {
      if (existingFavicon) {
        existingFavicon.remove();
        window.location.reload();
      }
    } else {
      // Set favicon on other pages
      const favicon = existingFavicon || document.createElement("link");
      favicon.type = "image/x-icon";
      favicon.rel = "icon";
      favicon.href = faviconPath;

      if (!existingFavicon) {
        document.head.appendChild(favicon);
      }
    }
  }, [location.pathname, location]);

  return null;
};

export default DynamicFavicon;
