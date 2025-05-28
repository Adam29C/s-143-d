import React, { useEffect, useMemo, useState } from "react";
import FormWizardComponent from "../../../Helpers/MultiStepForm";
import Main_Containt from "../../../Layout/Main/Main_Containt";
import PagesIndex from "../../PagesIndex";
import { Get_permissions } from "../../../Redux/slice/CommonSlice";
import { admin_Sidebar } from "../../../Layout/SIdebar/Sidebar_data";
import { keyMapping } from "./permissions";

console.log("admin_Sidebar", admin_Sidebar);

function AddEmployee() {
  //get token in localstorage
  const token = localStorage.getItem("token");
  //get userid in localstorage
  let { user_id } = JSON.parse(localStorage.getItem("userdetails"));

  //get all permission in redux
  const { getPermissions } = PagesIndex.useSelector(
    (state) => state.CommonSlice
  );

  //use navigate dispatch location hooks
  const navigate = PagesIndex.useNavigate();
  const dispatch = PagesIndex.useDispatch();
  const location = PagesIndex.useLocation();

  //all states
  const [getEmplData, setGetEmpData] = useState();

  //destructure data for update form
  const userData = location?.state?.row;

  //destructure data for get single user permission for update form
  // const userdataPermission = getEmplData && getEmplData?.col_view_permission;
  const userdataPermission = getEmplData && getEmplData?.col_view_permission;

  //destructure for get all permissions
  const getAllPermissions =
    getPermissions && getPermissions?.col_view_permission;

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
      designation: userData?.designation || "Star143 Employee",
      loginPermission: userData?.loginPermission || 0,
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
    initialValues: {},
    enableReinitialize: true,
    validate: () => ({}),
    onSubmit: async (values) => {},
  });

  const formik22 = formik1;

  let arra = [];
  admin_Sidebar.forEach((item) => {
    let nastedarra = [];
    if (item.NestedElement?.length > 0) {
      item.NestedElement.forEach((nestedItem) => {
        nastedarra.push({
          id: nestedItem.id,
          label: nestedItem.title,
          permission: nestedItem.permission,
          checked: userdataPermission?.includes(nestedItem.permission) || false,
        });
      });
    }
    arra.push({
      id: item.id,
      label: item.title,
      permission: item.permission,
      checked: userdataPermission?.includes(item.permission) || false,
      Nasted: nastedarra,
    });
  });

  const fields1 = [
    {
      pagetype: true,
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
            checked: x.checked,
            permission: x.permission,
            Nasted: x.Nasted.map((y) => {
              return {
                id: y.id,
                name: y.label,
                checked: y.checked,
                permission: y.permission,
              };
            }),
          };
        }),
    },
  ];

  //handlecomplete for complete the add and update form
  const handleComplete = async () => {
    const PermissionKeys = Object.keys(formik22.values).filter(
      (key) => formik22.values[key]
    );

    const PermissionKeysresult =
      PermissionKeys.length > 0 ? PermissionKeys : [null];

    // Reverse mapping: Swap key and value of keyMapping for efficient lookup
    const reverseKeyMapping = Object.fromEntries(
      Object.entries(keyMapping).map(([key, value]) => [value, key])
    );
    // console.log('reverseKeyMapping',reverseKeyMapping)

    const transformedFormik22 = Object.fromEntries(
      Object.entries(formik22.values).map(([key, value]) => {
        // Replace the key if it exists in reverseKeyMapping
        const newKey = reverseKeyMapping[key] || key;
        return [newKey, value];
      })
    );

    const addResult = Object.keys(transformedFormik22).filter(
      (key) => transformedFormik22[key] === true
    );

    let result = [];
    result = userdataPermission;
    if (userdataPermission !== undefined) {
      result = userdataPermission.filter(
        (key) => transformedFormik22[key] != false
      ); // Remove keys with `false` values

      Object.keys(transformedFormik22).forEach((key) => {
        if (transformedFormik22[key] === true && !result.includes(key)) {
          result.push(key);
        }
      });
    }

    const updatereq = {
      username: formik.values.username,
      loginPermission: formik.values.loginPermission,
      colViewPermission: result,
      id: userData?._id,
    };

    const addreq = {
      username: formik.values.username,
      name: formik.values.employeeName,
      loginPermission: formik.values.loginPermission,
      password: formik.values.password,
      designation: formik.values.designation,
      colViewPermission: addResult,
      loginFor: 1,
    };


    console.log("addreq" ,addreq);
    console.log("updatereq" ,updatereq);
    
    // return;
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

  const tabs = [
    {
      title: "Personal details",
      icon: "ti-user",
      content: (
        <>
          <PagesIndex.Formikform
            fieldtype={filteredFields.filter((field) => !field.showWhen)}
            formik={formik}
            btn_name="Next"
            show_submit={false}
          />
        </>
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
