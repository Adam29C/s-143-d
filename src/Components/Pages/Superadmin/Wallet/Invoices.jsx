import React from "react";
import PagesIndex from "../../PagesIndex";
import ReusableModal from "../../../Helpers/Modal/ReusableModal";

const Invoices = () => {
  const token = localStorage.getItem("token");

  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [viewHistory, setViewHistory] = PagesIndex.useState([]);
  const [modalState, setModalState] = PagesIndex.useState(false);
  const [Refresh, setRefresh] = PagesIndex.useState(false);

  const visibleFields = [
    {
      name: "User Name",
      value: "username",
      sortable: false,
    },
    {
      name: "Bank Name",
      value: "bank_name",
      sortable: false,
    },
    {
      name: "Account No",
      value: "account_no",
      sortable: false,
    },
    {
      name: "IFSC",
      value: "ifsc_code",
      sortable: false,
    },
    {
      name: "Account Holder Name",
      value: "account_holder_name",
      sortable: false,
    },
    {
      name: "Paytm Number",
      value: "paytm_number",
      sortable: false,
      transform: (item) => {
        return item ? item : " null";
      },
    },
    {
      // name: "Profile",
      name: "View Change History",
      isButton: true,
      // className : 'color-primary' ,
      value: (row) => "Change History",
      buttonColor: "primary",
      Conditions: (row) => {
        handleViewHistory(row);
      },
    },
  ];

  const visibleFields1 = [
    {
      name: "Old A/c Holder Name",
      value: "old_acc_name",
      sortable: false,
    },
    {
      name: "Old Bank Name",
      value: "old_bank_name",
      sortable: false,
    },
    // {
    //   name: "Old Account No",
    //   value: "old_acc_no",
    //   sortable: false,
    // },
    {
      name: "Account No",
      value: "account_no",
      sortable: false,
    },
    {
      name: "Old IFSC",
      value: "old_ifsc",
      sortable: false,
    },
    {
      name: "Old Paytm Number",
      value: "old_paytm_no",
      sortable: false,
      transform: (item) => {
        return item ? item : " null";
      },
    },
    {
      name: "Change Date",
      value: "changeDate",
      sortable: false,
    },
  ];

  const handleViewHistory = (row) => {
    setViewHistory(row?.changeDetails);
    setModalState(true);
  };

  const fetchData = async (page, rowsPerPage, searchQuery) => {
    const payload = {
      page: page,
      limit: rowsPerPage,
      search: searchQuery,
    };

    try {
      const response =
        await PagesIndex.admin_services.GET_WALLET_INVOICE_PROFILE_CHANGE_API(
          payload,
          token
        );

      const totalRows = response?.count || 10;
      let mainRes = response.records;

      return { mainRes, totalRows };
    } catch {}
  };
  PagesIndex.useEffect(() => {
    fetchData();
  }, []);

  return (
    <PagesIndex.Main_Containt add_button={false} title="Profile Change History">
      <PagesIndex.TableWithCustomPeginationNew
        fetchData={fetchData}
        columns={visibleFields}
        showIndex={true}
        Refresh={Refresh}
      />

      <ReusableModal
        ModalTitle={"Change History"}
        ModalState={modalState}
        setModalState={setModalState}
        ModalBody={
          <>
            <PagesIndex.TableWithCustomPeginationNew123
              data={viewHistory}
              initialRowsPerPage={5}
              SearchInTable={SearchInTable}
              visibleFields={visibleFields1}
              searchInput={
                <input
                  type="text"
                  placeholder="Search..."
                  value={SearchInTable}
                  onChange={(e) => setSearchInTable(e.target.value)}
                  className="form-control ms-auto"
                />
              }
            />
          </>
        }
      />
      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default Invoices;
