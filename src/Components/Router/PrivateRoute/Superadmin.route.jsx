// src/routes/AdminRoutes.jsx
import React from "react";
import Superadmin_Wraper from "../../Layout/Wraper/Wraper";
// Dashboard
import Dashboard from "../../Pages/Superadmin/Dashboard/Dashboard";
// Users
import UsersList from "../../Pages/Superadmin/Users/UsersList";
// Private Routes
import PrivateRoute from "../PrivateRoute/index";
import ErrorPage from "../../Pages/Auth/NotFound";
import Add_Edit_User from "../../Pages/Superadmin/Users/Add_Edit_User";
import SuperAdminProfile from "../../Pages/Superadmin/Profile/SuperAdminProfile";
import EmployeeList from "../../Pages/Superadmin/Employee/EmployeeList";
import Add_Edit_Employee from "../../Pages/Superadmin/Employee/Add_Edit_Employee";
import System from "../../Pages/Superadmin/PenalInfo/System";
import Games from "../../Pages/Superadmin/Games/AvailableGames/Games";
// import GameProviderAdd from "../../Helpers/GameProvider/GameCrud/GameProviderAdd";
import GameRates from "../../Pages/Superadmin/Games/AvailableGames/GameRates/GameRates";
// import GameRatesAdd from "../../Helpers/GameProvider/GameRates/GameRatesAdd";
import GameSetting from "../../Pages/Superadmin/Games/AvailableGames/GameSettingList";
import GameSettingAdd from "../../Helpers/GameProvider/GameSetting/GameSettingAdd";
import CuttingGroup from "../../Pages/Superadmin/CuttingGroup/CuttingGroup";
import GameResult from "../../Pages/Superadmin/Games/AvailableGames/GameResult/GameRasult";

// main game
import MainRevertPayment from "../../Pages/Superadmin/Games/AvailableGames/RevertPayment";
import MainRefundList from "../../Pages/Superadmin/Games/AvailableGames/RefundList";

// starline game result
import StarlineGameResult from "../../Pages/Superadmin/Games/Starline/Result/Result";
import Winnerlist from "../../Helpers/GameProvider/GameResult/WinnerList";

// Revert Payment
import RevertPayment from "../../Pages/Superadmin/Games/Starline/RevertPayment/RevertPayment";

// Starline Refund List
import StarlineRefundList from "../../Pages/Superadmin/Games/Starline/StarlineRefundList/StarlineRefundList";

// starline ProfitLost
import ProfitLoss from "../../Pages/Superadmin/Games/Starline/ProfitLoss/ProfitLoss";

