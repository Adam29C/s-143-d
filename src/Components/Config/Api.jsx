const Api = {
  COMMON_GENERATE_TOKEN: "common/generate-token",

  // AUTH MODULE
  LOGIN: "adminLogin/loginDashboard",

  //PERMISSION API
  PERMISSION_API: "/adminLogin/getPermission",

  //DASHBOARD COUNT
  GET_DASHBOARD_COUNT: "dashboard/dashboardCount",
  GET_DASHBOARD_COUNT_UPI_PAYMENT: "fundReport/getBriefDeposit",
  GET_DASHBOARD_REGISTRED_USERS: "dashboard/getRegisteredUser",
  APPLICATION_UPDATE_COUNT_USERS: "allUser/checkUpdateCount",

  //USERS
  USERS_LIST: "allUser/getAllUsers",
  USER_PROFILE_GET: "/allUser/getProfile",
  BLOCK_USER: "/allUser/blockUser",
  DELETE_USER: "/allUser/deleteUserByAdmin",

  //GAME SETTING
  // ADMIN_GAME_SETTING: "/admin/game/gameSetting",
  ADMIN_GAME_SETTING: "mainGameSetting",
  ADMIN_GAME_SETTING_ADD: "mainGameSetting/insertSettings",
  ADMIN_GAME_SETTING_UPDATEALL: "mainGameSetting/updateAll",

  //MAIN GAME API'S
  MAIN_GAME: "mainGames",
  MAIN_GAME_ADD: "mainGames/insertGame",
  MAIN_GAME121: "api/web/games",

  // MAIN GAME RATE

  MAIN_GAME_RATE_LIST: "mainGameRate",
  MAIN_GAME_RATE_ADD: "mainGameRate/insertGame",
  MAIN_GAME_RATE_UPDATE: "mainGameRate",
  MAIN_GAME_RATE_REMOVE: "mainGameRate",

  // GAME RESULT
  ADMIN_GAME_RESULT: "mainGameResult",
  ADMIN_GAME_RESULT_DELETE: "mainGameResult/delete",
  GET_GAME_RESULT_WITH_DATE: "mainGameResult/pastResult",
  GET_REMAINING_WINNER_LIST: "winnerList/remaningWinnerList",
  GET_MAIN_WINNER_LIST: "winnerList/mainWinnerList",
  CONFIRM_PAYMENT_API: "winnerList/gameWinner",
  REMENAINING_CONFIRM_PAYMENT_API: "winnerList/remainingGameWinner",

  //  MAIN GAME REVERT PAYMENT -
  MAIN_GAME_REVERT_PAYMENT: "mainGameResult/revertPayment",
  MAIN_GAME_CONFIRM_REVERT_PAYMENT: "mainGameResult/paymentRevert",

  //  MAIN GAME REFUND PAYMENT -
  MAIN_GAME_GET_REFUND_LIST: "mainGameResult/refundList",
  MAIN_GAME_CONFIRM_REVERT_PAYMENT: "mainGameResult/paymentRevert",
  MAIN_GAME_CONFIRM_REVERT_PAYMENT_All: "mainGameResult/refundAll",
  // GAME PROVIDER

  STARLINE_GAME_PROVIDERS_LIST: "starGameProvider/getStarlineProvider",
  STARLINE_GAME_PROVIDER_ADD: "starGameProvider/insertStarLineProvider",
  STARLINE_GAME_PROVIDER_UPDATE: "starGameProvider/updateStarLineProvider",
  STARLINE_GAME_PROVIDERS_DELETE: "starGameProvider/deleteStarLineProvider",
  STARLINE_GAME_PROVIDERS_GET_BY_ID: "starGameProvider/starLineProviderById",

  // GAME RATE

  STARLINE_GAME_RATE_LIST: "starGameRate",
  STARLINE_GAME_RATE_ADD: "starGameRate/insertGame",
  STARLINE_GAME_RATE_UPDATE: "starGameRate/update",
  STARLINE_GAME_RATE_REMOVE: "starGameRate",

  // STARLINE GAME SETTING CRUD

  STARLINE_GAME_PROVIDERS: "starGameSetting/addSetting",
  STARLINE_GAME_SETTING_LIST: "starGameSetting",
  STARLINE_GAME_SETTING_ADD: "starGameSetting/insertSettings",
  STARLINE_GAME_SETTING_UPDATE_ALL: "starGameSetting/updateProviderSettings",
  STARLINE_GAME_SETTING_UPDATE_ONE: "starGameSetting",

  //   ADMIN_GAME_SETTING_ADD: "mainGameSetting/insertSettings",
  //   ADMIN_GAME_SETTING_UPDATEALL: "mainGameSetting/updateAll"

  //  STARLINE GAME RESULT -
  STARLINE_GAME_MAIN_RESULT: "starGameResult",
  STARLINE_GAME_MAIN_RESULT_ADD: "starGameResult",
  STARLINE_GAME_PAST_RESULT: "starGameResult/pastResult",
  STARLINE_GAME_WINNER_LIST: "starlineWinner/starLineWinnerList",
  STARLINE_GAME_DISTIBUTE_FUND_WINNERS: "starlineWinner/starWinners",
  STARLINE_REMOVE_RESULT: "starGameResult/delete",

  //  STARLINE REVERT PAYMENT -
  STARLINE_GAME_PROFIT_LOSS_LIST: "starGameProfitLoss/getResult",
  STARLINE_GAME_PROFIT_LOSS_BID_DATA: "starGameProfitLoss/getBidData",

  //  STARLINE REVERT PAYMENT -

  STARLINE_GAME_REVERT_PAYMENT: "starGameResult/revertPayment",
  STARLINE_GAME_CONFIRM_REVERT_PAYMENT: "starGameResult/paymentRevert",

  //  STARLINE REVERT PAYMENT -
  STARLINE_GAME_REFUND_PAYMENT: "starGameResult/refundList",
  STARLINE_GAME_CONFIRM_REFUND_PAYMENT_: "starGameResult/refundAll",

  // JACKPOT GAME PROVIDER CRUD
  JACKPOT_GAME_PROVIDER_LIST: "abGameSetting",
  JACKPOT_GAME_PROVIDER_ADD: "abGameProvider/insertGame",
  JACKPOT_GAME_PROVIDER_UPDATE: "abGameProvider",
  JACKPOT_GAME_PROVIDERS_DELETE: "abGameProvider",

  // JACKPOT GAME SETTING CRUD
  JACKPOT_GAME_PROVIDERS: "abGameSetting/addSetting",
  JACKPOT_GAME_SETTING_LIST: "abGameSetting",
  JACKPOT_GAME_SETTING_ADD: "abGameSetting/insertSettings",
  JACKPOT_GAME_SETTING_UPDATE_ALL: "abGameSetting/updateProviderSettings",
  JACKPOT_GAME_SETTING_UPDATE_ONE: "abGameSetting",

  // JACKPOT GAME RATE
  JACKPOT_GAME_RATE_LIST: "abGameRate",
  JACKPOT_GAME_RATE_ADD: "abGameRate/insertGame",
  JACKPOT_GAME_RATE_UPDATE: "abGameRate/update",
  JACKPOT_GAME_RATE_REMOVE: "abGameRate",

  JACKPOT_GAME_MAIN_RESULT: "abGameResult",
  JACKPOT_GAME_MAIN_RESULT_ADD: "abGameResult",
  JACKPOT_GAME_PAST_RESULT: "abGameResult/pastResult",
  JACKPOT_GAME_WINNER_LIST: "abWinner/abWinnerList",
  JACKPOT_GAME_DISTIBUTE_FUND_WINNERS: "abWinner/abWinners",
  JACKPOT_REMOVE_RESULT: "abGameResult/delete",

  //  JACKPOT PROFIT / LOSS -
  JACKPOT_GAME_PROFIT_LOSS_LIST: "anderBaharProfitLoss/getResult",
  JACKPOT_GAME_PROFIT_LOSS_BID_DATA: "anderBaharProfitLoss/getBidData",

  //  JACKPOT REVERT PAYMENT -
  JACKPOT_GAME_REVERT_PAYMENT: "abGameResult/revertPayment",
  JACKPOT_GAME_CONFIRM_REVERT_PAYMENT: "abGameResult/paymentRevert",

  //  STARLINE REVERT PAYMENT -
  JACKPOT_GAME_REFUND_PAYMENT: "abGameResult/refundList",
  JACKPOT_GAME_CONFIRM_REFUND_PAYMENT_: "abGameResult/refundAll",
  // CUTTING GROUP

  CUTTING_GROUP_LIST: "cuttingGroups/getCutting",
  CUTTING_GROUP_OC_LIST: "cuttingGroups/getOC",
  GET_BID_DATA: "cuttingGroups/getBidData",
  OC_CUTTING_GROUP_LIST: "ocCuttingGroup/getFinalCutting",
  OC_CUTTING_GROUP_OC_LIST: "ocCuttingGroup/finalCloseCutingGroup",

  // REPORT
  MAIN_GAME_REPORT: "mainSalesReport/userReport",
  STARLINE_GAME_REPORT: "starSalesReport/userReportStar",
  JACKPOT_REPORT: "abSalesReport/userReportAB",
  JACKPOT_BIDS_REPORT: "totalBids/andarBaharBidsData",

  GET_FUND_REPORT_DETAILS: "fundReports",
  GET_FUND_REPORT: "fundReports",
  GET_UPI_FUND_REPORT_DETAILS: "upiFundReport/upiReport",
  GET_UPI_FUND_REPORT: "upiFundReport/getUPIReport",
  GET_NEW_UPI_FUND_REPORT: "upiFundReport/getUPIFundReport",

  TOTAL_BIDS_LIST_DETAILS: "totalBidsReport/games",
  TOTAL_BIDS_LIST: "totalBidsReport/gameBidsData",
  CREDIT_DEBIT_LIST_DETAILS: "creditDebitReport",
  CREDIT_DEBIT_LIST: "creditDebitReport/report",
  DAILY_REPORT: "daliyReport/dailyData",
  DETAILS_BIDDING_REPORT: "biddingReport/biddingDay",
  GET_USER_ANALAYSIS_REPORT: "userAnalysis/analysisReport",
  GET_USER_BIDS_REPORT: "userBids/getUserBidData",

  // WALLET

  REQUEST_LIST: "reqOn_Off",
  REQUEST_LIST_UPDATE: "reqOn_Off/updateReq",
  GET_REQUEST_LIST: "reqOn_Off/getWithdrawReqOnOff",
  UPDATE_REQUEST: "reqOn_Off/withdrawReqOnOff",

  WALLET_LIST: "view_wallet",
  WALLET_LIST_HISTORY: "view_wallet/newHistroy",
  WALLET_LIST_CREDIT: "view_wallet/newCredit",
  WALLET_LIST_USER_PROFILE: "view_wallet/getProfile",
  WALLET_LIST_UPDATE_WALLET: "view_wallet/walletUpdate",

  //DELETED USERS
  DELETED_USER_GET_TIMEHISTORY: "deleteduser/getTimeHistory",
  DELETED_USER_TIMEHISTORY: "deleteduser/timeHistory",
  GET_DELETED_USERS: "deleteduser",
  // SYSTEM MODULE
  ADD_SYSTEM_INFO: "admin/addSystemInfo",
  LIST_SYSTEM_INFO: "common/systemInforList",
  UPDATE_SYSTEM_INFO: "admin/updateSystemInfo",
  ADMIN_PROFILE_GET: "admin/adminProfile",

  // EMPLOYEE MODULE
  CREATE_EMPLOYEE: "master/employees/createEmployee",
  UPDATE_EMPLOYEE: "master/employees/updateEmployee",
  EMPLOYEE_CHANGE_PASSWORD: "master/employees/updatePassword",
  SINGLE_EMPLOYEE_LIST: "master/employees/empById",
  EMPLOYEE_LIST: "master/employees",
  BLOCK_EMPLOYEE: "master/employees/blockEmployee",
  DELETE_EMPLOYEE: "master/employees/deleteEmp",

  // GET_VERSION: "/admin/appSetting/listVersionSetting",
  // UPDATE_VERSION: "/admin/appSetting/updateVersionSetting",
  // WALLET_CONTACT_LIST: "/admin/appSetting/walledContestList",
  // UPDATE_WALLET_CONTACT: "/admin/appSetting/updateWalledContest",

  //APP SETTINGS APP VERSION API'S
  GET_VERSION: "versionSetting",
  UPDATE_VERSION: "versionSetting/updateAppSet",

  //APP SETTINGS WALLET GET UPDATE API'S
  WALLET_CONTACT_LIST: "walletContect",
  WALLET_HEADLINE_LIST: "walletContect/headLine",
  WALLET_UPI_LIST: "walletContect/upi",
  UPDATE_WALLET_CONTACT: "walletContect/updatewalletContact",
  UPDATE_WALLET_HEADLINE: "walletContect/updateHeadline",
  UPDATE_WALLET_UPI: "walletContect/updateUpiId",

  //APP SETTINGS NOTICE BOARD
  NOTICE_BOARD_LIST: "noticeBoard",
  UPDATE_NOTICE_BOARD: "noticeBoard/updateNotice",

  //APP SETTINGS WITHDRAW SCREEN
  GET_WITHDRAW_SCREEN: "withdraw",
  UPDATE_WITHDRAW_SCREEN: "withdraw/updateWithdraw",

  //APP SETTINGS PROFILE NOT GET AND UPDATE API

  GET_PROFILE_NOTE: "profileNote",
  UPDATE_PROFILE_NOTE: "profileNote/updateProfileNote",

  // APP SETTINGS HOW TO PLAY
  HOW_TO_PLAY_GET_LIST: "appSetting/htp",
  UPDATE_HTP: "appSetting/updateHtp",

  //UPI LIST
  GET_UPI_LIST: "upiId",
  ADD_UPI_LIST: "upiId/upiAdd",
  BLOCK_UPI_LIST: "upiId/disable_upi",
  DELETE_UPI_LIST: "upiId/dlt_upi",

  //FUND REQUEST GET LIST AND APPROVED / DECLINED REQUEST APIS
  GET_FUND_REQUEST: "fundsRequest/getManualPaymentList",
  APPROVED_FUND_REQUEST: "fundsRequest/approveManualPayment",
  DECLINED_FUND_REQUEST: "fundsRequest/declineManualPayment",

  //wallet export debit report
  GET_EXPORT_DEBIT_REPORT: "exportDebit",
  APPROVE_EXPORT_DEBIT_REPORT: "exportDebit/approveReq",

  //todayApproved
  EXPORT_DEBIT_TODAY_APPROVED_REPORT: "exportDebit/todayApproved",

  EXPORT_DEBIT_DECLINE_REPORT: "exportDebit/decline",

  //wallet /invoice/profileChange
  GET_WALLET_INVOICE_PROFILE_CHANGE: "invoice/profileChange",

  //wallet /searchAccount/getDetails
  WALLET_GET_SEARCH_DETAILS: "searchAccount/getDetails",

  //exportDebit/showCondition
  WALLET_DOWNLOAD_DEBIT_REPORT: "exportDebit/showCondition",

  //FUND MODE
  ADD_FUND_MODE: "upiId/modeAdd",

  //FUND MODE
  GET_FUND_MODE: "masters/getPaymentModeStatus",
  DELETE_FUND_MODE: "upiId/dlt_mode",
  CHANGE_STATUS_FUND_MODE: "upiId/disable_mode",

  //notification apis
  GET_NOTIFICATION: "notification",
  ADD_NOTIFICATION: "notification/inserNotification",
  DELETE_NOTIFICATION: "notification",

  //news
  NEWS: "news",

  //USER IDEA'S
  USERS_IDEAS: "userIdea",
  //CREDIT REQUEST GET API
  GET_CREDIT_REQUEST_UPI: "creditRequest/creditUPI",

  //DECLINED REQUEST GET API
  GET_DECLINED_REQUEST: "declineReq/declined",

  //APPROVED DEBIT REQUEST BANK AND BANK MANUAL APIS
  APPROVED_DEBIT_BANK: "approveDebit/bank_ajax",
  APPROVED_DEBIT_BANK_MANUAL: "approveDebit/bankManual",

  //PENDING DEBIT BANK REQUEST
  PENDING_DEBIT_BANK_REQUEST: "pendingDebit/pendingBank",
  PENDING_DEBIT_GET_BALANCE: "pendingDebit/getBal",
  PENDING_DEBIT_UPDATE_WALLET: "pendingDebit/updateWallet",
  PENDING_DEBIT_DECLINE: "pendingDebit/decline",
  PENDING_DEBIT_GETPROFILE: "pendingDebit/getProfile",

  //USER PROFILE APIS
  USER_PROFILE_UPDATE_PASSWORD: "master/employees/updatePassword",
  USER_PROFILE_GET_LIST: "master/employees/profileAdmin",
  USER_PROFILE_BLOCK: "master/employees/blockEmployee",

  SHOW_PAYMENT_HISTORY: "nnData/api/history",

  GATWAYPAYMENTLIST: "fundreq/get-payout-requests",
  PENDINGGATWAYPAYMENTLIST: "fundreq/get-pending-payouts",

  WITHDRAWLIST: "nnData/get-payin-requests",
  GATWAYPAYMENTAPPROVE: "fundreq/approve-payout",

  ALLPAYMENTGATWAYLIST: "nnData/api/admin/payment-gateways",
  CREATEPAYMENTGATWAY: "nnData/api/admin/payment-gateway",
  ACTIViACTIVE: "nnData/api/admin/activate-gateway",
};

export { Api };
