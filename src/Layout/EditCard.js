import { readCard, updateCard, readDeck } from "../utils/api";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Card from "./Card";

function EditCard() {
  const [formData, setFormData] = useState({});
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});

  const history = useHistory();

  useEffect(() => {
    async function loadTheCard() {
      const loadedCard = await readCard(cardId);
      setFormData(loadedCard);
    }
    loadTheCard();
  }, [cardId]);

  useEffect(() => {
    async function readTheDeck() {
      const deckIsRead = await readDeck(deckId);
      setDeck(deckIsRead);
    }
    readTheDeck();
  }, [deckId]);

  useEffect(() => {
    const abortController = new AbortController();
    const readingDeck = async () => {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        setDeck(() => ({ ...deckData }));
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
  };

  function handleSubmit(event) {
    event.preventDefault();
    updateCard(formData).then((result) => {
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
            <a href={`/decks/${deckId}`}>{deck.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h2>Edit Card </h2>

      <Card
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        deckId={deckId}
      />
    </div>
  );
}

export default EditCard;
