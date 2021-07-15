import React from "react";
//import CreateDeck from "./CreateDeck";
import { Route, Link, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Deck from "./Deck";
import { listDecks, deleteDeck } from "../utils/api";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";
import AddCard from "./AddCard";
import DeckCreation from "./DeckCreation";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          {/* <Route path="/decks/:deckId">
            <Deck />
          </Route>
          */}

          <Route exact path="/">
            <Home listDecks={listDecks} deleteDeck={deleteDeck} />
          </Route>
          <Route path="/decks/new">
            <DeckCreation />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
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

// function Layout() {
//   const decksArr = data.decks;
//   const list = decksArr.map((oneDeck) => {
//     return (
//       <div className="card">
//         {/* style="width: 18rem" */}
//         <div className="card-body">
//           <h5 className="card-title">{oneDeck.name}</h5>
//           <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
//           <p className="card-text">{oneDeck.description}</p>
//           <Link href="#" className="card-link" className="btn btn-secondary">
//             Edit
//             {/* Directions say "View" but that doesn't make sense */}
//           </Link>
//           <Link href="#" className="btn btn-primary">
//             Study
//           </Link>
//           <Link href="#" className="card-link" className="btn btn-danger">
//             Delete
//           </Link>
//         </div>
//       </div>
//     );
//   });
//   // console.log(list);

//   return (
//     <>
//       <Link className="btn btn-secondary" to="/decks/new" role="button">
//         + Create Deck
//       </Link>

//       <div className="container">
//         {/* TODO: Implement the screen starting here */}
//         <div className="row">{list}</div>
//       </div>
//     </>
//   );
// }

// export default Layout;

// The path to this screen should be /.
// A "Create Deck" button is shown

// Existing decks are each shown with the deck name, the number of cards, and a “Study,” “View,” and “Delete” button.
// Clicking the “Study” button brings the user to the Study screen.
// Clicking the “Edit” button brings the user to the Edit Deck screen.
// Clicking the “Delete” button shows a warning message before deleting the deck.
