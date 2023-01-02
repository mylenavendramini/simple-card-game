let deckId = "";

document.querySelector("button").addEventListener("click", drawTwo);

fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then((res) => res.json())
  .then((data) => {
    console.log(data.deck_id);
    console.log(data);
    // deckId = localStorage.setItem("deckId", data.deck_id);
    deckId = data.deck_id;
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

function drawTwo() {
  document.querySelector("#game").style.display = "block";
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.querySelector("#player1").src = data.cards[0].image;
      document.querySelector("#player2").src = data.cards[1].image;
      let player1Val = convertToNum(data.cards[0].value);
      let player2Val = convertToNum(data.cards[1].value);

      if (player1Val === player2Val) {
        document.querySelector("h3").innerText = "Time for War";
      } else if (player1Val > player2Val) {
        document.querySelector("h3").innerText = "You win! 🥳";
        document.querySelector("h3").style.fontSize = "2rem";
      } else {
        document.querySelector("h3").innerText = "Computer wins!";
        document.querySelector("h3").style.fontSize = "2rem";
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function convertToNum(val) {
  if (val === "ACE") {
    return 14;
  } else if (val === "KING") {
    return 13;
  } else if (val === "QUEEN") {
    return 12;
  } else if (val === "JACK") {
    return 11;
  } else {
    return Number(val);
  }
}
