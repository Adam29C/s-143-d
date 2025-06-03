import axios from "axios";
import { Api } from "../Config/Api";
import { header } from "../Config/Header";
import dataservice, { BASE_URL } from "../Config/DataService";

export const ADMIN_PROFILE_GET_API = async (id) => {
  try {
    const res = await axios.get(`${Api.ADMIN_PROFILE_GET}?adminId=${id}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

// -------------------------- DASHBOARD_COUNT ------------------------

// GET_DASHBOARD_COUNT

export const GET_DASHBOARD_COUNT_API = async (id, token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.GET_DASHBOARD_COUNT}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GET_DASHBOARD_COUNT_UPI_PAYMENT_API = async (token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.GET_DASHBOARD_COUNT_UPI_PAYMENT}`,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const APPLICATION_UPDATE_COUNT_USERS_API = async (token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}${Api.APPLICATION_UPDATE_COUNT_USERS}`,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};
export const GET_APPLICATION_UPDATE_COUNT_USERS_API = async (data, token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}${Api.APPLICATION_UPDATE_COUNT_USERS}${data}`,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

// -------------------------- DASHBOARD_COUNT ------------------------

// --------------------------   USERS CRUD ------------------------

export const USERS_LIST_API = async (request, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.USERS_LIST}`, request, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const BLOCK_USER = async (ID) => {
  try {
    const res = await axios.put(Api.USERS_LIST, ID, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
export const DELETE_USER = async (ID) => {
  let apiData = {
    adminId: ID.adminId,
    userId: ID.deleteId,
    reason: ID.reason,
  };
  try {
    const res = await axios.delete(
      Api.USERS_LIST,
      { data: apiData },
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GET_USERS_IDEAS = async (id) => {
  try {
    const res = await axios.get(`${Api.USERS_IDEAS}?adminId=${id}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
export const GET_DELETED_USERS = async (id) => {
  try {
    const res = await axios.get(`${Api.DELETED_USERS}?adminId=${id}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
// --------------------------   USERS CRUD ------------------------

// -------------------------- DELETED USERS ------------------------

export const GET_DELETED_USERS_API = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.GET_DELETED_USERS}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const DELETED_USERS_GET_TIMEHISTORY_API = async (token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}${Api.DELETED_USER_GET_TIMEHISTORY}`,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const DELETED_USERS_TIMEHISTORY_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.DELETED_USER_TIMEHISTORY}`,
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

// -------------------------- DELETED USERS ------------------------

// --------------------------   USERS CRUD ------------------------

// --------------------------  game provider api ------------------

export const GAME_PROVIDER_GET_LIST_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.MAIN_GAME}`, {
      headers: header(token),
    });

    return res?.data;
  } catch (error) {
    return error;
  }
};
export const GAME_PROVIDER_GET_LIST_API1 = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.MAIN_GAME121}`, {
      headers: header(token),
    });

    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_PROVIDER_ADD_API = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.MAIN_GAME_ADD}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_PROVIDER_DELETE_API = async (id, token) => {
  try {
    let apiData = {
      gameId: id,
    };
    const res = await axios.delete(`${BASE_URL}${Api.MAIN_GAME}`, {
      headers: header(token),
      data: apiData,
    });

    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_PROVIDER_UPDATE_API = async (data, token) => {
  try {
    const res = await axios.patch(`${BASE_URL}${Api.MAIN_GAME}`, data, {
      headers: header(token),
    });

    return res?.data;
  } catch (error) {
    return error;
  }
};

// --------------------------  game provider api ------------------------
// --------------------------   super admin provider api ------------------------

// --------------------------   GAME SETTING CRUD ------------------------

export const GAME_SEETING_LIST_API = async (data, token) => {
  try {
    const { userId, gameType } = data;
    const res = await axios.get(`${BASE_URL}${Api.ADMIN_GAME_SETTING}`, {
      headers: header(token),
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const GAME_SETTING_ADD = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.ADMIN_GAME_SETTING_ADD}`,
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

export const GAME_SETTING_UPDATE_API = async (data, token) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}${Api.ADMIN_GAME_SETTING}`,
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

export const GAME_SETTING_UPDATEALL_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.ADMIN_GAME_SETTING_UPDATEALL}`,
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

// --------------------------   GAME SETTING CRUD ------------------------

// --------------------------   GAME RESULT CRUD ------------------------

