//create deck button to be shown on home page
// A "Create Deck" button is shown and clicking it brings the user to the Create Deck screen.
import React from "react";
import { Link } from "react-router-dom";
import { createDeck, listDecks, deleteDeck } from "../utils/api";
import { useState } from "react";

//when submit is clicked, want to take the info from tetarea/input (from the form), call createDeck with it
//useState to "save" the info from the inputs - so we can track it and use it
//then add that state into into an object and then call the createDeck
//LOOKUP: controlled Inputs ... controlled data

//envent handler for sumbit
//test it and see if it works
//async

function DeckCreation() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = { name: { name }, description: { description } };
    createDeck(newDeck).then(console.log);
    // console.log(createDeck(newDeck));
  };
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
          value={name}
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Deck Name"
          onChange={(event) => setName(event.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          value={description}
          id="exampleFormControlTextarea1"
          placeholder="Brief Description of the deck"
          onChange={(event) => setDescription(event.target.value)}
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
          onClick={handleSubmit}
          //TO DO: FIND A WAY TO SUBMIT THE DECK AND THEN RETURN HOME
        >
          Submit
        </button>
      </Link>
    </>
  );
}

export default DeckCreation;
