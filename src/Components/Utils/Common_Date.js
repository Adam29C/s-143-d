import moment from "moment";
// import Holidays from "date-holidays"
import dateTime from "node-datetime";
import { format, formatDistanceToNow } from "date-fns";
// ----------------------------------------------------------------------

export const show = (cell) => {
  return moment(cell).format("DD MMM YYYY hh:mm A");
};

export function Get_Year_Only(date) {
  return format(new Date(date), "dd MMMM yyyy");
}

export function Get_Year_With_Time(date) {
  return format(new Date(date), "dd MMM yyyy HH:mm:ss");
}

export function Get_Year_With_Time_With_Column_Saprate(date) {
  return format(new Date(date), "dd:MM:yyyy hh:mm:ss a");
}
export function Get_Year_with_Dash_Sparate(date) {
  return format(new Date(date), "yyyy-MM-dd");
}
export function Get_Year_with_Slash_Sparate(date) {
  return format(new Date(date), "dd/MM/yyyy");
}

export function Get_Year_Month_with_String(date) {
  // like - 2024-Jun-19
  return format(new Date(date), "yyyy-MMM-dd");
}

export function get_year_and_month_only(date) {
  // like - 2024-06
  return format(new Date(date), "yyyy-MM");
}

export function get_Time_From_Unix_Dete_string(date) {
  return moment.unix(date).format("DD MMM hh:mm A");
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export const getActualDateFormate = (d) => {
  const today = new Date(d);
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${month}-${day}-${year}`;
};

export const abc = (d) => {
  const today = new Date(d);
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};

export const getActualDateWithFormat = (d) => {
  const today = new Date(d);
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${month}/${day}/${year}`;
};

export const today = (d) => {
  // Validate karein ki `d` valid date hai ya nahi
  let abc = new Date(d);
  if (isNaN(abc.getTime())) {
    abc = new Date(); // Agar `d` invalid hai, toh current date lein
  }

  let month = abc.getMonth() + 1;
  let date = abc.getDate();
  let year = abc.getFullYear();

  // Format karein date ko MM/DD/YYYY
  let full = `${month < 10 ? "0" + month : month}/${
    date < 10 ? "0" + date : date
  }/${year}`;

  return full;
};

export const convert_string_to_month = (expiry) => {
  const day_expiry = expiry.substring(0, 2);
  const moth_str = expiry.substring(2, 4);
  const year_expiry = expiry.substring(4);

  let month_string;
  if (moth_str === "01") {
    month_string = "JAN";
  } else if (moth_str === "02") {
    month_string = "FEB";
  } else if (moth_str === "03") {
    month_string = "MAR";
  } else if (moth_str === "04") {
    month_string = "APR";
  } else if (moth_str === "05") {
    month_string = "MAY";
  } else if (moth_str === "06") {
    month_string = "JUN";
  } else if (moth_str === "07") {
    month_string = "JUL";
  } else if (moth_str === "08") {
    month_string = "AUG";
  } else if (moth_str === "09") {
    month_string = "SEP";
  } else if (moth_str === "10") {
    month_string = "OCT";
  } else if (moth_str === "11") {
    month_string = "NOV";
  } else if (moth_str === "12") {
    month_string = "DEC";
  }

  return `${day_expiry}${month_string}${year_expiry}`;
};

export const isForeignUserAllowedToLogin = (userCountry, userLocalTime) => {
  const isForeignUser = userCountry !== "IN";

  // Convert the user's local time to Indian Standard Time (IST)
  const convertedISTTime = new Date(
    userLocalTime.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  // Get the hours in IST
  const hoursInIST = convertedISTTime.getHours();

  // Check if the user is trying to log in between 8 AM and 11 PM IST
  const isLoginTimeValid = hoursInIST >= 8 && hoursInIST < 23;

  // Return true if it's a foreign user and the login time is valid, otherwise return false
  return isForeignUser && isLoginTimeValid;
};

export const dateFormate = (date) => {
  const dt = dateTime.create(date);
  const ccdate = dt.format("Y-m-d");
  return ccdate;
};

export const convertTo12HourFormat = (time123) => {
  let [time, modifier] = time123.split(" ");
  let [hours, minutes] = time.split(":");

  hours = parseInt(hours);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  // Add leading zero if needed
  let formattedHours = hours.toString().padStart(2, "0");
  return `${formattedHours}:${minutes}`;
};

export const convertTo12HourFormat123 = (timeStr) => {
  let [hours, minutes] = timeStr.split(":");
  hours = parseInt(hours); // Convert hours to integer
  let period = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12; // Handle midnight case (00:00)
  }

  // Ensure the hour is always two digits
  hours = hours < 10 ? `0${hours}` : hours;

  return `${hours}:${minutes} ${period}`;
};
