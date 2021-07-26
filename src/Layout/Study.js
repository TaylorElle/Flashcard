import { readDeck, readCard } from "../utils/api";
import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

function Study() {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  //set State so we can use it to set the deck to whatever the readDeck result is
  const [deck, setDeck] = useState({});
  //set State for the current card so we can iterate through each card. initialize the state at the cards at index 0
  //intialize the current index to 0 and then we can iterate through each card until the currentIndex matches the deck's length
  const [currentIndex, setCurrentIndex] = useState(0);
  //set a flip state so we can switch from flipped= true or false.
  const [flip, setFlip] = useState(true);

  // readDeck(deckId).then((result) => console.log(result));

  //api request inside a useEffect
  useEffect(() => {
    (async () => {
      const result = await readDeck(deckId);
      setDeck(result);
    })();
  }, [deckId]);

  const cards = deck.cards;
  console.log(cards);
  // const [currentCard, setCurrentCard] = useState(cards[1]);

  // if not enough cards, display not enough cards with a button to add more cards to the deck
  //need to read the deck using readDeck
  //need to read the cards using readCards?
  //show cards one at a time (map through them?)
  //display which card out of how many cards
  //show front of card first
  //button "flip" to get to the other side of the card - displays and front AND back
  //button "next" is available once the flip button is pressed at least once  -- id +1

  // function GetTheNextCard() {
  //   //if there are still cards in the deck,
  //   //change the state for the index, the card, and the flip
  //   if (currentIndex < cards.length) {
  //     //make a new variable so dont have to wait for the state to change
  //     const nextIndex = currentIndex + 1;
  //     setCurrentIndex(nextIndex);
  //     setCurrentCard(cards[nextIndex]);

  //     setFlip(true);
  //   }
  // }

  // //Not Enough Cards display. BUT if this displays, the navbar, does not
  // if (cards.length < 3) {
  // return (
  //   <div>
  //     {/* //navbar */}
  //     <nav aria-label="breadcrumb">
  //       <ol className="breadcrumb">
  //         <li className="breadcrumb-item">
  //           <a href="/">Home</a>
  //         </li>
  //         <li className="breadcrumb-item">
  //           <a href={`/decks/${deckId}`}>{deck.name}</a>
  //         </li>
  //         <li className="breadcrumb-item active" aria-current="page">
  //           Study
  //         </li>
  //       </ol>
  //     </nav>
  //     <h1>Not enough cards.</h1>
  //     <p>
  //       You need at least 3 cards to study. Please add more cards to this deck.
  //     </p>
  //     <Link to={`/decks/${deckId}/cards/new`}>
  //       {/* I will most likely need to re-work the Add Card Component to ensure the deck info is gotten from the api */}
  //       <button type="button" className="card-link" className="btn btn-primary">
  //         + Add Card
  //       </button>
  //     </Link>
  //   </div>
  // );
  // }

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
      <h1>Study: {deck.name} </h1>
      {/* <h2>{cards}</h2> */}
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Card 1</h5>
          <p class="card-text"> front of card</p>
        </div>

        <button type="button" class="btn btn-secondary">
          Flip
        </button>
      </div>
    </div>
  );
}

export default Study;

// The Study screen has the following features:

// The path to this screen should include the deckId (i.e., /decks/:deckId/study).
// You must use the readDeck() function from src/utils/api/index.js to load the deck that is being studied.
// There is a breadcrumb navigation bar with links to home /, followed by the name of the deck being studied and finally the text Study (e.g., Home/Rendering In React/Study).
// The deck title (i.e., "Study: Rendering in React" ) is shown on the screen.
// Cards are shown one at a time, front-side first.
// A button at the bottom of each card "flips" it to the other side.
// After flipping the card, the screen shows a next button (see the "Next button" section below) to continue to the next card.
// After the final card in the deck has been shown, a message (see the "Restart prompt" section below) is shown offering the user the opportunity to restart the deck.
// If the user does not restart the deck, they should return to the home screen.
// Studying a deck with two or fewer cards should display a "Not enough cards" message (see the "Not enough cards" section below) and a button to add cards to the deck.
