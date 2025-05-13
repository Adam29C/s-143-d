import React from "react";
import PagesIndex from "../../PagesIndex";
import { Api } from "../../../Config/Api";
const CuttingGroup = () => {
  return (
    <div>
      <PagesIndex.CuttingGroupMain
        title={"Cutting Group"}
        OpenClose={Api.CUTTING_GROUP_OC_LIST}
        OtherGame={Api.CUTTING_GROUP_LIST}
        GetBidData={Api.GET_BID_DATA}
      />
    </div>
  );
};

export default CuttingGroup;