import MultiTabs from "../../Helpers/MultiTabs";
import OcCuttingGroup from "../../Pages/Superadmin/BookieCorner/OcCuttingGroup";
import FinalOcCuttingGroup from "../../Pages/Superadmin/BookieCorner/FinalOcCuttingGroup";
import WithdrawRequest from "../../Pages/Superadmin/Wallet/WithdrawRequest";
import CreditRequest from "../../Pages/Superadmin/CreditRequest/CreditRequest";
import UsersIdeas from "../../Pages/Superadmin/Users/UsersIdeas";
import DeleteUsers from "../../Pages/Superadmin/Users/DeleteUsers";
import AppVersion from "../../Pages/Superadmin/AppSettings/AppVersion";
import StarLineProvider from "../../Pages/Superadmin/Games/Starline/StarLineProvider/StarLineProvider";
import StarLineAddEdit from "../../Pages/Superadmin/Games/Starline/StarLineProvider/StarLineAddEdit";
import WalletContact from "../../Pages/Superadmin/AppSettings/WalletContact";
import StarLineSettingsList from "../../Pages/Superadmin/Games/Starline/StarLineSettings/StarLineSettingsList";
import ForStarlineJackpotAdd from "../../Helpers/GameProvider/GameSetting/ForStarline&JackpotAdd";
import StarLineSettingsAddEdit from "../../Pages/Superadmin/Games/Starline/StarLineSettings/StarLineSettingsAddEdit";
import StarLineGameRate from "../../Pages/Superadmin/Games/Starline/StarLineRates/StarLineGameRate";
// import StarLineRatesAddEdit from "../../Pages/Superadmin/Games/Starline/StarLineRates/StarLineRatesAddEdit";
// import GameRatesAddEdit from "../../Pages/Superadmin/Games/AvailableGames/GameRates/GameRatesAddEdit";
import JackpotProvider from "../../Pages/Superadmin/Games/Jackpot/JackPotProvider/JackpotProvider";
import JackPotProviderAddEdit from "../../Pages/Superadmin/Games/Jackpot/JackPotProvider/JackPotProviderAddEdit";
import JackPotRates from "../../Pages/Superadmin/Games/Jackpot/JackPotRates/JackPotRates";
// import JackPotRatesAddEdit from "../../Pages/Superadmin/Games/Jackpot/JackPotRates/JackPotRatesAddEdit";
import NoticeBoard from "../../Pages/Superadmin/AppSettings/NoticeBoard";
import JackPotSettings from "../../Pages/Superadmin/Games/Jackpot/JackPotSettings/JackPotSettings";
import JackPotAddEdit from "../../Pages/Superadmin/Games/Jackpot/JackPotSettings/JackPotAddEdit";
import WithdrawScreen from "../../Pages/Superadmin/AppSettings/WithdrawScreen";
import HowToPlay from "../../Pages/Superadmin/AppSettings/HowToPlay";
import UpiIdList from "../../Pages/Superadmin/Masters/UpiIdList";
import WinnerList from "../../Pages/Superadmin/Games/AvailableGames/GameResult/WinnerList";
import ProfileNote from "../../Pages/Superadmin/AppSettings/ProfileNote";
import FundMode from "../../Pages/Superadmin/Masters/FundMode";
import ManageGatways from "../../Pages/Superadmin/Masters/ManageGatways";
import Notification from "../../Pages/Superadmin/Notification/Notification";
import News from "../../Pages/Superadmin/News/News";
import DeclinedRequest from "../../Pages/Superadmin/DeclinedRequest/DeclinedRequest";
import ApproveReportBank from "../../Pages/Superadmin/ApproveDebitRequest/ApproveReportBank";
import ApproveReportBankManual from "../../Pages/Superadmin/ApproveDebitRequest/ApproveReportBankManual";
import PendingBankRequests from "../../Pages/Superadmin/PendingBankRequests/PendingBankRequests";
import ApproveGatwayPaymentList from "../../Pages/Superadmin/ApproveGatwayPaymentList/ApproveGatwayPaymentList";

// jackpot

// starline game result
import JackpotGameResult from "../../Pages/Superadmin/Games/Jackpot/Result/Result";
import JackpotProfitLoss from "../../Pages/Superadmin/Games/Jackpot/ProfitLoss/ProfitLoss";

// Revert Payment
import JackPotRevertPayment from "../../Pages/Superadmin/Games/Jackpot/RevertPayment/RevertPayment";

// Starline Refund List
import JackpotRefundList from "../../Pages/Superadmin/Games/Jackpot/RefundList/RefundList";
// import Winnerlist from "../../Helpers/GameProvider/GameResult/WinnerList";

// WALLET SECTION

import RequestOnOff from "../../Pages/Superadmin/Wallet/RequestOnOff";
import ManualRequest from "../../Pages/Superadmin/Wallet/ManualRequest";
import GatwayHistory from "../../Pages/Superadmin/Wallet/GatwayPaymentList";
import ExportDebitReport from "../../Pages/Superadmin/Wallet/ExportDebitReport";
import DownloadDebitReport from "../../Pages/Superadmin/Wallet/DownloadDebitReport";
import SearchAccount from "../../Pages/Superadmin/Wallet/SearchAccount";
import Invoices from "../../Pages/Superadmin/Wallet/Invoices";
import ViewWallet from "../../Pages/Superadmin/Wallet/ViewWallet";

// REPORT  SECTION

