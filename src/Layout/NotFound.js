import React from "react";

function NotFound() {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            {/* <i class="bi bi-house-door-fill"></i> */}
            <a href="/">Home</a>
          </li>
        </ol>
      </nav>
      <div className="NotFound">
        <h1> Not Found</h1>
      </div>
    </div>
  );
}

export default NotFound;
