import Main_Containt from "../../Layout/Main/Main_Containt";
import Data_Table from "../../Helpers/Datatable";
import { Get_Year_Only } from "../../Utils/Common_Date";
import Toggle from "../../Helpers/Toggle";
import PagesIndex from "../../Pages/PagesIndex";
const EmployeeList = () => {
  const [loading, setLoading] = PagesIndex.useState(false);
  const [data, setData] = PagesIndex.useState([]);
  const userId = localStorage.getItem("userId");

  
  const getList = async () => {
    const res = await PagesIndex.admin_services.EMPLOYEE_GET_LIST_API(userId);
    setData(res?.data?.details);
  };

  PagesIndex.useEffect(() => {
    getList();
  }, []);

  const columns = [
    {
      name: "Employee Name",
      selector: (row) => row.employeeName,
    },

    {
      name: "Designation",
      selector: (row) => row.designation,
    },
    {
      name: "Block",
      selector: (row) => (
        <>
          <Toggle check={row.isBlock} />
        </>
      ),
    },

    {
      name: "User Name",
      selector: (row) => row.username,
    },

    {
      name: "created At",
      selector: (row) => Get_Year_Only(row.createdAt),
    },
    {
        name: "actions",
        selector: (cell, row) => (
          <div style={{ width: "120px" }}>
            <div>
              <PagesIndex.Link className="edit-icon" to={"/admin/employee/edit"} state={cell}>
                <span data-toggle="tooltip" data-placement="top" title="Edit">
                  <i class="ti-marker-alt fs-5 mx-1 "></i>
                </span>
              </PagesIndex.Link>
  
              <PagesIndex.Link
               className="delete-icon"
                href="#"
                // onClick={() => handleDelete(cell?._id)}
              >
                <span data-toggle="tooltip" data-placement="top" title="Delete">
                  <i class="ti-trash fs-5 mx-1 "></i>
                </span>
              </PagesIndex.Link>
            </div>
          </div>
        ),
      },
  ];

  return (
    <div>
      <Main_Containt add_button={false} route="/admin/employee/add">
        <Data_Table isLoading={loading} columns={columns} data={data} />
      </Main_Containt>
    </div>
  );
};

export default EmployeeList;
