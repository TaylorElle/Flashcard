import React from "react";
import { useHistory, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { deleteCard } from "../utils/api";

function CardList({ cards = [] }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    if (confirmation) {
      await deleteCard(id);
      history.go(0);
      history.push("/");
    }
  };

  return (
    <div>
      <ul className="Cardlist list-group">
        {cards.map((card) => (
          <li
            key={card.id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="font-weight-bold">{card.front}</div>
              {card.back}
            </div>
            <div className="btn-group" role="group">
              <Link to={`${url}/cards/${card.id}/edit`}>
                <button type="button" className="btn btn-secondary">
                  Edit
                </button>
              </Link>
              <button
                type="delete"
                className="btn btn-danger float-right"
                onClick={() => handleDelete(card.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardList;
