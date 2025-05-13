import React from "react";
import PagesIndex from "../../PagesIndex";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import ReusableModal from "../../../Helpers/Modal/ModalComponent_main";
// import { convertTo12HourFormat } from "../../../Utils/Valid_Rejex";
import {
  convertTo12HourFormat,
  convertTo12HourFormat123,
} from "../../../Utils/Common_Date";

const RequestOnOff = () => {
  const token = localStorage.getItem("token");

  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [TableData, setTableData] = PagesIndex.useState([]);

  const [ShowModal, setShowModal] = PagesIndex.useState(false);
  const [RowDetails, setRowDetails] = PagesIndex.useState("");

  const RequestList = async () => {
    const res = await PagesIndex.admin_services.REQUEST_LIST_API(token);
    if (res.status) {
      setTableData(res.reqdata);
    }
  };

  const RequestList1 = async () => {
    const res1 = await PagesIndex.admin_services.GET_REQUEST_LIST_API(token);

    let aaa = res1.data.endTime;

    if (res1.status) {
      formik.setFieldValue(
        "startDate",
        convertTo12HourFormat(res1.data.startTime)
      );
      formik.setFieldValue("endDate", convertTo12HourFormat(res1.data.endTime));
      formik.setFieldValue("requestCount", res1.data.requestCount);
    }
  };

  PagesIndex.useEffect(() => {
    RequestList();
    RequestList1();
  }, []);

  const visibleFields = [
    {
      name: "Day",
      value: "dayName",
      sortable: true,
    },
    {
      name: "Request on/off",
      value: "enabled",
      sortable: false,
      transform: (value) => (value ? "Request is On" : "Request is OFF"),
    },
    {
      name: "Message",
      value: "message",
      sortable: true,
    },
    {
      name: "Updated At",
      value: "updatedAt",
      sortable: true,
    },
    // { name: "Actions", value: "editButton", isButton: true, sortable: true },
    {
      // name: "Profile",
      name: "Edit Setting",
      isButton: true,
      value: "Edit Setting",
      buttonColor: "info",
      Conditions: (row) => {
        setRowDetails(row);
        setShowModal(true);
      },
    },
  ];

  const UserFullButtonList = [
    {
      id: 0,
      buttonName: "Edit Setting",
      buttonColor: "info",
      route: "",
      Conditions: (row) => {
        setRowDetails(row);
        setShowModal(true);
      },
      Visiblity: true,
      value: "editButton",
    },
  ];

  const fields1 = [
    {
      name: "status",
      label: "On or Off",
      type: "select",
      Visiblity: true,
      title_size: 12,
      col_size: 12,
      options: [
        {
          label: "ON",
          value: "true",
        },
        {
          label: "OFF",
          value: "false",
        },
      ],
    },
    {
      name: "reason",
      label: "Message",
      type: "msgbox",
      row_size: 4,
      title_size: 4,
      col_size: 12,
    },
  ];

  const formik1 = PagesIndex.useFormik({
    initialValues: {
      status: "",
      reason: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.status) {
        errors.status = "Please Select On /OFF";
      }

      if (!values.reason) {
        errors.reason = "Please Enter Msg";
      }
      return errors;
    },

    onSubmit: async (values) => {
      const payload = {
        reason: values.reason,
        rowId: RowDetails._id,
        status: values.status,
      };

      const res = await PagesIndex.admin_services.REQUEST_LIST_UPDATE_API(
        payload,
        token
      );

      if (res.status) {
        setShowModal(false);
        PagesIndex.toast.success(res?.message);
        RequestList();
      } else {
        PagesIndex.toast.error(res?.response?.data?.message);
      }
    },
  });

  const fields = [
    {
      name: "startDate",
      label: "From Time",
      type: "time",
      title_size: 4,
      col_size: 4,
    },
    {
      name: "endDate",
      label: "To Time",
      type: "time",
      title_size: 4,
      col_size: 4,
    },
    {
      name: "requestCount",
      label: "Withdraw Request Count",
      type: "number",
      label_size: 12,
      col_size: 4,
    },
  ];

  const formik = PagesIndex.useFormik({
    initialValues: {
      requestCount: "",
      endDate: "",
      startDate: "",
    },
    validate: (values) => {},

    onSubmit: async (values) => {
      const payload = {
        requestCount: values.requestCount,
        endDate: convertTo12HourFormat(values.endDate),
        startDate: convertTo12HourFormat(values.startDate),
      };

      const res = await PagesIndex.admin_services.UPDATE_REQUEST_API(
        payload,
        token
      );

      if (res.status) {
        setShowModal(false);
        PagesIndex.toast.success(res?.message);
        RequestList1();
      } else {
        PagesIndex.toast.error(res?.response?.data?.message);
      }
    },
  });

  const cardLayouts = [
    {
      size: 12,
      body: (
        <div>
          <PagesIndex.Formikform
            fieldtype={fields.filter((field) => !field.showWhen)}
            show_submit={true}
            formik={formik}
            btn_name="Submit"
          />
        </div>
      ),
    },

    {
      size: 12,
      body: (
        <div>
          <PagesIndex.TableWithCustomPeginationNew123
            data={TableData}
            // columns={columns}
            initialRowsPerPage={25}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields}
            UserFullButtonList={UserFullButtonList}
            showIndex={true}
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
        </div>
      ),
    },
  ];

  return (
    <>
      <Split_Main_Containt
        title="Request On/Off"
        add_button={false}
        btnTitle="Add"
        route="/add"
        cardLayouts={cardLayouts}
      />

      <ReusableModal
        show={ShowModal}
        onClose={setShowModal}
        title={"ON-OFF Edit For Thursday"}
        size={"sm"}
        body={
          <PagesIndex.Formikform
            fieldtype={fields1.filter((field) => !field.showWhen)}
            show_submit={true}
            formik={formik1}
            btn_name="Submit"
          />
        }
        primaryButtonText="Save Changes"
        secondaryButtonText="Close"
        showFooter={false}
        // onPrimaryAction={handleSave}
      />
    </>
  );
};

export default RequestOnOff;
