import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createCard } from "../utils/api";

// /decks/:deckId/cards/new is the path
function AddCard({ cards, setCards, deck, setDeck }) {
  const initialState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.name);
  };

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    createCard(deck.id, formData).then((result) => {
      // console.log(result);
      history.push(`/decks/${result.deckId}`);
    });
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deck.id}`}>{deck.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="front">
          Front
          <input type="text" name="front" id="front" onChange={handleChange} />
        </label>
        <br />
        <label htmlFor="back">
          Back
          <textarea name="back" id="back" onChange={handleChange} />
        </label>
        <br />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.push("/")}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddCard;