export const GAME_RESULT = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.ADMIN_GAME_RESULT}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const ADD_GAME_RESULT = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.ADMIN_GAME_RESULT}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_RESULT_DELETE = async (data, token) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}${Api.ADMIN_GAME_RESULT_DELETE}`,
      {
        data: data,
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_RESULT_DATEWISE = async (req, token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}${Api.GET_GAME_RESULT_WITH_DATE}?date=${req}`,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_REMAINING_WINNER_LIST_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.GET_REMAINING_WINNER_LIST}`,
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

// GET_MAIN_WINNER_LIST

export const GAME_MAIN_WINNER_LIST_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.GET_MAIN_WINNER_LIST}`,
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

// --------------------------   GAME RESULT CRUD ------------------------

// --------------------------   GAME SETTING CRUD ------------------------

// -------------------------- APP_SETTINGS ------------------------

//HTP LIST START
export const GET_HTP_LIST_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.HOW_TO_PLAY_GET_LIST}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const UPDATE_HTP_API = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.UPDATE_HTP}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

//HTP LIST END

//VERSION CONTROL API START
export const GET_VERSION_API = async (token) => {
  try {
    const res = await axios.get(
      `
      ${BASE_URL}${Api.GET_VERSION}
      `,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const UPDATE_VERSION_API = async (formData, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.UPDATE_VERSION}`, formData, {
      // headers: header(token),
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
//VERSION CONTROL API END

//WALLET CONTACT API START
export const GET_WALLET_CONTACT_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.WALLET_CONTACT_LIST}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GET_WALLET_HEADLINE_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.WALLET_HEADLINE_LIST}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GET_WALLET_UPI_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.WALLET_UPI_LIST}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const UPDATE_WALLET_CONTACT_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.UPDATE_WALLET_CONTACT}`,
      data,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error?.response;
  }
};
export const UPDATE_WALLET_HEADLINE_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.UPDATE_WALLET_HEADLINE}`,
      data,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error?.response;
  }
};
export const UPDATE_WALLET_UPI_API = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.UPDATE_WALLET_UPI}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error?.response;
  }
};

//WALLET CONTACT API END

//NOTICE BOARD API START
export const GET_NOTICE_BOARD_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.NOTICE_BOARD_LIST}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const UPDATE_NOTICE_BOARD_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.UPDATE_NOTICE_BOARD}`,
      data,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    // console.log(error.response)
    return error?.response;
  }
};
//NOTICE BOARD API END

//APP WITHDRAW API START
export const GET_APP_WITHDRAW_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.GET_WITHDRAW_SCREEN}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const UPDATE_APP_WITHDRAW_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.UPDATE_WITHDRAW_SCREEN}`,
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
//APP WITHDRAW API END

// PROFILE NOTE GET AND UPDATE API START
export const GET_PROFILE_NOTE_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.GET_PROFILE_NOTE}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const UPDATE_PROFILE_NOTE_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.UPDATE_PROFILE_NOTE}`,
      data,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error?.response;
  }
};
// PROFILE NOTE GET AND UPDATE API END

// -------------------------- APP_SETTINGS ------------------------

// -------------------------- MASTERS ------------------------
//UPI LIST START
export const GET_UPI_LIST_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.GET_UPI_LIST}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const BLOCK_UPI_LIST_API = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.BLOCK_UPI_LIST}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
export const ADD_UPI_LIST_API = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.ADD_UPI_LIST}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
export const DELETE_UPI_LIST_API = async (apidata, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.DELETE_UPI_LIST}`, apidata, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

//UPI LIST END

// FUND MODE START
export const GET_MANUALFUND_MODE_API = async (token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}${Api.GET_FUND_MODE}?transactionType=manual`,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};
// FUND MODE START
export const GET_GATWAYFUND_MODE_API = async (token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}${Api.GET_FUND_MODE}?transactionType=gatway`,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const ADD_FUND_MODE_API = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.ADD_FUND_MODE}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const DELETE_FUND_MODE_API = async (apidata, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.DELETE_FUND_MODE}`,
      apidata,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};
// CHANGE_STATUS_FUND_MODE
export const CHANGE_STATUS_FUND_MODE_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.CHANGE_STATUS_FUND_MODE}`,
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
// FUND MODE END

// -------------------------- MASTERS ------------------------

// --------------------------   Employee Crud ------------------------

export const EMPLOYEE_CHANGE_PASSWORD_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.EMPLOYEE_CHANGE_PASSWORD}`,
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

export const CREATE_EMPLOYEE = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.CREATE_EMPLOYEE}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
export const UPDATE_EMPLOYEE = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.UPDATE_EMPLOYEE}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const EMPLOYEE_GET_LIST_API = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.EMPLOYEE_LIST}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const BLOCK_EMPLOYEE_API = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.BLOCK_EMPLOYEE}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const DELETE_EMPLOYEE = async (id, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.DELETE_EMPLOYEE}`, id, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const SINGLE_EMPLOYEE_GET_LIST_API = async (id, token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}${Api.SINGLE_EMPLOYEE_LIST}/${id}`,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

