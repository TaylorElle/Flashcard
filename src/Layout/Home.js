import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index.js";

function Home() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    listDecks().then(setDecks);
  }, []);

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
              className="btn btn-secondary"
              onClick={() => history.push(`/decks/${deck.id}`)}
            >
              View
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button type="button" className="btn btn-primary">
              Study
            </button>
          </Link>
          <button
            type="delete"
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
