import axios from "axios";
import { Api } from "../Config/Api";
import { BASE_URL } from "../Config/DataService";

export const LOGIN_API = async (data, ) => {

    try {
      const res = await axios.post(`${BASE_URL}${Api.LOGIN}`,data, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
  
      return res?.data;
    } catch (error) {
      
     return error.response.data
    }
  };
  