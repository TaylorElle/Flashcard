import React, { useState, useEffect } from "react";
//import CreateDeck from "./CreateDeck";
import { Route, Link, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import AddDeck from "./AddDeck";
import EditDeck from "./EditDeck";
import ViewDeck from "./ViewDeck";
import Study from "./Study";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import { listDecks } from "../utils/api";

function Layout() {
  const [reRender, setReRender] = useState(false);

  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});

  useEffect(() => {
    listDecks().then(setDecks);
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Link to="/decks/new">
              <button type="button" className="btn btn-secondary  ">
                <i className="bi bi-plus-square"></i> Create Deck
              </button>
            </Link>
            <Home
              decks={decks}
              listDecks={listDecks}
              reRender={reRender}
              setReRender={setReRender}
            />
          </Route>

          <Route exact path="/decks/new">
            <AddDeck />
          </Route>

          <Route exact path="/decks/:deckId">
            <ViewDeck deck={deck} setDeck={setDeck} />
          </Route>

          <Route exact path="/decks/:deckId/edit">
            <EditDeck deck={deck} setDeck={setDeck} />
          </Route>

          <Route exact path="/decks/:deckId/study">
            <Study
              // cards={cards}
              // setCards={setCards}
              deckId={deck.id}
              deck={deck}
              // setDeck={setDeck}
            />
          </Route>

          <Route exact path="/decks/:deckId/cards/new">
            <AddCard
              cards={cards}
              setCards={setCards}
              deck={deck}
              setDeck={setDeck}
            />
          </Route>

          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard card={card} setCard={setCard} deck={deck} />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
export default Layout;

// The path to this screen should be /.
// A "Create Deck" button is shown

// Existing decks are each shown with the deck name, the number of cards, and a “Study,” “View,” and “Delete” button.
// Clicking the “Study” button brings the user to the Study screen.
// Clicking the “Edit” button brings the user to the Edit Deck screen.
// Clicking the “Delete” button shows a warning message before deleting the deck.