// ----------------------------------  WALLET ---------------------------------------------------

// -----------------  REQUEST ON OFF SECTION -------------------------------

export const REQUEST_LIST_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.REQUEST_LIST}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
// --------------------------   Employee Crud ------------------------

// --------------------------   GET_CREDIT_REQUEST_UPI ------------------------

export const GET_CREDIT_REQUEST_UPI_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.GET_CREDIT_REQUEST_UPI}`,
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

export const REQUEST_LIST_UPDATE_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.REQUEST_LIST_UPDATE}`,
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

export const GET_REQUEST_LIST_API = async (token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}${Api.GET_REQUEST_LIST}`,

      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};
// --------------------------   GET_CREDIT_REQUEST_UPI ------------------------

// --------------------------  GET_DECLINED_REQUEST ---------------------------

export const GET_DECLINED_REQUEST_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.GET_DECLINED_REQUEST}`,
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

export const UPDATE_REQUEST_API = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.UPDATE_REQUEST}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
// --------------------------  GET_DECLINED_REQUEST------------------------

// --------------------------APPROVED DEBIT REQUEST------------------------
export const APPROVED_DEBIT_BANK_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.APPROVED_DEBIT_BANK}`,
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

// -----------------  WALLET SECTION -------------------------------

// -----------------  WALLET SECTION -------------------------------

export const GET_WALLET_LIST = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.WALLET_LIST}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const APPROVED_DEBIT_BANK_MANUAL_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.APPROVED_DEBIT_BANK_MANUAL}`,
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

export const WALLET_LIST_HISTORY_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.WALLET_LIST_HISTORY}`,
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

export const WALLET_LIST_CREDIT_API = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.WALLET_LIST_CREDIT}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const WALLET_LIST_USER_PROFILE_API = async (id, token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}${Api.WALLET_LIST_USER_PROFILE}?userId=${id}`,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};
export const WALLET_LIST_UPDATE_WALLET_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.WALLET_LIST_UPDATE_WALLET}`,
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

// -----------------  WALLET SECTION -------------------------------

// ----------------- FUND REQUEST -------------------------------

export const FUND_REQUEST_LIST_API = async (data, token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}${Api.GET_FUND_REQUEST}?status=${data}`,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

// FUND REQUEST APPROVED_FUND_REQUEST

export const APPROVED_FUND_REQUEST_API = async (data, token) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}${Api.APPROVED_FUND_REQUEST}`,
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

// FUND REQUEST DECLINED_FUND_REQUEST
export const DECLINED_FUND_REQUEST_API = async (data, token) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}${Api.DECLINED_FUND_REQUEST}`,
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

// -----------------  FUND REQUEST -------------------------------

// ----------------- WALLET EXPORT DEBIT REPORT -------------------------------
//GET_EXPORT_DEBIT_REPORT
export const GET_EXPORT_DEBIT_REPORT_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.GET_EXPORT_DEBIT_REPORT}`,
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

export const EXPORT_DEBIT_SEE_TODAY_REPORT_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.EXPORT_DEBIT_TODAY_APPROVED_REPORT}`,
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

//GET_EXPORT_DEBIT_REPORT
export const EXPORT_DEBIT_APPROVE_ALL_REQUEST_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.APPROVE_EXPORT_DEBIT_REPORT}`,
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

export const EXPORT_DEBIT_GET_REPORT_API = async (data, token, endpoint) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.GET_EXPORT_DEBIT_REPORT}/${endpoint}`,
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

export const EXPORT_MKXLS_FILE_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.GET_EXPORT_DEBIT_REPORT}/mkxls`,
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

// EXPORT_DEBIT_DECLINE_REPORT

export const EXPORT_DEBIT_DECLINE_REPORT_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.EXPORT_DEBIT_DECLINE_REPORT}`,
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

// ---------------------WALLET EXPORT DEBIT REPORT-------------------------------

// ---------------------GET_WALLET_INVOICE_PROFILE_CHANGE-------------------------------

export const GET_WALLET_INVOICE_PROFILE_CHANGE_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.GET_WALLET_INVOICE_PROFILE_CHANGE}`,
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

// ---------------------GET_WALLET_INVOICE_PROFILE_CHANGE-------------------------------

// ---------------------WALLET_GET_SEARCH_DETAILS-------------------------------

export const WALLET_GET_SEARCH_DETAILS_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.WALLET_GET_SEARCH_DETAILS}`,
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

// ---------------------WALLET_GET_SEARCH_DETAILS-------------------------------

// ---------------------WALLET_DOWNLOAD_DEBIT_REPORT-------------------------------

