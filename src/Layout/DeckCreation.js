//create deck button to be shown on home page
// A "Create Deck" button is shown and clicking it brings the user to the Create Deck screen.
import React from "react";
import { Link } from "react-router-dom";
import { createDeck } from "../utils/api";

function deckCreation() {
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
            Create Deck
          </li>
        </ol>
      </nav>
      {/* // FORM */}
      <h2>Create Deck</h2>

      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Deck Name"
        ></input>
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          placeholder="Brief Description of the deck"
          rows="2"
        ></textarea>
      </div>
      {/* //BUTTONS */}
      <Link to="/">
        <button type="button" className="btn btn-secondary">
          Cancel
        </button>
      </Link>
      <Link to="/decks/:deckId">
        <button
          type="submit"
          className="btn btn-primary"
          //TO DO: FIND A WAY TO SUBMIT THE DECK AND THEN RETURN HOME
        >
          Submit
        </button>
      </Link>
    </>
  );
}

export default deckCreation;
