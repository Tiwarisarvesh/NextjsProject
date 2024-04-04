import React from "react";
import AdminHader from "../../../component/adminHeader";

function index() {
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <AdminHader />
          <div className="container">
            {/* Start Main Containt */} benjiyam tower

            <div class="row">
              <div class="col-6">Exerices</div>
              <div class="col-6"><button type="button" class="btn btn-primary">Add Exerices</button></div>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>

            {/* End Main Containt */}
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
