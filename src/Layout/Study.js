import { readDeck } from "../utils/api";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "Loading...", cards: [] });
  const [isItFlipped, setIsItFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    async function getDeck() {
      try {
        let data = await readDeck(deckId, abortController.signal);
        setDeck(data);
      } catch (err) {
        setError(err);
      }
    }
    getDeck();
    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return error;
  }

  function GetTheNextCard() {
    if (currentIndex === deck.cards.length - 1) {
      const result = window.confirm(
        "Do you want to restart the deck and study again?"
      );
      if (result) {
        setCurrentIndex(0);
      }
    } else {
      setCurrentIndex(currentIndex + 1);
      setIsItFlipped((prevState) => !prevState);
    }
  }

  function clickToFlipCard() {
    setIsItFlipped((prevState) => !prevState);
  }

  if (deck.cards.length <= 2) {
    return (
      <div>
        {/* //navbar */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/decks/${deckId}`}>{deck.name}</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>Not enough cards.</h1>
        <p>
          You need at least 3 cards to study. Please add more cards to this
          deck.
        </p>
        <Link to={`/decks/${deck.id}/cards/new`}>
          <button type="button" className="btn btn-primary">
            + Add Card
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        {/* //navbar */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/decks/${deckId}`}>{deck.name}</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        {/* // study screen */}
        <h1>Currently Studying: {deck.name} </h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {currentIndex + 1} of {deck.cards.length}
            </h5>
            <p className="card-text">
              {!isItFlipped
                ? `Question: ${deck.cards[currentIndex].front}`
                : `Answer: ${deck.cards[currentIndex].back}`}
            </p>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={clickToFlipCard}
          >
            Flip
          </button>
          {isItFlipped && (
            <button className="btn btn-primary" onClick={GetTheNextCard}>
              Next
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Study;
