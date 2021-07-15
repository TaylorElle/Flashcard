import React from "react";
import { Link } from "react-router-dom";
import readDeck from "../utils/api";

function Deck({ oneDeck }) {
  return (
    // NAV BAR

    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li class="breadcrumb-item">
            {/* <i class="bi bi-house-door-fill"></i> */}
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            deck.name{" "}
          </li>
        </ol>
      </nav>
      {/* // FORM */}
      <h2>deck.name</h2>
    </>
  );
}
export default Deck;
