import { jwtDecode } from "jwt-decode";

// export const GetExpired = (tokenExpiry, navigate) => {
// const decoded = jwtDecode(tokenExpiry && tokenExpiry);

// if (decoded.exp < parseInt(Date.now() / 1000)) {
//   // navigate("/tokenexpiry", { replace: true });
//   navigate("/", { replace: true });
//   localStorage.removeItem("token");
//   localStorage.removeItem("userdetails");
//   // setTimeout(() => {
//   // }, 1000);
// } else {
//   return "not Expired";
// }


export const GetExpired = (tokenExpiry, navigate) => {
  let alertShown = false; // Alert ek baar dikhane ke liye flag
  let interval = setInterval(() => {
    let now = new Date();

    console.log("now.getHours()", now.getHours());
    console.log("now.getMinutes()", now.getMinutes());

    if (now.getHours() === 11 && now.getMinutes() === 36) {
      if (!alertShown) {
        alert("Your Session Expired. Please Login Again.");
        alertShown = true; // Alert ek baar dikhane ke baad flag true ho jayega
      }

      localStorage.removeItem("token");
      localStorage.removeItem("userdetails");
      navigate("/", { replace: true });

      clearInterval(interval); // ⬅️ Interval ko stop kar diya
    }
  }, 1000);
};
