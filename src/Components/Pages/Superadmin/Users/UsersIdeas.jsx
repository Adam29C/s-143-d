import React from "react";
import PagesIndex from "../../PagesIndex";
// import { show } from "../../../Utils/Common_Date";

const UsersIdeas = () => {
  const token = localStorage.getItem("token");

  const [Refresh, setRefresh] = PagesIndex.useState(false);

  const fetchData = async (page, rowsPerPage, searchQuery ) => {
    const payload = {
      page: page,
      limit: rowsPerPage,
      search :searchQuery,
    };

    try {
      const response = await PagesIndex.common_services.GET_USERS_IDEAS(
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
      name: "Idea",
      value: "idea",
      sortable: false,
    },
    {
      name: "User Name",
      value: "username",
      sortable: true,
    },
    {
      name: "Created-At",
      value: "createdAt",
      sortable: true,
    },
  ];

  return (
    <PagesIndex.Main_Containt add_button={false} title="Users Idea's">
      <PagesIndex.TableWithCustomPeginationNew
        fetchData={fetchData}
        columns={visibleFields}
        // UserFullButtonList={UserFullButtonList}
        showIndex={true}
        Refresh={Refresh}
      />
    </PagesIndex.Main_Containt>
  );
};

export default UsersIdeas;
