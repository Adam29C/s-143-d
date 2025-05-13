import axios from "axios";
import { BASE_URL } from "../Config/DataService";
import { header } from "../Config/Header";
// --------------- ALL GAMES  RESULT   ---------------------
export const ALL_GAME_REPORT_API = async (api_Route, data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const JACKPOT_BIDS_REPORT_API = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      // const res = await axios.post(
      //   `${BASE_URL}abTotalBid/andarBaharBidsData`,
      //   data,
      //   {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GET_REPORT_DETAILS_API = async (api_Route, token) => {
  // console.log("api_Route", api_Route);

  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GET_FUND_REPORT_API = async (api_Route, data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
