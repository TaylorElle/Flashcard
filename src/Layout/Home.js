import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
// import { listDecks, deleteDeck } from "../utils/api";

function Home({ listDecks, deleteDeck }) {
  const history = useHistory();
  const [decks, setDecks] = useState([]);
  const [length, setLength] = useState(0);
  useEffect(() => {
    listDecks().then(setDecks);
  }, [length]);

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirmation) {
      await deleteDeck(id);
      /*listDecks()
         .then(setDecks)*/
      setLength(decks.length);
    }
  };

  const list = decks.map((deck) => {
    return (
      <div className="card">
        <div key={deck.id} className="card-body">
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
          <Link to={`/decks/${deck.id}`}>
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
      <Link to="/decks/new">
        <button type="button" className="btn btn-secondary">
          + Create Deck
        </button>
      </Link>
      <div className="row">{list}</div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default Home;
