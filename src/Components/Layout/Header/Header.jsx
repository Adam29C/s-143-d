import React from "react";
import { useMyContext } from "../../Hooks/Context/CreateSidebarContext";
import ToggleDark from "./ToggleDark";
import PagesIndex from "../../Pages/PagesIndex";
import { Remove_Space_Character } from "../../Utils/Valid_Rejex";
import { GetExpired } from "../../Utils/UserExpired";
import profileImage from "../../../assets/Images/newradha.png";
import { stringify } from "uuid";

const Header = () => {
  const { toggleSidebar } = useMyContext();
  const navigate = PagesIndex.useNavigate();
  const dispatch = PagesIndex.useDispatch();

  const token = localStorage.getItem("token");

  const [Toggle, setsetToggle] = PagesIndex.useState(false);

  //get userdetails in localstorage
  let userdetails = JSON.parse(localStorage.getItem("userdetails"));

  const handleLogout = () => {
    setTimeout(() => {
      navigate("/");
    }, 100);
    localStorage.removeItem("token");
    localStorage.removeItem("userdetails");
    localStorage.setItem("token", "");

    localStorage.setItem("userdetails", JSON.stringify({}));

    PagesIndex.toast.success("Logged Out Successfully");
  };

  // const abcd = () => {
  //   const checkTokenExpiry = () => {
  //     GetExpired(token, navigate);
  //   };
  //   const interval = setInterval(checkTokenExpiry, 5000);
  //   return () => clearInterval(interval);
  // };

  // PagesIndex.useEffect(() => {
  //   abcd();
  // }, []);

  const abcd = () => {
    let alertShown = false;

    const checkTokenExpiry = () => {
      let interval = setInterval(() => {
        let now = new Date();

        // console.log("now.getHours()", now.getHours());
        // console.log("now.getMinutes()", now.getMinutes());

        if (now.getHours() === 23 && now.getMinutes() === 59) {
          if (!alertShown) {
            alert("Your Session Expired. Please Login Again.");
            alertShown = true;
          }

          localStorage.removeItem("token");
          localStorage.removeItem("userdetails");
          navigate("/", { replace: true });

          clearInterval(interval);
        }
      }, 1000);
    };

    checkTokenExpiry();
  };

  PagesIndex.useEffect(() => {
    abcd(navigate);
  }, [navigate]);

  return (
    <div className="header">
      <div className="header-content clearfix">
        <div className="nav-control">
          <div className="hamburger">
            <span className="toggle-icon">
              <i className="icon-menu" onClick={() => toggleSidebar()} />
            </span>
          </div>
        </div>

        <div className="header-right">
          <ul className="clearfix">
            {/* <li className="icons dropdown">
              <ToggleDark />
            </li> */}
            <li className={` icons dropdown ${Toggle ? "show" : ""}`}>
              <div
                className="user-img c-pointer position-relative"
                data-toggle="dropdown"
                onClick={() => setsetToggle(!Toggle)}
              >
                <img src={profileImage} alt="" />
                <span className="pro-user-name ml-1">
                  {userdetails?.name} <i className="mdi mdi-chevron-down" />
                </span>
              </div>
              <div
                className={`drop-down dropdown-profile animated fadeIn dropdown-menu ${
                  Toggle ? "show" : ""
                }`}
              >
                <div className="dropdown-content-body">
                  <ul>
                    <li>
                      <h6 className="text-overflow m-0">
                        {" "}
                        <marquee> Welcome ! {userdetails?.name} </marquee>{" "}
                      </h6>
                    </li>
                    <li>
                      <PagesIndex.Link to="/admin/user/profile">
                        <i className="icon-user" /> <span>My Account</span>
                      </PagesIndex.Link>
                    </li>

                    <hr className="my-2" />

                    <li>
                      <PagesIndex.Link href="#" onClick={() => handleLogout()}>
                        <i className="fa fa-sign-out" /> <span>Logout</span>
                      </PagesIndex.Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
