import React from "react";

function NotFound() {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li class="breadcrumb-item">
            {/* <i class="bi bi-house-door-fill"></i> */}
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Page Not Found
          </li>
        </ol>
      </nav>
      <div className="NotFound">
        <h1> Page Not Found</h1>
      </div>
    </>
  );
}

export default NotFound;
