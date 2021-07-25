const fetchResult = fetch(
  "https://us.api.blizzard.com/hearthstone/cards?locale=en_US&access_token=US5owajo85L55b20GVADB988rhxFNcpthP"
);

fetchResult
  .then((res) => res.json())
  .then((data) => {
    data.cards.forEach((c) => {
      const li = document.createElement("li");
      li.innerText = c.name;
      const img = document.createElement("img");
      img.src = c.image;
      li.appendChild(img);
      const addButton = document.createElement("button");
      addButton.innerText = "Add to Deck";
      addButton.id = c.id;
      li.append(addButton);

      addButton.addEventListener("click", () => {
        // Save card to My Deck
        fetch("http://localhost:3000/MyDeck", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: c.id }),
        });
        const newLi = document.createElement("li");
        newLi.innerText = c.name;
        const img2 = img.cloneNode();
        newLi.append(img2);
        const removeButton = document.createElement("button");
        removeButton.innerText = "Remove from Deck";
        newLi.append(removeButton);
        document.querySelector(".my-deck").append(newLi);
        addButton.remove();
        removeButton.addEventListener("click", () => {
          // Save removal of card from My Deck
          fetch(`http://localhost:3000/MyDeck/${c.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }),
            li.append(addButton);
          newLi.remove();
        });
      });
      document.querySelector("ul.cardList").appendChild(li);
    });

    console.log(data.cards);
  })
  .then(() => {
    fetch("http://localhost:3000/MyDeck")
      .then((r) => r.json())
      .then((data) => {
        data.forEach((c) => {
          document.getElementById(c.id).click();
        });
      });
  })
  .catch((err) => {
    console.error(err);
  });

document.addEventListener("DOMContentLoaded", () => {
  alert(
    "Welcome to my rudimentary deck builder! Currently there only shows 1 page of card data from Blizzard's Hearthstone API and it shows duplicates.  As I continue to work on this, you will be able to filter by class and name your decks. ENJOY!"
  );
});
