import React from 'react'
import PagesIndex from '../../PagesIndex';
const WithdrawRequest = () => {



  const columns = [
    {
      name: "Day",
      selector: (row) => row.title,
    },
    {
      name: "Request on/off	",
      selector: (row) => row.year,
    },
    {
      name: "Message",
      selector: (row) => row.year,
    },
    {
      name: "Updated At	",
      selector: (row) => row.year,
    },
    {
      name: "Actions",
      selector: (cell, row) => (
        <div style={{ width: "120px" }}>
          <div>
            <PagesIndex.Link className="edit-icon" to={"#"} state={cell}>
              <span data-toggle="tooltip" data-placement="top" title="Edit">
                <i class="ti-marker-alt fs-5 mx-1 "></i>
               
              </span>
            </PagesIndex.Link>

          
          </div>
        </div>
      ),
    },

  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  const formik = PagesIndex.useFormik({
    initialValues: {
      searchType: "",
      reportType: "",
      date: "",
    },
    validate: (values) => {
    },

    onSubmit: async (values) => {
    },
  });

  const fields = [
    {
      name: "fromtime",
      label: "From Time",
      type: "time",
      title_size: 4,
      col_size: 4,
    },
    {
      name: "totime",
      label: "To Time",
      type: "time",
      title_size: 4,
      col_size: 4,
    },
    {
      name: "count",
      label: "Withdraw Request Count",
      type: "number",
      label_size: 12,
      col_size: 4,
    },
  ];

  return (
    <>
  <PagesIndex.WalletMain title="Withdraw Request ON/OFF" columns={columns} data={data} fields={fields} formik={formik}   showsubmitbtn={true}/>
    </>
  );
};

export default WithdrawRequest;
