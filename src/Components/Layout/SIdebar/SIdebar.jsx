import React, { useRef, useState } from "react";
import { admin_Sidebar } from "./Sidebar_data";
import { Link, useLocation } from "react-router-dom";
import PagesIndex from "../../Pages/PagesIndex";
import { Get_permissions } from "../../Redux/slice/CommonSlice";
import { filterSidebarItems } from "./FilteredPermissions";
import { useMyContext } from "../../Hooks/Context/CreateSidebarContext";

const SIdebar = () => {
  const location = useLocation();

  let { user_id, role } = JSON.parse(localStorage.getItem("userdetails")) || {};
  const { main_wrapper } = useMyContext();

  const { getPermissions } = PagesIndex.useSelector(
    (state) => state.CommonSlice
  );
  const dispatch = PagesIndex.useDispatch();

  const [expandedItem, setExpandedItem] = useState(null);

  // console.log("admin_Sidebar12121212", admin_Sidebar);

  const getPermissionApi = () => {
    if (user_id) {
      dispatch(Get_permissions(user_id));
    }
  };

  PagesIndex.useEffect(() => {
    getPermissionApi();
  }, [user_id]);

  const handleToggle = (index, hasNested, isActive) => {
    // setExpandedItem(expandedItem === index ? null : index);
    if (hasNested) {
      // Toggle expand/collapse for parent menu
      setExpandedItem(expandedItem === index ? null : index);
    } else {
      // Trigger `main_wrapper()` directly if no nested elements
      main_wrapper();
    }
  };

  PagesIndex.useEffect(() => {
    getPermissionApi();
  }, [user_id]);

  const filteredSidebar = filterSidebarItems(
    admin_Sidebar,
    role,
    getPermissions
  );

  PagesIndex.useEffect(() => {
    $("title").text(`
      Radha567 Games : ${
        location?.pathname?.split("/")[3] || location.pathname.split("/")[2]
      }`);
    // $("#SetTitle").attr(
    //   "title",
    //   location?.pathname?.split("/")[3] || location.pathname.split("/")[2]
    // );
  }, [location]);

  // console.log("filteredSidebar1212121", filteredSidebar);

  return (
    <div className="nk-sidebar">
      <div
        className="slimScrollDiv"
        style={{
          position: "relative",
          overflow: "hidden",
          width: "auto",
          height: "100%",
        }}
      >
        <div
          className="nk-nav-scroll active"
          style={{ overflowY: "auto", width: "auto", height: "100%" }}
        >
          {/* <Logo/> */}
          <ul className="metismenu in" id="menu">
            {filteredSidebar &&
              filteredSidebar.map((item, index) => {
                const isActive = expandedItem === index;
                const hasNested = item.NestedElement.length > 0;
                return (
                  <div key={`${item.headerTitle}_${index}`}>
                    <li
                      className={`${isActive ? "active" : ""}`}
                      key={`${item.headerTitle}_${index}`}
                    >
                      {(item.permission != null || "null") && (
                        <Link
                          to={hasNested ? "#" : item.route}
                          className={
                            item.NestedElement.length > 0 ? "has-arrow" : ""
                          }
                          aria-expanded={isActive}
                          onClick={() =>
                            handleToggle(index, hasNested, isActive)
                          }
                        >
                          <i className={`${item.Icon} menu-icon me-2`} />
                          <span className="nav-text">{item.title}</span>
                        </Link>
                      )}

                      <ul
                        aria-expanded={isActive}
                        className={`collapse ${isActive ? "in" : ""}`}
                      >
                        {item.NestedElement.map((nested) => (
                          <li
                            key={nested.id}
                            className={isActive ? "active" : ""}
                          >
                            <Link
                              to={nested.route}
                              className={isActive ? "active" : ""}
                              onClick={() => main_wrapper()}
                            >
                              {nested.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </div>
                );
              })}
          </ul>
        </div>

        <div
          className="slimScrollRail"
          style={{
            width: 5,
            height: "100%",
            position: "absolute",
            top: 0,
            display: "none",
            borderRadius: 7,
            background: "rgb(51, 51, 51)",
            opacity: "0.2",
            zIndex: 90,
            right: 1,
          }}
        />
      </div>
    </div>
  );
};

export default SIdebar;