import AndarBaharSalesReport from "../../Pages/Superadmin/Reports/AndarBaharSalesReport";
import AndarBharTotalBids from "../../Pages/Superadmin/Reports/AndarBharTotalBids";
import SalesReports from "../../Pages/Superadmin/Reports/SalesReports";
import StarlineSalesReport from "../../Pages/Superadmin/Reports/StarlineSalesReport";
import FundReport from "../../Pages/Superadmin/Reports/FundReport";
import UpiFundReport from "../../Pages/Superadmin/Reports/UpiFundReport";
import NewUpiFundReport from "../../Pages/Superadmin/Reports/NewUpiFundReport";
import TrakPayFundReport from "../../Pages/Superadmin/Reports/TrakPayFundReport";
import RazorPayReport from "../../Pages/Superadmin/Reports/RazorPayReport";
import TotalBIds from "../../Pages/Superadmin/Reports/TotalBIds";
import CreditDebitReport from "../../Pages/Superadmin/Reports/CreditDebitReport";
import DailyReport from "../../Pages/Superadmin/Reports/DailyReport";
import BidingReport from "../../Pages/Superadmin/Reports/BidingReport";
import UserAnalaysis from "../../Pages/Superadmin/Reports/UserAnalaysis";
import CustomerBalence from "../../Pages/Superadmin/Reports/CustomerBalence";
import AllUserBids from "../../Pages/Superadmin/Reports/AllUserBids";
import GatwayHistory123 from "../../Pages/Superadmin/Reports/GatwayHistory";

// import AddEmployee32 from "../../Pages/Superadmin/Employee/Add_Edit_Employee32";
import AddEmployee from "../../Pages/Superadmin/Employee/Add_Edit_Employee";

// Mock authentication status

