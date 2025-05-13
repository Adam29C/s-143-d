import React from "react";
import PagesIndex from "../../PagesIndex";

const EmployeeList = () => {
  const token = localStorage.getItem("token");

  //navigate
  const navigate = PagesIndex.useNavigate();
  const [visible, setVisible] = PagesIndex.useState(false);

  const [adminId, setAdminId] = PagesIndex.useState();

  const [Refresh, setRefresh] = PagesIndex.useState(false);

  const fetchData = async (page, rowsPerPage, searchQuery ) => {
    const payload = {
      page: page,
      limit: rowsPerPage,
      search :searchQuery,
    };

    try {
      const response = await PagesIndex.admin_services.EMPLOYEE_GET_LIST_API(
        payload,
        token
      );
      const totalRows = response?.recordsTotal || 5;
      let mainRes = response.data;

      return { mainRes, totalRows };
    } catch {}
  };
  PagesIndex.useEffect(() => {
    fetchData();
  }, []);

  const visibleFields = [
    {
      name: "User Name",
      value: "username",
      sortable: true,
    },
    {
      name: "Name",
      value: "name",
      sortable: false,
    },
    {
      name: "Login Status",
      value: "loginStatus",
      sortable: true,
    },
    {
      name: "Change Password",
      value: "Change Password",
      isButton: true,
      buttonColor: (row) =>
        "btn btn-dark btn-rounded width-xs waves-effect waves-light btn-sm",
      Conditions: (row) => {
        handleActionBtn(row, 0);
      },
    },
    {
      name: "Block Employee",
      isButton: true,
      value: (row) => (row.banned ? "Unblock" : "Block"),
      buttonColor: (row) => (row.banned ? "success" : "danger"),
      Conditions: (row) => {
        handleActionBtn(row, 1);
      },
    },
    {
      name: "Edit Employee",
      value: "Edit Employee",
      isButton: true,
      buttonColor: "info",
      Conditions: (row) => {
        handleActionBtn(row, 2);
      },
    },
    {
      name: "Delete Employee",
      value: "Delete Emp",
      isButton: true,
      buttonColor: "danger",
      Conditions: (row) => {
        handleActionBtn(row, 3);
      },
    },
  ];

  const handleActionBtn = (row, buttonStatus) => {
    switch (buttonStatus) {
      case 0:
        handleAdd(row);
        break;
      case 1:
        handleStatusUpdate(row);
        break;
      case 2:
        navigate(`edit?EmpId/${row._id}`, { state: { row } });
        break;
      case 3:
        handleDelete(row);
        break;
      default:
        break;
    }
  };

  //handle block and unblock status function
  const handleStatusUpdate = async (row) => {
    try {
      let apidata = {
        adminId: row._id,
        status: row.banned === 1 ? 0 : 1,
      };

      const response = await PagesIndex.admin_services.BLOCK_EMPLOYEE_API(
        apidata,
        token
      );

      if (response?.status) {
        setRefresh(!Refresh);
        PagesIndex.toast.success(response.message);
      }
    } catch (error) {
      PagesIndex.toast.error(error);
    }
  };

  //delete fund mode list start
  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Employee?"
    );
    if (!confirmDelete) return;
    try {
      const apidata = {
        id: row?._id,
      };
      const res = await PagesIndex.admin_services.DELETE_EMPLOYEE(
        apidata,
        token
      );

      if (res.status) {
        setRefresh(!Refresh);
        PagesIndex.toast.success(res.message);
      }
    } catch (error) {}
  };

  const formik = PagesIndex.useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.password) {
        errors.password = PagesIndex.valid_err.PASSWORD_ERROR;
      } else if (!PagesIndex.Password_Rejex(values.password)) {
        errors.password = PagesIndex.valid_err.PASSWORD__LENGTH_ERROR;
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = PagesIndex.valid_err.CONFIRM_ERROR;
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword =
          PagesIndex.valid_err.CONFIRM_AND_NEW_PASSWORD_ERROR;
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        let data = {
          adminId: adminId,
          password: values.password,
        };
        const res =
          await PagesIndex.admin_services.EMPLOYEE_CHANGE_PASSWORD_API(
            data,
            token
          );

        if (res?.status) {
          PagesIndex.toast.success(res?.message);
          setVisible(false);
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
      name: "password",
      label: "Password",
      type: "password",
      label_size: 12,
      col_size: 12,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      label_size: 12,
      col_size: 12,
    },
  ];

  const handleAdd = (row) => {
    setAdminId(row?._id);
    formik.resetForm({
      values: {
        password: "",
        confirmPassword: "",
      },
    });
    setVisible(true);
  };

  return (
    <PagesIndex.Main_Containt add_button={false} title="Employee List">
      <PagesIndex.TableWithCustomPeginationNew
        fetchData={fetchData}
        columns={visibleFields}
        showIndex={true}
        Refresh={Refresh}
      />

      <PagesIndex.ModalComponent
        visible={visible}
        setVisible={setVisible}
        fields={fields}
        form_title="Change Password"
        formik={formik}
      />
      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default EmployeeList;
