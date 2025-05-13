// export const Headers = () => {
//   let token = localStorage.getItem("token");

//   const header = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };
//   return header;
// };

export const header = (token) => {
  // let token = localStorage.getItem("token")

  const header = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return header;
};