const adminRoutes = [
  {
    path: "/admin/",
    element: <PrivateRoute element={Superadmin_Wraper} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <PrivateRoute element={Dashboard} />,
      },
      {
        path: "users",
        element: <PrivateRoute element={UsersList} />,
      },
      {
        path: "user/add",
        element: <PrivateRoute element={Add_Edit_User} />,
      },
      {
        path: "users/ideas",
        element: <PrivateRoute element={UsersIdeas} />,
      },
      {
        path: "users/deleted",
        element: <PrivateRoute element={DeleteUsers} />,
      },
      {
        path: "employees",
        element: <PrivateRoute element={EmployeeList} />,
      },
      {
        path: "employees/add",
        element: <PrivateRoute element={Add_Edit_Employee} />,
      },
      {
        path: "employees/edit",
        element: <PrivateRoute element={Add_Edit_Employee} />,
      },
      {
        path: "user/profile",
        element: <PrivateRoute element={SuperAdminProfile} />,
      },
      {
        path: "system",
        element: <PrivateRoute element={System} />,
      },
      {
        path: "games",
        element: <PrivateRoute element={Games} />,
      },
      {
        path: "game/rates",
        element: <PrivateRoute element={GameRates} />,
      },
      {
        path: "game/settings",
        element: <PrivateRoute element={GameSetting} />,
      },
      {
        path: "game/setting/add",
        element: <PrivateRoute element={GameSettingAdd} />,
      },
      {
        path: "game/setting/edit",
        element: <PrivateRoute element={GameSettingAdd} />,
      },
      {
        path: "game-rates",
        element: <PrivateRoute element={GameRates} />,
      },
      {
        path: "game/results",
        element: <PrivateRoute element={GameResult} />,
      },

      {
        path: "game/results/winners",
        element: <PrivateRoute element={WinnerList} />,
      },
      {
        path: "game/revertpayment",
        element: <PrivateRoute element={MainRevertPayment} />,
      },
      {
        path: "game/refundpayment",
        element: <PrivateRoute element={MainRefundList} />,
      },
      {
        path: "games/starlineProvider",
        element: <PrivateRoute element={StarLineProvider} />,
      },
      {
        path: "games/starlineProvider/add",
        element: <PrivateRoute element={StarLineAddEdit} />,
      },
      {
        path: "games/starlineProvider/edit",
        element: <PrivateRoute element={StarLineAddEdit} />,
      },

      {
        path: "games/starlinegamesetting",
        element: <PrivateRoute element={StarLineSettingsList} />,
      },
      {
        path: "games/starlinegamesetting/add",
        element: <PrivateRoute element={StarLineSettingsAddEdit} />,
      },
      {
        path: "games/starlinegamesetting/edit",
        element: <PrivateRoute element={StarLineSettingsAddEdit} />,
      },

      {
        path: "games/starlinegamerates",
        element: <PrivateRoute element={StarLineGameRate} />,
      },

      {
        path: "starline/results",
        element: <PrivateRoute element={StarlineGameResult} />,
      },
      {
        path: "starline/winnerlist/:id",
        element: <PrivateRoute element={Winnerlist} />,
      },
      {
        path: "starline/revertpayment",
        element: <PrivateRoute element={RevertPayment} />,
      },
      {
        path: "starline/refundlist",
        element: <PrivateRoute element={StarlineRefundList} />,
      },
      {
        path: "starline/results",
        element: <PrivateRoute element={StarlineGameResult} />,
      },
      {
        path: "starline/winnerlist/:id",
        element: <PrivateRoute element={Winnerlist} />,
      },
      // {
      //   path: "starline/revertpayment",
      //   element: <PrivateRoute element={RevertPayment} />,
      // },
      {
        path: "starline/profitloss",
        element: <PrivateRoute element={ProfitLoss} />,
      },
      {
        path: "games/jackpotProvider",
        element: <PrivateRoute element={JackpotProvider} />,
      },
      {
        path: "games/jackpotProvider/add",
        element: <PrivateRoute element={JackPotProviderAddEdit} />,
      },
      {
        path: "games/jackpotProvider/edit",
        element: <PrivateRoute element={JackPotProviderAddEdit} />,
      },
      {
        path: "games/jackpotRates",
        element: <PrivateRoute element={JackPotRates} />,
      },
      {
        path: "jackpot/results",
        element: <PrivateRoute element={JackpotGameResult} />,
      },
      {
        path: "jackpot/profitloss",
        element: <PrivateRoute element={JackpotProfitLoss} />,
      },
      {
        path: "jackpot/winnerlist/:id",
        element: <PrivateRoute element={Winnerlist} />,
      },
      {
        path: "jackpot/revertpayment",
        element: <PrivateRoute element={JackPotRevertPayment} />,
      },
      {
        path: "jackpot/refundlist",
        element: <PrivateRoute element={JackpotRefundList} />,
      },
      // {
      //   path: "games/jackpotRates/add",
      //   element: <PrivateRoute element={JackPotRatesAddEdit} />,
      // },
      // {
      //   path: "games/jackpotRates/edit",
      //   element: <PrivateRoute element={JackPotRatesAddEdit} />,
      // },
      {
        path: "games/jackpotGameSetting",
        element: <PrivateRoute element={JackPotSettings} />,
      },
      {
        path: "games/jackpotGameSetting/add",
        element: <PrivateRoute element={JackPotAddEdit} />,
      },
      {
        path: "games/jackpotGameSetting/edit",
        element: <PrivateRoute element={JackPotAddEdit} />,
      },
      {
        path: "cuttinggroup",
        element: <PrivateRoute element={CuttingGroup} />,
      },
      {
        path: "OCGroup",
        element: <PrivateRoute element={OcCuttingGroup} />,
      },
      {
        path: "finalOCGroup",
        element: <PrivateRoute element={FinalOcCuttingGroup} />,
      },
      {
        path: "wallet/manualrequest",
        element: <PrivateRoute element={ManualRequest} />,
      },
      {
        path: "wallet/debitreport",
        element: <PrivateRoute element={ExportDebitReport} />,
      },
      {
        path: "wallet/debitReport/moneyCheck",
        element: <PrivateRoute element={DownloadDebitReport} />,
      },
      {
        path: "wallet/searchaccount",
        element: <PrivateRoute element={SearchAccount} />,
      },
      {
        path: "wallet/invoices",
        element: <PrivateRoute element={Invoices} />,
      },
      {
        path: "wallet/customerbalance",
        element: <PrivateRoute element={ViewWallet} />,
      },
      {
        path: "wallet/reqOnOff",
        element: <PrivateRoute element={RequestOnOff} />,
      },
      {
        path: "wallet/gatwaypaymenthistory",
        element: <PrivateRoute element={GatwayHistory} />,
      },
      {
        path: "report/salesreport",
        element: <PrivateRoute element={SalesReports} />,
      },
      {
        path: "report/absalesreport",
        element: <PrivateRoute element={AndarBaharSalesReport} />,
      },
      {
        path: "report/abtotalbids",
        element: <PrivateRoute element={AndarBharTotalBids} />,
      },
      {
        path: "report/starlinesalesreport",
        element: <PrivateRoute element={StarlineSalesReport} />,
      },
      {
        path: "report/fundreport",
        element: <PrivateRoute element={FundReport} />,
      },
      {
        path: "report/upifundreport",
        element: <PrivateRoute element={UpiFundReport} />,
      },
      {
        path: "report/newupifundreport",
        element: <PrivateRoute element={NewUpiFundReport} />,
      },
      {
        path: "report/trakpayreport",
        element: <PrivateRoute element={TrakPayFundReport} />,
      },
      {
        path: "report/razorpayreport",
        element: <PrivateRoute element={RazorPayReport} />,
      },
      {
        path: "report/totalbids",
        element: <PrivateRoute element={TotalBIds} />,
      },
      {
        path: "report/debitreport",
        element: <PrivateRoute element={CreditDebitReport} />,
      },
      {
        path: "report/dailyreport",
        element: <PrivateRoute element={DailyReport} />,
      },
      {
        path: "report/bidingreport",
        element: <PrivateRoute element={BidingReport} />,
      },
      {
        path: "report/useranalaysis",
        element: <PrivateRoute element={UserAnalaysis} />,
      },
      {
        path: "report/customerbids",
        element: <PrivateRoute element={ViewWallet} />,
      },
      {
        path: "report/alluserbids",
        element: <PrivateRoute element={AllUserBids} />,
      },
      {
        path: "creditUPI",
        element: <PrivateRoute element={CreditRequest} />,
      },
      {
        path: "approvedReports/declined",
        element: <PrivateRoute element={DeclinedRequest} />,
      },
      {
        path: "appSettings/versionSetting",
        element: <PrivateRoute element={AppVersion} />,
      },

      {
        path: "appSettings/walletContact",
        element: <PrivateRoute element={WalletContact} />,
      },
      {
        path: "appSettings/noticeBoard",
        element: <PrivateRoute element={NoticeBoard} />,
      },

      {
        path: "appSettings/withDraw",
        element: <PrivateRoute element={WithdrawScreen} />,
      },
      {
        path: "appSettings/howToPlay",
        element: <PrivateRoute element={HowToPlay} />,
      },

      {
        path: "appSettings/profileNote",
        element: <PrivateRoute element={ProfileNote} />,
      },

      {
        path: "masters/UPI",
        element: <PrivateRoute element={UpiIdList} />,
      },
      {
        path: "masters/fundMode",
        element: <PrivateRoute element={FundMode} />,
      },
      {
        path: "masters/gatways",
        element: <PrivateRoute element={ManageGatways} />,
      },
      {
        path: "notification",
        element: <PrivateRoute element={Notification} />,
      },
      {
        path: "news",
        element: <PrivateRoute element={News} />,
      },
      {
        path: "approvedReports/bank",
        element: <PrivateRoute element={ApproveReportBank} />,
      },
      {
        path: "approvedReports/bankManual",
        element: <PrivateRoute element={ApproveReportBankManual} />,
      },
      {
        path: "fundRequest/pendingBank",
        element: <PrivateRoute element={PendingBankRequests} />,
      },
      {
        path: "withdraw/gatwaypayement",
        element: <PrivateRoute element={ApproveGatwayPaymentList} />,
      },
      {
        path: "gatway/history",
        element: <PrivateRoute element={GatwayHistory123} />,
      },
    ],
  },
];

export default adminRoutes;
