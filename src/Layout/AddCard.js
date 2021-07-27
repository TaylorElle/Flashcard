import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

// /decks/:deckId/cards/new is the path
function AddCard({ cards, setCards }) {
  const initialState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };
  const [formData, setFormData] = useState(initialState);
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    const readingDeck = async () => {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        setDeck(() => ({ ...deckData }));
        // setReRender(!reRender);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(error);
        } else {
          throw error;
        }
      }
    };

    readingDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

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
    createCard(deckId, formData).then((result) => {
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
            <a href={`/decks/${deckId}`}>{deck.name}</a>
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
          <textarea
            type="text"
            name="front"
            id="front"
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="back">
          Back
          <textarea type="text" name="back" id="back" onChange={handleChange} />
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
