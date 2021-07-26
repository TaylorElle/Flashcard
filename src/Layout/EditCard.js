// /decks/:deckId/cards/:cardId/edit is the path
// /decks/:deckId/cards/new is the path
// /decks/:deckId/edit is the path
import { readDeck, readCard, updateCard } from "../utils/api";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

function EditCard({ card, setCard, deck }) {
  //initialize state to the card so that i can then use it later when card is updated
  const [formData, setFormData] = useState(card);
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadTheCard() {
      const loadedCard = await readCard(cardId);
      setFormData(loadedCard);
    }
    loadTheCard();
  }, [cardId]);

  // useEffect(() => {
  //   const abortController = new AbortController();

  //   const readTheCard = async () => {
  //     try {
  //       const cardData = await readCard(cardId, abortController.signal);
  //       setCard(() => ({ ...card, ...cardData }));
  //     } catch (error) {
  //       if (error.name === "AbortError") {
  //         console.log(error);
  //       } else {
  //         throw error;
  //       }
  //     }
  //   };

  //   readTheCard();
  //   return () => {
  //     abortController.abort();
  //   };
  // }, [cardId]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    // console.log(event.target.name);
  };

  function handleSubmit(event) {
    event.preventDefault();
    updateCard(formData).then((result) => {
      // console.log(result);
      history.push(`/decks/${deckId}`);
    });
  }

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
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h2>
        {deck.name}: Edit Card {cardId}
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="front">
          Front
          <input
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
    </div>
  );
}

export default EditCard;
