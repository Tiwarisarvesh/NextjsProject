import React from 'react'

function Pagination(props) {
  return (
    <div>
       <div className="row">
                  <div className="col-xl-9">
                  <h6 className="float-right">Total Data : {props.name}</h6>
                    </div>
                    <div className="col-xl-3">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                          <li className="page-item"><a className="page-link" href="#">1</a></li>
                          <li className="page-item"><a className="page-link" href="#">2</a></li>
                          <li className="page-item"><a className="page-link" href="#">3</a></li>
                          <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                      </nav>    
                    </div>
                  </div>
    </div>
  )
}

export default Pagination
