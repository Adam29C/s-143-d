import React, { useState, useEffect } from "react";
import Main_Containt from "../../../Layout/Main/Main_Containt";
import ModalComponent from "../../../Helpers/Modal/ModalComponent";
import PagesIndex from "../../PagesIndex";
import { toast } from "react-toastify";

const UpiIdList = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");

  //all state
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  //get upi list function
  const getList = async () => {
    setLoading(true);
    try {
      const res = await PagesIndex.admin_services.GET_UPI_LIST_API(token);
      if (res?.status) {
        setData(res?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  //handle status update function for upi list
  const handleStatusUpdate = async (event, value) => {
    try {
      const apidata = {
        id: value?._id,
        status: event === "true",
        stat: 1,
      };
      const response = await PagesIndex.admin_services.BLOCK_UPI_LIST_API(
        apidata,
        token
      );

      if (response?.status) {
        toast.success(response.message);
        getList();
      } else {
        alert(response.message);
      }
    } catch (error) {
      PagesIndex.toast.error(error);
    }
  };

  //formik form
  const formik = PagesIndex.useFormik({
    initialValues: {
      upiName: "",
      status: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.upiName) {
        errors.upiName = PagesIndex.valid_err.EMPTY_UPI_ERROR;
      }
      if (!values.status) {
        errors.status = PagesIndex.valid_err.STATUS_ERROR;
      }
      return errors;
    },

    onSubmit: async (values) => {
      try {
        let apidata = {
          upiId: values.upiName,
          status: values.status === "true",
        };

        const res = await PagesIndex.admin_services.ADD_UPI_LIST_API(
          apidata,
          token
        );
        if (res?.status) {
          PagesIndex.toast.success(res?.message);
          getList();
          setVisible(false);
          formik.setFieldValue("upiName", "");
        } else {
          PagesIndex.toast.error(res.message);
          setVisible(false);
        }
      } catch (error) {
        PagesIndex.toast.error(error);
      }
    },
  });

  const fields = [
    {
      name: "upiName",
      label: "Upi Id",
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
          value: true,
        },
        {
          label: "In-Active",
          value: false,
        },
      ],
    },
  ];

  // Handle Add Button
  const handleAdd = () => {
    setVisible(true);
  };

  //delete upi list start
  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Upi Id?"
    );
    if (!confirmDelete) return;

    try {
      const apidata = {
        id: row?._id,
      };
      const res = await PagesIndex.admin_services.DELETE_UPI_LIST_API(
        apidata,
        token
      );
      if (res.status) {
        getList();
        alert(res?.message);
      }
    } catch (error) {}
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.UPI_ID,
    },

    {
      name: "IsActive",
      selector: (row) => (row.is_Active ? "Active" : "Disable"),
    },

    {
      name: "Status",
      selector: (row) => (
        <div>
          <select
            className="p-1"
            aria-label="Default select example"
            value={row.is_Active}
            onChange={(e) => {
              handleStatusUpdate(e.target.value, row);
            }}
          >
            <option value="false" disbled selected>
              {row.is_Active ? "Active" : "Disable"}
            </option>
            <option value="true">Active</option>
            <option value="false">Disable</option>
          </select>
        </div>
      ),
    },

    {
      name: "Actions",
      selector: (cell, row) => (
        <div style={{ width: "120px" }}>
          <div>
            <span>
              <button
                onClick={() => handleDelete(cell)}
                class="btn btn-danger btn-sm me-2"
              >
                <i class="fa fa-trash mr-1 icon-fs" aria-hidden="true"></i>
                Delete
              </button>
            </span>
          </div>
        </div>
      ),
    },
  ];
  return (
    <Main_Containt
      setVisible={setVisible}
      add_button={false}
      btn_modal={true}
      title="UPI ID List"
      handleAdd={handleAdd}
    >
      <PagesIndex.Data_Table
        isLoading={loading}
        columns={columns}
        data={data}
      />
      <ModalComponent
        visible={visible}
        setVisible={setVisible}
        fields={fields}
        form_title="Add Upi Id"
        formik={formik}
      />
      <PagesIndex.Toast />
    </Main_Containt>
  );
};

export default UpiIdList;
