// import React from "react";
// import PagesIndex from "../../PagesIndex";
// // import { show } from "../../../Utils/Common_Date";

// const UsersIdeas = () => {
//   const token = localStorage.getItem("token");

//   const [Refresh, setRefresh] = PagesIndex.useState(false);

//   const fetchData = async (page, rowsPerPage, searchQuery) => {
//     const payload = {
//       page: page,
//       limit: rowsPerPage,
//       search: searchQuery,
//     };

//     try {
//       const response = await PagesIndex.common_services.GET_USERS_IDEAS(
//         payload,
//         token
//       );
//       const totalRows = response?.recordsTotal || 5;
//       let mainRes = response.data;

//       return { mainRes, totalRows };
//     } catch {}
//   };
//   PagesIndex.useEffect(() => {
//     fetchData();
//   }, []);

//   const visibleFields = [
//     {
//       name: "Idea",
//       value: "idea",
//       sortable: false,
//     },
//     {
//       name: "User Name",
//       value: "username",
//       sortable: true,
//     },
//     {
//       name: "Created-At",
//       value: "createdAt",
//       sortable: true,
//     },
//     {
//       name: "test",
//       value: "username",
//       isButton: true,
//       // value: (row) => (row.banned ? "Unblock" : "Block"),
//       buttonColor: (row) => (row.banned ? "success" : "danger"),
//       Conditions: (row) => {
//         // BlockUserAndRemoveUser(row, 1);
//       },
//     },
//   ];

//   return (
//     <PagesIndex.Main_Containt add_button={false} title="Users Idea's">
//       <PagesIndex.TableWithCustomPeginationNew
//         fetchData={fetchData}
//         columns={visibleFields}
//         // UserFullButtonList={UserFullButtonList}
//         showIndex={true}
//         Refresh={Refresh}
//       />
//     </PagesIndex.Main_Containt>
//   );
// };

// export default UsersIdeas;

// import React, { useState } from "react";

// const TimePicker = () => {
//   const [time, setTime] = useState("");

//   const handleChange = (e) => {
//     setTime(e.target.value);
//   };

//   const format12Hour = (time) => {
//     if (!time) return "";
//     let [hour, minute] = time.split(":");
//     hour = parseInt(hour);
//     const ampm = hour >= 12 ? "PM" : "AM";
//     hour = hour % 12 || 12;
//     return `${hour}:${minute} ${ampm}`;
//   };

//   return (
//     <div>
//       <label>Select Time (24hr input):</label><br />
//       <input type="time" value={time} onChange={handleChange} />
//       <p>12-Hour Format: {format12Hour(time)}</p>
//     </div>
//   );
// };

// export default TimePicker;

import React, { useState } from "react";

const CustomTimePicker = () => {
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmPm] = useState("AM");

  const handleHourChange = (e) => setHour(e.target.value);
  const handleMinuteChange = (e) => setMinute(e.target.value);
  const handleAmPmChange = (e) => setAmPm(e.target.value);

  return (
    <>
      <div className="col-lg-6 d-flex">
        <div className="d-flex gap-2 mb-3 form-control">
          {/* Hour */}
          <select value={hour} onChange={handleHourChange} className="testing">
            {[...Array(12)].map((_, i) => {
              const val = (i + 1).toString().padStart(2, "0");
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
          <select
            value={minute}
            onChange={handleMinuteChange}
            className="testing"
          >
            {[...Array(51)].map((_, i) => {
              const val = i.toString().padStart(2, "0");
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
          <select value={ampm} onChange={handleAmPmChange} className="testing">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        {/* <label className="form-label fw-semibold mb-2">Select Time:</label>

        <div className="alert alert-light p-2 mb-0">
          Selected Time: <strong>{`${hour}:${minute} ${ampm}`}</strong>
        </div> */}
      </div>
    </>
  );
};

export default CustomTimePicker;
