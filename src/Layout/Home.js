import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index.js";

function Home({ decks, reRender, setReRender }) {
  const history = useHistory();

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirmation) {
      await deleteDeck(id);
      history.go(0);
    }
  };

  const list = decks.map((deck) => {
    return (
      <div key={deck.id} className="card">
        <div className="card-body">
          <h3 className="card-title">{deck.name}</h3>
          <p className="card-text">{deck.description}</p>
          <p>{deck.cards.length} cards</p>

          <Link to={`/decks/${deck.id}`}>
            <button
              type="button"
              className="card-link"
              className="btn btn-secondary"
              onClick={() => history.push(`/decks/${deck.id}`)}
            >
              View
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button
              type="button"
              className="card-link"
              className="btn btn-primary"
            >
              Study
            </button>
          </Link>
          <button
            type="delete"
            className="card-link"
            className="btn btn-danger float-right"
            onClick={() => handleDelete(deck.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return decks ? (
    <div>
      <div className="row">{list}</div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default Home;
