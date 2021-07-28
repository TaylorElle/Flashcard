import React, { useEffect, useState } from "react";

import { readDeck, updateDeck } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";

function EditDeck() {
  const { deckId } = useParams();
  const [formData, setFormData] = useState({});

  //useEffect is like an event listener. it is like a conditional statement and it's listening for a reason to re-render. deckId is it's reason, right now.
  //this fxn reads the deck from the API to get the information. however, because i am passing the inforamtion through props, i do not need to re-render from the api.
  // However, it would be better to re-format to not pass props but intead, pass just the id and GET the infomraiton from the api using the id i just passed.
  //that would ensure i always have the inforoamtion i need no matter how long i stay on the site page
  useEffect(() => {
    const abortController = new AbortController();
    const readingDeck = async () => {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        setFormData(() => ({ ...deckData }));
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
    console.log(event.target.value);

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck(formData).then((result) => history.push(`/decks/${result.id}`));
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{formData.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Deck Name:
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="description">
          Description:
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.goBack(-1)}
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

export default EditDeck;
