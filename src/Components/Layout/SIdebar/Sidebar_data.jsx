export const admin_Sidebar = [
  {
    id: 1,
    headerTitle: "Dashboard",
    title: "Dashboard",
    permission: "main",
    route: "dashboard",
    Icon: "icon-speedometer",
    NestedElement: [],
  },
  {
    id: 2,
    route: "Users",
    headerTitle: "Users",
    permission: "users",
    title: "Users",
    Icon: "fa fa-users",
    NestedElement: [],
  },

  {
    id: 3,
    permission: "games",
    headerTitle: "Games",
    title: "Games",
    Icon: "fa-solid fa-gamepad",
    NestedElement: [
      {
        id: 1,
        title: "Game Provider",
        permission: "gamesProvider",
        route: "games",
      },
      {
        id: 2,
        title: "Games Setting",
        permission: "gamesSetting",
        route: "game/settings",
      },
      {
        id: 3,
        title: "Game Rates",
        route: "game/rates",
        permission: "gamesRates",
      },
      {
        id: 4,
        title: "Game Result",
        route: "game/results",
        permission: "gamesResult",
      },
      {
        id: 5,
        title: "Revert Result Payment",
        permission: "mainrevertpayment",
        route: "game/revertpayment",
      },
      {
        id: 6,
        title: "Refund User Points",
        permission: "mainrefundpayment",
        route: "game/refundpayment",
      },
    ],
  },
  {
    id: 4,
    route: "",
    title: "Starline",
    permission: "starline",
    Icon: "fa-regular fa-star",
    NestedElement: [
      {
        id: 1,
        title: "Star Game Provider",
        route: "games/starlineProvider",
        permission: "starlineProvider",
      },
      {
        id: 2,
        title: "Star Games Setting",
        route: "games/starlinegamesetting",
        permission: "starlineSetting",
      },
      {
        id: 3,
        title: "Star Game Rates",
        route: "games/starlinegamerates",
        permission: "starlineRates",
      },
      {
        id: 4,
        title: "Star Game Result",
        route: "starline/results",
        permission: "starlineResult",
      },
      {
        id: 5,
        title: "Star Profit/Loss",
        permission: "starlineProfit",
        route: "starline/profitloss",
      },
      {
        id: 6,
        title: "Star Revert Result Payment",
        route: "starline/revertpayment",
        permission: "starlinerevertpayment",
      },
      {
        id: 7,
        title: "Refund User Points",
        route: "starline/refundlist",
        permission: "starlinerefundpayment",
      },
    ],
  },
  {
    id: 5,
    route: "",
    title: "Jackpot",
    permission: "ab",
    Icon: "fa-regular fa-heart",
    NestedElement: [
      {
        id: 1,
        title: "Jackpot Game Provider",
        route: "games/jackpotProvider",
        permission: "abProvider",
      },
      {
        id: 2,
        title: "Jackpot Games Setting",
        permission: "abSetting",
        route: "games/jackpotGameSetting",
      },
      {
        id: 3,
        title: "Jackpot Game Rates",
        permission: "abRates",
        route: "games/jackpotRates",
      },
      {
        id: 4,
        title: "Jackpot Profit/Loss",
        permission: "abProftLoss",
        route: "jackpot/profitloss",
      },
      {
        id: 5,
        title: "Jackpot Game Result",
        permission: "abResult",
        route: "jackpot/results",
      },

      {
        id: 6,
        title: "Jackpot Revert Result Payment",
        permission: "jackpotrevertpayment",
        route: "jackpot/revertpayment",
      },
      {
        id: 7,
        title: "Refund User Points",
        permission: "jackpotrefundpayment",
        route: "jackpot/refundlist",
      },
    ],
  },

  // {
  //   id: 6,
  //   headerTitle: "Cutting Group",
  //   title: "Cutting Group",
  //   route: "cuttinggroup",
  //   permission: "cg",
  //   Icon: "icon-speedometer",
  //   NestedElement: [],
  // },

  {
    id: 7,
    route: "",
    headerTitle: "Bookie Corner",
    permission: "bookie",
    title: "Bookie Corner",
    Icon: "fa-solid fa-wallet",
    NestedElement: [
      {
        id: 1,
        title: "Cutting Group",
        route: "cuttinggroup",
        permission: "cg",
      },
      {
        id: 2,
        title: "OC Cutting Group",
        permission: "ocCutting",
        route: "OCGroup",
      },
      {
        id: 3,
        title: "Final OC Cutting Group",
        route: "finalOCGroup",
        permission: "fcg",
      },
    ],
  },
  {
    id: 19,
    route: "wallet/gatwaypaymenthistory",
    headerTitle: "Gateways",
    permission: "masters",
    title: "Gateway Requests",
    Icon: "ti-money",
    NestedElement: [
      {
        id: 4,
        title: "Pay-Out List",
        permission: "gatwaypaymenthistorylist",
        route: "withdraw/gatwaypayement",
      },
      {
        id: 2,
        title: "Pay-In History",
        permission: "gatwaypaymenthistory",
        route: "wallet/gatwaypaymenthistory",
      },
      {
        id: 3,
        title: "All Gateway History",
        route: "gatway/history",
        permission: "gatewayhistory",
      },

      {
        id: 1,
        title: "Manage Gateways",
        permission: "managegatways",
        route: "masters/gatways",
      },
    ],
  },
  {
    id: 8,
    route: "",
    headerTitle: "Wallet",
    permission: "wallet",
    title: "Wallet",
    Icon: "fa-solid fa-wallet",
    NestedElement: [
      // {
      //   id: 1,
      //   title: "Fund Request",
      //   permission: "fundRequest",
      //   route: "wallet/manualrequest",
      // },

      // {
      //   id: 1,
      //   title: "Manual Request",
      //   permission: "wallet",
      //   route: "wallet/manualrequest",
      // },
      {
        id: 2,
        title: "Export Debit Report",
        permission: "exportDebit",
        route: "wallet/debitreport",
      },
      {
        id: 3,
        title: "Download Debit Report",
        permission: "exportDebit",
        route: "wallet/debitReport/moneyCheck",
      },
      {
        id: 4,
        permission: "exportDebit",
        title: "Search Account",
        route: "wallet/searchaccount",
      },
      {
        id: 5,
        title: "Invoices",
        permission: "invoices",
        route: "wallet/invoices",
      },

      {
        id: 6,
        title: "View Wallet",
        permission: "viewWallet",
        route: "wallet/customerbalance",
      },
      {
        id: 7,
        permission: "reqONOFF",
        title: "Requests On/Off",
        route: "wallet/reqOnOff",
      },
    ],
  },

  // {
  //   id: 9,
  //   route: "creditUPI",
  //   headerTitle: "Credit Request (UPI)",
  //   permission: "appDebit",
  //   title: "Credit Request (UPI)",
  //   Icon: "fa-solid fa-check",
  //   NestedElement: [],
  // },
  {
    id: 10,
    headerTitle: "Other Withdrawal Requests",
    title: "Withdrawal Requests",
    route: "",
    permission: "withdrawrequest",
    Icon: "fa-solid fa-check",
    NestedElement: [
      {
        id: 1,
        title: "Bank Account(Export)",
        permission: "bankReq",
        route: "approvedReports/bank",
      },
      {
        id: 2,
        title: "Bank Account(Manual)",
        permission: "bankReq",
        route: "approvedReports/bankManual",
      },
      {
        id: 3,
        title: "Pending Bank Requests",
        permission: "fundRequest",
        route: "fundRequest/pendingBank",
      },
      {
        id: 4,
        title: "Declined Request",
        permission: "decDebit",
        route: "approvedReports/declined",
      },
    ],
  },
  // {
  //   id: 11,
  //   route: "",
  //   headerTitle: "Pending Requests",
  //   title: "Pending Debit Requests",
  //   permission: "fundRequest",
  //   Icon: "fa-regular fa-clock",
  //   NestedElement: [
  //     {
  //       id: 1,
  //       title: "Pending Bank Requests",
  //       permission: "fundRequest",
  //       route: "fundRequest/pendingBank",
  //     },

  //   ],
  // },

  // {
  //   id: 12,
  //   route: "approvedReports/declined",
  //   headerTitle: "Declined Request",
  //   permission: "decDebit",
  //   title: "Declined Request",
  //   Icon: "fa-solid fa-times",
  //   NestedElement: [],
  // },

  {
    id: 13,
    headerTitle: "Reports",
    route: "",
    title: "Reports",
    permission: "reports",
    Icon: "ti-agenda",
    NestedElement: [
      {
        id: 1,
        title: "Sales Report",
        route: "report/salesreport",
        permission: "salesReport",
      },
      {
        id: 2,
        title: "Starline Sales Report",
        route: "report/starlinesalesreport",
        permission: "starLineSaleReport",
      },
      {
        id: 3,
        title: "Andar Bahar Sales Report",
        route: "report/absalesreport",
        permission: "abTotalBids",
      },
      {
        id: 4,
        title: "Andar Bahar Total Bids",
        route: "report/abtotalbids",
        permission: "abTotalBids",
      },
      {
        id: 5,
        title: "Fund Report",
        route: "report/fundreport",
        permission: "upiReport",
      },
      // {
      //   id: 6,
      //   title: "UPI Fund Report",
      //   route: "report/upifundreport",
      //   permission: "upiReport",
      // },

      {
        id: 7,
        title: "UPI Fund Report",
        route: "report/newupifundreport",
        permission: "upiReport",
      },
      // {
      //   id: 8,
      //   title: "Trak Pay Fund Report",
      //   route: "report/trakpayreport",
      //   permission: "upiReport",
      // },
      // {
      //   id: 9,
      //   title: "RazorPay Fund Report",
      //   route: "report/razorpayreport",
      //   permission: "upiReport",
      // },

      {
        id: 10,
        title: "Total Bids",
        route: "report/totalbids",
        permission: "totalBids",
      },
      {
        id: 11,
        title: "Credit/Debit Report",
        route: "report/debitreport",
        permission: "credDebReport",
      },
      {
        id: 12,
        title: "Daily Report",
        route: "report/dailyreport",
        permission: "dailyReport",
      },
      {
        id: 13,
        title: "Bidding Report",
        route: "report/bidingreport",
        permission: "biddingReport",
      },
      {
        id: 14,
        title: "User Analysis",
        route: "report/useranalaysis",
        permission: "biddingReport",
      },
      {
        id: 15,
        title: "Customer Balance",
        route: "report/customerbids",
        permission: "customerBal",
      },
      {
        id: 16,
        title: "All User Bids",
        route: "report/alluserbids",
        permission: "allUserBIds",
      },
    ],
  },
  {
    id: 14,
    route: "notification",
    headerTitle: "Notification",
    title: "Notification",
    Icon: "fa-regular fa-bell",
    permission: "notification",

    NestedElement: [],
  },

  // {
  //   id: 15,
  //   route: "users/ideas",
  //   headerTitle: "userIdeas",
  //   title: "User Idea's",
  //   Icon: "fa-regular fa-bell",
  //   permission: "notification",

  //   NestedElement: [],
  // },

  // {
  //   id: 16,
  //   headerTitle: "News",
  //   title: "News",
  //   route: "news",
  //   Icon: "fa-solid fa-television",
  //   permission: "news",
  //   NestedElement: [],
  // },
  {
    id: 17,
    route: "users/deleted",

    title: "Deleted Users",
    permission: "delete",
    Icon: "fa-regular fa-bell",
    NestedElement: [],
  },

  {
    id: 18,
    route: "",
    headerTitle: "App Settings",
    title: "App Settings",
    permission: "app_settings",

    Icon: "fa-solid fa-cog",
    NestedElement: [
      {
        id: 1,
        title: "How To Play",
        route: "appSettings/howToPlay",
        permission: "howToPlay",
      },
      {
        id: 2,
        title: "Withdraw Screen",
        route: "appSettings/withDraw",
        permission: "app_settings",
      },
      {
        id: 3,
        title: "Notice Board",
        route: "appSettings/noticeBoard",
        permission: "noticeBoard",
      },

      // {
      //   id: 4,
      //   title: "Profile Note",
      //   route: "appSettings/profileNote",
      //   permission: "profileNote",
      // },
      {
        id: 5,
        title: "Wallet Contact",
        route: "appSettings/walletContact",
        permission: "walletContact",
      },

      {
        id: 6,
        title: "App Version",
        route: "appSettings/versionSetting",
        permission: "appVersion",
      },
    ],
  },
  {
    id: 19,
    route: "",
    headerTitle: "Masters",
    permission: "masters",
    title: "Masters",
    Icon: "ti-money",
    NestedElement: [
      // {
      //   id: 0,
      //   title: "Manage Gatways",
      //   permission: "managegatways",
      //   route: "masters/gatways",
      // },
      {
        id: 1,
        title: "UPI Id",
        route: "masters/UPI",
        permission: "upiId",
      },
      {
        id: 2,
        title: "Add Fund Mode",
        permission: "addFoundMode",
        route: "masters/fundMode",
      },

      {
        id: 3,
        title: "Manage Employee",
        permission: "manageEmp",
        route: "employees",
      },
      {
        id: 4,
        permission: "createEmployee",
        title: "Register New Employee",
        route: "employees/add",
      },
    ],
  },
];
