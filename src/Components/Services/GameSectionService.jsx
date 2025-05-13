import axios from "axios";
import { Api } from "../Config/Api";

import dataservice, { BASE_URL } from "../Config/DataService";
import { header } from "../Config/Header";

// ---------------    FOR  STARLINE AND JACPOT  PROVIDERS  ---------------------
export const STARLINE_AND_JACKPOT_GAME_PROVIDERS_LIST_API = async (
  api_Route,
  token
) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE__AND_JACKPOT_GAME_PROVIDER_ADD_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE__AND_JACKPOT_GAME_PROVIDERS_GET_BY_ID_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE__AND_JACKPOT_GAME_PROVIDER_UPDATE_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.patch(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE__AND_JACKPOT_GAME_PROVIDERS_DELETE_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}${api_Route}?providerId=${data}`,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

// ---------------FOR_STARLINE_AND_JACPOT_LIST  ---------------------

// ---------------    FOR  STARLINE AND JACPOT  PROVIDERS  ---------------------
export const STARLINE_AND_JACKPOT_GAME_RATE_LIST_API = async (
  api_Route,
  token
) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE__AND_JACKPOT_GAME_RATE_ADD_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE__AND_JACKPOT_GAME_RATE_GET_BY_ID_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE__AND_JACKPOT_GAME_RATE_UPDATE_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.put(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE__AND_JACKPOT_GAME_RATE_DELETE_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}${api_Route}?gameRateId=${data}`,
      {
        headers: header(token),
        // data: data, // Pass the payload here
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

// ---------------FOR_STARLINE_AND_JACPOT_LIST  ---------------------

// --------------------  for main game rate list ------------------------
//GAME RATES API
export const GAME_RATES_GET_LIST_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.MAIN_GAME_RATE_LIST}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_RATES_ADD_API = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.MAIN_GAME_RATE_ADD}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_RATES_UPDATE_API = async (data, token) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}${Api.MAIN_GAME_RATE_UPDATE}`,
      data,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_RATES_DELETE_API = async (id, token) => {
  try {
    let apiData = {
      userId: id,
    };

    const res = await axios.delete(`${BASE_URL}${Api.MAIN_GAME_RATE_REMOVE}`, {
      data: apiData,
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

// --------------------  for main game rate list ------------------------

// ---------------FOR_STARLINE_AND_JACPOT_LIST  ---------------------
export const FOR_STARLINE_AND_JACPOT_LIST_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const FOR_STARLINE_AND_JACPOT_PROVIDER_LIST_API = async (
  api_Route,
  token
) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const FOR_STARLINE_AND_JACPOT_ADD_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const FOR_STARLINE_AND_JACPOT_UPDATE_GAME_SETTING_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const FOR_STARLINE_AND_JACPOT_UPDATE_ONE_GAME_SETTING_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.patch(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

// ---------------FOR_STARLINE_AND_JACPOT_LIST  ---------------------

// --------------- ALL GAMES  RESULT   ---------------------
export const ALL_GAME_RESULTS = async (api_Route, token) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const ALL_GAME_RESULTS_ADD_API = async (api_Route, data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const ALL_GAME_PAST_RESULTS = async (api_Route, data, token) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}?date=${data}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const ALL_GAME_WINNER_LIST_API = async (api_Route, data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE_GAME_DISTIBUTE_FUND_WINNERS_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const REMOVE_WINNER_LIST = async (api_Route, data, token) => {
  try {
    const res = await axios.delete(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const REMOVE_WINNER_LIST123 = async (api_Route, data, token) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}${api_Route}`,
      { data: data },
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};
// export const FOR_STARLINE_AND_JACPOT_UPDATE_ONE_GAME_SETTING_API = async (
//   api_Route,
//   data,
//   token
// ) => {
//   try {
//     const res = await axios.patch(`${BASE_URL}${api_Route}`, data, {
//       headers: header(token),
//     });
//     return res?.data;
//   } catch (error) {
//     return error;
//   }
// };

// ---------------FOR_STARLINE_AND_JACPOT_LIST  ---------------------

// ---------------FOR ALL GAME REVERT PAYMENT  ---------------------

export const ALL_GAME_REVERT_PAYMENT_API = async (api_Route, token) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
export const ALL_GAME_REVERT_PAYMENT_BACKDATE_API = async (api_Route, token) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE_GAME_CONFIRM_REVERT_PAYMENT_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

// ---------------FOR ALL GAME REVERT PAYMENT  ---------------------

// ---------------FOR ALL GAME  PROFIT/LOSS  ---------------------

export const ALL_GAME_PROFIT_LOSS_API = async (api_Route, token) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE_GAME_PROFIT_LOSS_LIST_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE_GAME_PROFIT_LOSS_BID_DATA_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
// ---------------FOR ALL GAME PROFIT/LOSS  ---------------------

// ---------------FOR ALL GAME REFUND PAYMENT  ---------------------

export const ALL_GAME_REFUND_PAYMENT_API = async (api_Route, token) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

// export const STARLINE_GAME_CONFIRM_REVERT_PAYMENT_API = async (
//   api_Route,
//   data,
//   token
// ) => {
//   try {
//     const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
//       headers: header(token),
//     });
//     return res?.data;
//   } catch (error) {
//     return error;
//   }
// };
// ---------------FOR ALL GAME REFUND PAYMENT  ---------------------
