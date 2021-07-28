import React from "react";
import { useHistory } from "react-router-dom";

function Card({ formData, handleChange, handleSubmit, deckId }) {
  const history = useHistory();

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="front">
        Front
        <textarea
          type="text"
          name="front"
          id="front"
          value={formData.front}
          onChange={handleChange}
        />
      </label>
      <br />
      <label htmlFor="back">
        Back
        <textarea
          type="text"
          name="back"
          id="back"
          value={formData.back}
          onChange={handleChange}
        />
      </label>
      <br />
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => history.push(`/decks/${deckId}`)}
      >
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Card;
