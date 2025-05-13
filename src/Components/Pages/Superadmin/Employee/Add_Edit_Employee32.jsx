import React, { useEffect, useMemo, useState } from "react";
import FormWizardComponent from "../../../Helpers/MultiStepForm";
import Main_Containt from "../../../Layout/Main/Main_Containt";
import PagesIndex from "../../PagesIndex";
import { Get_permissions } from "../../../Redux/slice/CommonSlice";
import { filterSidebarItems } from "../../../Layout/SIdebar/FilteredPermissions";
import { admin_Sidebar } from "../../../Layout/SIdebar/Sidebar_data";

import { Formik, Field, Form, ErrorMessage } from "formik";

function AddEmployee() {
  //get token in localstorage
  const token = localStorage.getItem("token");
  //get userid in localstorage
  let { user_id, role } = JSON.parse(localStorage.getItem("userdetails"));

  //get all permission in redux
  const { getPermissions } = PagesIndex.useSelector(
    (state) => state.CommonSlice
  );

  // console.log("getPermissions" ,getPermissions);

  //use navigate dispatch location hooks
  const navigate = PagesIndex.useNavigate();
  const dispatch = PagesIndex.useDispatch();
  const location = PagesIndex.useLocation();

  //all states
  const [getEmplData, setGetEmpData] = useState();

  //destructure data for update form
  const userData = location?.state?.row;

  //destructure data for get single user permission for update form
  const userdataPermission = getEmplData && getEmplData?.col_view_permission;

  //destructure for get all permissions
  const getAllPermissions =
    getPermissions && getPermissions?.col_view_permission;


    console.log("getAllPermissions" ,getAllPermissions);
    console.log("userdataPermission" ,userdataPermission);
    
  //set for show dynamic permission on add and update form
  const permissionOptions = getAllPermissions?.map((permission) => ({
    labelName: permission,
    name: permission,
  }));

  //get all permission api
  const getPermissionApi = () => {
    dispatch(Get_permissions(user_id));
  };

  //get single employee api
  const getSingleEmployee = async () => {
    if (userData?._id) {
      const res = await PagesIndex.admin_services.SINGLE_EMPLOYEE_GET_LIST_API(
        userData?._id,
        token
      );
      setGetEmpData(res?.data);
    }
  };

  //call get permission and get single employee api
  PagesIndex.useEffect(() => {
    getPermissionApi();
    getSingleEmployee();
  }, []);

  //handle fields form for formwizard first tabs
  const formik = PagesIndex.useFormik({
    initialValues: {
      employeeName: userData?.name || "",
      username: userData?.username || "",
      password: userData?.password || "",
      designation: userData?.designation || "",
      loginPermission: userData?.loginPermission || "",
    },
    validate: (values) => {
      const errors = {};
      const requiredFields = [
        "employeeName",
        "username",
        "password",
        "designation",
      ];
      requiredFields.forEach((field) => {
        if (!values[field]) {
          errors[field] = PagesIndex.valid_err[`${field.toUpperCase()}_ERROR`];
        }
      });
      return errors;
    },
    onSubmit: async (values) => {},
  });

  //fields for formwizard first tabs
  const fields = [
    {
      name: "employeeName",
      label: "Employee Name",
      type: "text",
      label_size: 12,
      col_size: 6,
    },
    {
      name: "username",
      label: "User Name",
      type: "text",
      label_size: 12,
      col_size: 6,
      // disable: !!userData,
    },
    {
      name: "password",
      label: "Password",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: !!userData,
    },
    {
      name: "designation",
      label: "Designation",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: !!userData,
    },
    {
      name: "loginPermission",
      label: "Select Login Permission",
      type: "select",
      label_size: 12,
      col_size: 6,
      options: [
        { label: "Both", value: 0 },
        { label: "Dashboard", value: 1 },
        { label: "Application", value: 2 },
      ],
    },
  ];

  const filteredFields = userData
    ? fields.filter(
        (field) =>
          field.name !== "password" &&
          field.name !== "designation" &&
          field.name !== "employeeName"
      )
    : fields;



    // console.log("permissionOptions" ,permissionOptions);
    
  //initial value set for permission checkbox fields
  const initialValues = useMemo(() => {
    if (!permissionOptions) return {};
    return permissionOptions.reduce((acc, option) => {
      acc[option.name] =
        Array.isArray(userdataPermission) &&
        userdataPermission.includes(option.name);
      return acc;
    }, {});
  }, [permissionOptions, userdataPermission]);



  const formik1 = PagesIndex.useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validate: () => ({}),
    onSubmit: async (values) => {


    },
  });

  let arra = [];
  admin_Sidebar.forEach((item) => {
    let nastedarra = [];
    if (item.NestedElement?.length > 0) {
      item.NestedElement.forEach((nestedItem) => {
        nastedarra.push({
          id: nestedItem.id,
          label: nestedItem.title,
          permission: nestedItem.permission,
          checked: false,
        });
      });
    }
    arra.push({
      id: item.id,
      label: item.title,
      permission: item.permission,
      checked: false,
      Nasted: nastedarra,
    });
  });

  const fields1 = [
    {
      name: "permission",
      type: "checkbox",
      label_size: 12,
      title_size: 12,
      col_size: 4,
      options:
        arra &&
        arra.map((x) => {
          return {
            id: x.id,
            name: x.label,
            checked: false,
            permission: x.permission,
            Nasted: x.Nasted.map((y) => {
              return {
                id: y.id,
                name: y.label,
                checked: false,
                permission: y.permission,
              };
            }),
          };
        }),
    },
  ];

  //handlecomplete for complete the add and update form
  const handleComplete = async () => {
    const PermissionKeys = Object.keys(formik1.values).filter(
      (key) => formik1.values[key]
    );
    // console.log("formik1.values", formik1.values);
    // console.log("arra", arra);

    let arabc = arra.filter((item) => {
      PermissionKeys.map((x) => {
        return item.label === x;
      });
    });

    // console.log("arabc", arabc);

    const PermissionKeysresult =
      PermissionKeys.length > 0 ? PermissionKeys : [null];

    // console.log("arra", formik1.values);
    // console.log("PermissionKeysresult", PermissionKeysresult);

    const updatereq = {
      username: formik.values.username,
      loginPermission: formik.values.loginPermission,
      colViewPermission: PermissionKeysresult,
      id: userData?._id,
    };

    const addreq = {
      username: formik.values.username,
      name: formik.values.employeeName,
      loginPermission: formik.values.loginPermission,
      password: formik.values.password,
      designation: formik.values.designation,
      colViewPermission: PermissionKeysresult,
      loginFor: 1,
    };

    // console.log("PermissionKeysresult", PermissionKeysresult);

    return;
    const res = userData
      ? await PagesIndex.admin_services.UPDATE_EMPLOYEE(updatereq, token)
      : await PagesIndex.admin_services.CREATE_EMPLOYEE(addreq, token);

    if (res.status) {
      PagesIndex.toast.success(res.message);
      setTimeout(() => {
        navigate("/admin/employees");
      }, 1500);
    } else {
      PagesIndex.toast.error(res?.response?.data?.message);
    }
  };

  // const filteredSidebar = filterSidebarItems(
  //   admin_Sidebar,
  //   role,
  //   permissionOptions
  // );

  // console.log("filteredSidebar", admin_Sidebar);

  const tabs = [
    {
      title: "Personal details",
      icon: "ti-user",
      content: (
        <PagesIndex.Formikform
          fieldtype={filteredFields.filter((field) => !field.showWhen)}
          formik={formik}
          btn_name="Next"
          show_submit={false}
        />
      ),
    },
    {
      title: "Manage Permissions",
      icon: "ti-check",
      content: (
        <PagesIndex.Formikform
          fieldtype={fields1.filter((field) => !field.showWhen)}
          formik={formik1}
          btn_name="Add Panel"
        />
      ),
    },
  ];

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    return errors;
  };

  return (
    <Main_Containt
      title={userData ? "Edit Employee" : "Register New Employee"}
      col_size={12}
      add_button={true}
      route="/admin/employees"
      btnTitle="Back"
    >
      <FormWizardComponent
        shape="circle"
        color="rgb(50 111 95)"
        stepSize="sm"
        onComplete={handleComplete}
        tabs={tabs}
      />

      <PagesIndex.Toast />
    </Main_Containt>
  );
}

export default AddEmployee;
