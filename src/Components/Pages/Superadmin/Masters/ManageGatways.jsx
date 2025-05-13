import Main_Containt from "../../../Layout/Main/Main_Containt";
import ModalComponent from "../../../Helpers/Modal/ModalComponent";
import PagesIndex from "../../PagesIndex";

const FundMode = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");

  //all state
  const [loading, setLoading] = PagesIndex.useState(false);
  const [gatwayDataList, setgatwayDataList] = PagesIndex.useState([]);
  const [visible, setVisible] = PagesIndex.useState(false);
  const [EditGatway, setEditGatway] = PagesIndex.useState(false);

  const getList = async () => {
    setLoading(true);
    try {
      const res1 = await PagesIndex.admin_services.GET_GATWAYSLIST_API(token);

      console.log("res1", res1);

      setgatwayDataList(res1?.gateways);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  PagesIndex.useEffect(() => {
    getList();
  }, []);

  //handle block and unblock status function
  const handleStatusUpdate = async (row) => {
    try {
      // let apidata = {
      //   id: row._id,
      //   status: !row.visible,
      // };

      const response = await PagesIndex.admin_services.CHANGE_STATUS_GATWAY_API(
        row.name,
        token
      );

      if (response?.status) {
        PagesIndex.toast.success(response.message);
        getList();
      }
    } catch (error) {
      PagesIndex.toast.error(error);
    }
  };

  //delete fund mode list start
  // const handleDelete = async (row) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this Fund Mode?"
  //   );
  //   if (!confirmDelete) return;

  //   try {
  //     const apidata = {
  //       id: row?._id,
  //     };

  //     const res = await PagesIndex.admin_services.DELETE_FUND_MODE_API(
  //       apidata,
  //       token
  //     );

  //     if (res.status) {
  //       getList();
  //       alert(res?.message);
  //     }
  //   } catch (error) {}
  // };

  const columns = [
    {
      name: "Gatway Name",
      selector: (row) => row?.name,
    },
    {
      name: "Merchant Id",
      selector: (row) => row?.merchantId,
    },
    {
      name: "Api Key",
      selector: (row) => row?.apiKey,
    },
    {
      name: "Status",
      selector: (row) => row?.status,
    },
    {
      name: "Active / Inactive",
      selector: (row) => (
        <span>
          <button
            onClick={() => handleStatusUpdate(row)}
            class={`btn ${
              row?.status === "ACTIVE" ? "btn-success" : "btn-danger"
            } btn-sm me-2`}
          >
            {/* <i className="fa-solid fa-user-slash mr-1 icon-fs"></i>
         <i className="fa-solid fa-user mr-1 icon-fs"></i>
            {row.disabled ? "Unblock" : "Block"} */}
            {row?.status === "ACTIVE" ? (
              <>
                <i className="fa-solid fa-user mr-1 icon-fs"></i>Inactive
              </>
            ) : (
              <>
                <i className="fa-solid fa-user-slash mr-1 icon-fs"></i>Active
              </>
            )}
          </button>
        </span>
      ),
    },

    // {
    //   name: "Actions",
    //   selector: (cell, row) => (
    //     <div className="d-flex">
    //       {/* <div>
    //         <span>
    //           <button
    //             onClick={() => EditGatways(cell)}
    //             class="btn btn-success btn-sm me-2"
    //           >
    //             Edit
    //           </button>
    //         </span>
    //       </div>
    //       <div> */}
    //       <div>
    //         <span>
    //           <button
    //             onClick={() => handleDelete(cell)}
    //             class="btn btn-danger btn-sm me-2"
    //           >
    //             Delete
    //           </button>
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  // const EditGatways = (data) => {
  //   setVisible(true);
  //   setEditGatway(true);

  //   formik.resetForm({
  //     values: {
  //       name: data.name,
  //       merchantId: data.merchantId,
  //       apiKey: data.apiKey,
  //       status: data.status,
  //     },
  //   });
  // };

  //handle add formik form
  const formik = PagesIndex.useFormik({
    // enableReinitialize: true,

    initialValues: {
      name: "",
      merchantId: "",
      apiKey: "",
      status: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = PagesIndex.valid_err.REQUIRE_GATWAY_NAME;
      }
      if (!values.apiKey) {
        errors.apiKey = PagesIndex.valid_err.REQUIRE_API_KEY;
      }
      if (!values.merchantId) {
        errors.merchantId = PagesIndex.valid_err.REQUIRE_MERCHENT_ID;
      }
      if (!values.status) {
        errors.status = PagesIndex.valid_err.STATUS_ERROR;
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        let apidata = {
          name: values.name,
          merchantId: values.merchantId === "true",
          apiKey: values.apiKey,
          status: values.status,
        };

        let res = "";
        res = await PagesIndex.admin_services.ADD_GATWAY_API(apidata, token);

        if (res?.status) {
          PagesIndex.toast.success(res?.message);
          getList();
          setVisible(false);
          // formik.setFieldValue("mode", "");
          // formik.setFieldValue("status", "");
          // formik.setFieldValue("urlWeb", "");
        } else {
          PagesIndex.toast.error(res.response.data.message);
        }
      } catch (error) {
        PagesIndex.toast.error(error);
      }
    },
  });

  const fields = [
    {
      name: "name",
      label: "Gatway Name",
      type: "text",
      label_size: 12,
      col_size: 12,
    },
    {
      name: "merchantId",
      label: "Merchant Id",
      type: "text",
      label_size: 12,
      col_size: 12,
    },
    {
      name: "apiKey",
      label: "Api Key",
      type: "text",
      label_size: 12,
      col_size: 12,
    },

    {
      name: "status",
      label: "Status",
      type: "select",
      title_size: 6,
      col_size: 12,
      options: [
        {
          label: "Active",
          value: "ACTIVE",
        },
        {
          label: "In-Active",
          value: "INACTIVE",
        },
      ],
    },
  ];

  // Handle Add Button
  const handleAdd = () => {
    setVisible(true);
  };

  return (
    <Main_Containt
      setVisible={setVisible}
      add_button={false}
      btn_modal={false}
      title="Gateway List"
      handleAdd={handleAdd}
    >
      <PagesIndex.Data_Table
        isLoading={loading}
        columns={columns}
        data={gatwayDataList}
        showFilter={false}
      />

      <ModalComponent
        visible={visible}
        setVisible={setVisible}
        fields={fields}
        form_title="Add New "
        formik={formik}
        size="550"
      />
      <PagesIndex.Toast />
    </Main_Containt>
  );
};

export default FundMode;
