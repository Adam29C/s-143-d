import React, { useState } from "react";
import PagesIndex from "../../PagesIndex";

const TeamMets = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");
  const userdetails = JSON.parse(localStorage.getItem("userdetails"));

  //all state
  const [data, setData] = useState([]);

  const getUserList = async () => {
    const res = await PagesIndex.admin_services.USER_PROFILE_GET_LIST(token);
    if (res?.status) {
      setData(res?.data);
    }
  };

  PagesIndex.useEffect(() => {
    getUserList();
  }, []);

  const handleBlockEmployee = async (id, isBlock) => {
    try {
      let apidata = {
        adminId: id,
        isBlock: !isBlock,
        status: isBlock === 1 ? 0 : 1,
      };
      const res = await PagesIndex.admin_services.USER_PROFILE_BLOCK_API(
        apidata,
        token
      );
      if (res?.status) {
        PagesIndex.toast.success(res?.message);
        getUserList();
      } else {
        PagesIndex.toast.error(res?.message);
      }
    } catch (error) {
      PagesIndex.toast.error(error);
    }
  };

  return (
    <div className="card">
      {userdetails.role === 0 && (
        <div className="card-body">
          <h3 className="card-title-text text-center fw-bold">
            Star143 Games Team Members
          </h3>
          {data &&
            data?.map((row) => (
              <div>
                <div className="main-user-profile-list">
                  <div className="user-profile-list-first">
                    {" "}
                    <img
                      className="circle-rounded"
                      src={PagesIndex.empLogo}
                      width={90}
                      height={50}
                      alt="Logo"
                    />
                    <div className="">
                      <h5 className="fw-bold">{row?.name}</h5>
                      <p>{row?.username}</p>
                    </div>
                  </div>

                  <div>
                    {" "}
                    <button
                      type="button"
                      onClick={() => handleBlockEmployee(row?._id, row?.banned)}
                      class={`btn ${
                        row?.banned === 1 ? "btn-success" : "btn-danger"
                      } `}
                    >
                      {row?.banned === 1 ? "Unblock" : "Block"}
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TeamMets;