export const WALLET_DOWNLOAD_DEBIT_REPORT_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.WALLET_DOWNLOAD_DEBIT_REPORT}`,
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

// ---------------------WALLET_DOWNLOAD_DEBIT_REPORT-------------------------------

// --------------------------APPROVED DEBIT REQUEST------------------------

// --------------------------PENDING_DEBIT_BANK_REQUEST------------------------

export const PENDING_DEBIT_BANK_REQUEST_API = async (data, token) => {
  try {
    const res = await dataservice.post(
      `${BASE_URL}${Api.PENDING_DEBIT_BANK_REQUEST}`,
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

export const PENDING_DEBIT_GET_BALANCE_API = async (data, token) => {
  try {
    const res = await dataservice.post(
      `${BASE_URL}${Api.PENDING_DEBIT_GET_BALANCE}`,
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

export const PENDING_DEBIT_UPDATE_WALLET_API = async (data, token) => {
  try {
    const res = await dataservice.post(
      `${BASE_URL}${Api.PENDING_DEBIT_UPDATE_WALLET}`,
      data,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error?.response;
  }
};

export const PENDING_DEBIT_DECLINE_API = async (data, token) => {
  try {
    const res = await dataservice.patch(
      `${BASE_URL}${Api.PENDING_DEBIT_DECLINE}`,
      data,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error?.response;
  }
};

export const PENDING_DEBIT_GETPROFILE_API = async (id, token) => {
  try {
    const res = await dataservice.get(
      `${BASE_URL}${Api.PENDING_DEBIT_GETPROFILE}?userId=${id}`,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error?.response;
  }
};

// --------------------------PENDING_DEBIT_BANK_REQUEST------------------------

// --------------------------USER PROFILE APIS------------------------
export const UPDATE_USER_PASSWORD_API = async (data, token) => {
  try {
    const res = await dataservice.post(
      `${BASE_URL}${Api.USER_PROFILE_UPDATE_PASSWORD}`,
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

export const USER_PROFILE_GET_LIST = async (token) => {
  try {
    const res = await dataservice.get(
      `${BASE_URL}${Api.USER_PROFILE_GET_LIST}`,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};
export const USER_PROFILE_BLOCK_API = async (data, token) => {
  try {
    const res = await dataservice.post(
      `${BASE_URL}${Api.USER_PROFILE_BLOCK}`,
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

// --------------------------USER PROFILE APIS------------------------

export const SHOW_PAYMENT_HISTORY_API = async (data, token) => {
  try {
    const res = await dataservice.get(
      `${BASE_URL}${Api.SHOW_PAYMENT_HISTORY}?status=${data}`,
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

// ---------------------GATWAY PAYTMNET ------------------------------

// ----------------- FUND REQUEST -------------------------------

export const GATWAY_PAYMENT_LIST = async (data, token) => {
  try {
    const res = await axios.get(
      // `http://192.168.1.8:6999/fundreq/get-payout-requests?status=${data}`,
      // `https://connect.rich143.com/fundreq/get-payout-requests?status=${data}`,
      `${BASE_URL}${data}`,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GATWAY_PAYMENT_DEPOSITE_OR_DECLINED = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.GATWAYPAYMENTAPPROVE}`,
      data,
      {
        headers: header(token),
      }
    );

    console.log("res", res);

    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GATWAY_PAYMENT_DEPOSITE_OR_DECLINED123 = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.PROCESSINGGATWAYPAYMENTAPPROVE}`,
      data,
      {
        headers: header(token),
      }
    );

    console.log("res", res);

    return res?.data;
  } catch (error) {
    return error;
  }
};

// manage gatyways

// FUND MODE START
export const GET_GATWAYSLIST_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.ALLPAYMENTGATWAYLIST}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const ADD_GATWAY_API = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.CREATEPAYMENTGATWAY}`,
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

export const UPDATE_GATWAY_API = async (data, token) => {
  try {
    const res = await axios.put(
      `${BASE_URL}${Api.CREATEPAYMENTGATWAY}/${data}`,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const DELETE_GATWAY_API = async (apidata, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.DELETE_FUND_MODE}`,
      apidata,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};
// CHANGE_STATUS_FUND_MODE
export const CHANGE_STATUS_GATWAY_API = async (data, token) => {
  try {
    const res = await axios.put(`${BASE_URL}${Api.ACTIViACTIVE}/${data}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

// CHANGE_STATUS_FUND_MODE
export const GET_STATUS = async (data, token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.GETSTATUS}/${data}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

// UPDATE TOGGLE FEATURE
export const UPDATE_TOGGLE_FEATURE = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.UPDATE_TOGGLE_FEATURE}`,
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
