import * as yup from "yup";

export const Email_regex = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|ymail|rediffmail|hotmail|outlook|aol|icloud|protonmail|example)\.(com|co\.in|in|net|org|edu|gov|uk|us|info|biz|io|...)[a-zA-Z]{0,}$/;
  return emailRegex.test(email);
};

export const Name_regex = (name) => {
  const emailRegex = /^[a-zA-Z ]+$/;
  return emailRegex.test(name);
};

export const Stg_regex = (name) => {
  const StgRegex = /^[a-zA-Z ]+$/;
  return StgRegex.test(name);
};

export const Mobile_regex = (mobile) => {
  const MobileRegex = /^[0-9]{10}$/;
  return MobileRegex.test(mobile);
};
export const Password_Rejex = (mobile) => {
  const password = /^.{4,20}$/;
  return password.test(mobile);
};

export const No_Negetive_Input_regex = (mobile) => {
  const value = /^(?!0*(\.0*)?$)\d+(\.\d+)?$/;
  return value.test(mobile);
};

export const ValidYoutubeUrl = (url) => {
  // Regular expression to match a YouTube URL
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+(&[\w%=]*)?$/;

  return youtubeRegex.test(url);
};


export const Image_Regexp = (value)=>{
  if(value?.type){
    return  ["image/jpeg", "image/jpg", "image/png"].includes(value?.type);
  }else {
    let val = value?.split(".").pop().toLowerCase(); // Get the file extension
        return ["jpeg", "jpg", "png"].includes(val);
  }
  
}

export const Remove_Special_Character = (values)=>{
  const value = values.replace(/[^a-zA-Z0-9]/g, "")
  return value
}



export const Remove_Space_Character = (values)=>{
let modifiedString = values.replace(/\s+/g, '');
let resultArray = modifiedString.split(''); 
return resultArray[0]
}

export const validApkFile = (file)=>{

  if (file instanceof File) {
    return /\.apk$/i.test(file.name);
  }
  if (typeof file === 'string') {
    return /\.apk$/i.test(file);
  }
  return false;
}


export const  convertTo12HourFormat = (time)=> {
  let [hours, minutes] = time.split(':');
  hours = parseInt(hours, 10);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${hours}:${minutes}`;
}


export const numberRegexp = (value)=>{
  const regex = /^\d+(\.\d{1,2})?$/;
  return regex.test(value);
} 


// Helper function to check if the providerName is a valid time format
export const isTimeFormat = (providerName) =>{
  // Example regex to match time formats like "11:00 AM"
  const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] ?([AaPp][Mm])$/;
  return timeRegex.test(providerName);
}


export const convertTo24HourFormat = (time) => {
  const [hour, minutePart] = time.split(":");
  const [minutes, period] = [minutePart?.slice(0, 2), minutePart?.slice(3).toUpperCase()];

  let hours24 = parseInt(hour, 10);
  if (period === "PM" && hours24 !== 12) {
      hours24 += 12;
  } else if (period === "AM" && hours24 === 12) {
      hours24 = 0;
  }

  return `${String(hours24).padStart(2, "0")}:${minutes}`;
}