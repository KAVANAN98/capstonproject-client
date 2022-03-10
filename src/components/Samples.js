import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, FormControl, Table } from "react-bootstrap";
import EditUser from "./EditUser";
import GlucometryForm from "./glucometry/GlucometryForm";
import GlucometryReport from "./glucometry/GlucometryReport";
import Haematology from "./haematology/Haematology";
import HaematologyReport from "./haematology/HaematologyReport";
import Thyroidform from "./thyroid/Thyroidform";
import ThyroidReport from "./thyroid/ThyroidReport";
import Navigationbar from './Navigationbar'


const Samples = () => {
  // table data
  const [samples, setsamples] = useState([]);
  const [matchdata, setmatchdata] = useState([]);

  const [showSearch, setshowSearch] = useState(false);

  const search = (e) => {
    console.log(e.target.value);
    var searchinput = e.target.value;

    const Match = samples.filter((mch, inx, arr) => {
      // console.log(mch);0
      console.log(mch.name.toLowerCase());
      return mch.name.toLowerCase().startsWith(searchinput.toLowerCase());
    });

    console.log(Match, "--------match");
    setmatchdata(Match);

    if (Match.length > 0) {
      setshowSearch(true);
    } else {
      setshowSearch(false);
    }
  };

  console.log(showSearch, "------------showSearch");

  //====================== FORMS MODALS  ======================//

  // Haematology model
  const [haemForm, sethaemForm] = useState(false);
  const [haemid, sethaemid] = useState();

  // Thyroid model
  const [thyroidForm, setThyroidForm] = useState(false);
  const [thyrid, setthyrid] = useState();

  // Glucometry model
  const [GlucomForm, setGlucomForm] = useState(false);
  const [Glucid, setGlucid] = useState();

  //====================== REPORTS MODALS  ======================//

  const [haemReport, sethaemReport] = useState(false);
  const [hemoData, sethemoData] = useState();

  // Thyroid model
  const [thyroidReport, setThyroidReport] = useState(false);
  const [thyrData, setthyrData] = useState();

  // Glucometry model
  const [GlucomReport, setGlucomReport] = useState(false);
  const [glucData, setglucData] = useState();

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    console.log("in sample");
    try {
      // const res = await fetch('/sample', {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      // })
      const data = await axios.get(`/sample`);

      // const data = await res.json();
      console.log(data, "---------------");
      setsamples(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  //====================== FORMS MODALS OPEN  ======================//

  const HaemaModel = (id) => {
    sethaemid(id);
    sethaemForm(true);
  };

  const ThyroidModal = (id) => {
    setthyrid(id);
    setThyroidForm(true);
  };

  const GlucometryModal = (id) => {
    setGlucid(id);
    setGlucomForm(true);
  };

  //====================== REPORTS MODALS OPEN  ======================//

  const HemoatologyReport = (data) => {
    console.log(data, "-----------------HemoatologyReport");
    sethemoData(data);
    sethaemReport(true);
  };

  const ThyroidReports = (data) => {
    console.log(data, "-----------------ThyroidReports");
    setthyrData(data);
    setThyroidReport(true);
  };

  const GlucometryReports = (data) => {
    console.log(data, "-----------------GlucometryReports");
    setglucData(data);
    setGlucomReport(true);
  };

  const [data, setdata] = useState();
  const [showedit, setshowedit] = useState(false);

  const Edit = async (editdata) => {
    setdata(editdata);
    setshowedit(true);
  };

  return (
    <>
      <Navigationbar />
      <div className="cd">
        <div className="d-flex justify-content-center">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2 search"
            aria-label="Search"
            onChange={(e) => search(e)}
          />
        </div>

        <Table hover className="tablecard p-5" variant="dark" responsive>
          <thead>
            <tr>
              <th className="th">Sample Date</th>
              <th className="th">Patient Name</th>
              <th className="th">Email</th>
              <th className="th">Sample ID</th>
              <th className="th">haemaology </th>
              <th className="th">Thyroid Profile </th>
              <th className="th">Glucometry </th>
              <th className="th">edituser </th>
            </tr>
          </thead>

          <tbody>

            {!showSearch && samples.map((val, inx) => {
              return (
                <tr key={inx}>
                  <td>{val.date}</td>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{inx + 101}</td>
                  <td>
                    {!val.test ? (
                      <Button variant="info">N/A</Button>
                    ) : val.status.hemo ? (
                      val.heamatology.length > 0 ? (
                        <Button
                          variant="danger"
                          onClick={() => {
                            HemoatologyReport(val.heamatology);
                          }}
                        >
                          {" "}
                          view report{" "}
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() => {
                            HaemaModel(val._id);
                          }}
                        >
                          add Details
                        </Button>
                      )
                    ) : (
                      <Button variant="light">N/A</Button>
                    )}
                  </td>
                  <td>
                    {!val.test ? (
                      <Button variant="info">N/A</Button>
                    ) : val.status.thyr ? (
                      val.thyroid.length > 0 ? (
                        <Button
                          variant="danger"
                          onClick={() => {
                            ThyroidReports(val.thyroid);
                          }}
                        >
                          view report
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() => {
                            ThyroidModal(val._id);
                          }}
                        >
                          add Details
                        </Button>
                      )
                    ) : (
                      <Button variant="light">N/A</Button>
                    )}
                  </td>
                  <td>
                    {!val.test ? (
                      <Button variant="info">N/A</Button>
                    ) : val.status.glu ? (
                      val.glucometry.length > 0 ? (
                        <Button
                          variant="danger"
                          onClick={() => {
                            GlucometryReports(val.glucometry);
                          }}
                        >
                          View Reports
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() => {
                            GlucometryModal(val._id);
                          }}
                        >
                          add Details
                        </Button>
                      )
                    ) : (
                      <Button variant="light">N/A</Button>
                    )}
                  </td>
                  <td> {" "}<Button onClick={() => { Edit(val) }}>{" "}Edit</Button>{" "}</td>
                </tr>
              );
            })}

            {showSearch && matchdata.map((val, inx) => {
              return (
                <tr key={inx}>
                  <td>{val.date}</td>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{inx + 101}</td>
                  <td>
                    {!val.test ? (
                      <Button variant="light">N/A</Button>
                    ) : val.status.hemo ? (
                      val.heamatology.length > 0 ? (
                        <Button
                          variant="danger"
                          onClick={() => {
                            HemoatologyReport(val.heamatology);
                          }}
                        >
                          {" "}
                          view report{" "}
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() => {
                            HaemaModel(val._id);
                          }}
                        >
                          add Details
                        </Button>
                      )
                    ) : (
                      <Button variant="light">N/A</Button>
                    )}
                  </td>
                  <td>
                    {!val.test ? (
                      <Button variant="light">N/A</Button>
                    ) : val.status.thyr ? (
                      val.thyroid.length > 0 ? (
                        <Button
                          variant="danger"
                          onClick={() => {
                            ThyroidReports(val.thyroid);
                          }}
                        >
                          view report
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() => {
                            ThyroidModal(val._id);
                          }}
                        >
                          add Details
                        </Button>
                      )
                    ) : (
                      <Button variant="light">N/A</Button>
                    )}
                  </td>
                  <td>
                    {!val.test ? (
                      <Button variant="light">N/A</Button>
                    ) : val.status.glu ? (
                      val.glucometry.length > 0 ? (
                        <Button
                          variant="danger"
                          onClick={() => {
                            GlucometryReports(val.glucometry);
                          }}
                        >
                          View Reports
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() => {
                            GlucometryModal(val._id);
                          }}
                        >
                          add Details
                        </Button>
                      )
                    ) : (
                      <Button variant="light">N/A</Button>
                    )}
                  </td>
                  <td> {" "}<Button onClick={() => { Edit(val) }}>{" "}Edit</Button>{" "}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Haematology
          haemForm={haemForm}
          sethaemForm={sethaemForm}
          id={haemid}
        />
        <Thyroidform
          thyroidForm={thyroidForm}
          setThyroidForm={setThyroidForm}
          id={thyrid}
        />
        <GlucometryForm
          GlucomForm={GlucomForm}
          setGlucomForm={setGlucomForm}
          id={Glucid}
        />

        {samples.length > 0 && (
          <HaematologyReport
            haemReport={haemReport}
            sethaemReport={sethaemReport}
            hemoData={hemoData}
            sethaemForm={sethaemForm}
          />
        )}


        {samples.length > 0 && (
          <ThyroidReport
            thyroidReport={thyroidReport}
            setThyroidReport={setThyroidReport}
            thyrData={thyrData}
            setThyroidForm={setThyroidForm}
          />
        )}


        {samples.length > 0 && (
          <GlucometryReport
            GlucomReport={GlucomReport}
            setGlucomReport={setGlucomReport}
            glucData={glucData}
            setGlucomForm={setGlucomForm}
          />
        )}


      </div>

      {data && <EditUser getdata={getdata} showedit={showedit} setshowedit={setshowedit} data={data && data} />}
    </>
  );
};

export default Samples;
