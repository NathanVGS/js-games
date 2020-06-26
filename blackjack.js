(() => {
   document.getElementById("show-rules").addEventListener("click", () => {
      /*document.getElementById("rules").style.display = "flex";*/
      document.getElementById("rules").classList.toggle("togglerules")
   })
   let cardArray = [
      "Img/2_of_clubs.svg","Img/2_of_diamonds.svg",
      "Img/2_of_hearts.svg","Img/2_of_spades.svg",
      "Img/3_of_clubs.svg", "Img/3_of_diamonds.svg",
      "Img/3_of_hearts.svg", "Img/3_of_spades.svg",
      "Img/4_of_clubs.svg", "Img/4_of_diamonds.svg",
      "Img/4_of_hearts.svg", "Img/4_of_spades.svg",
      "Img/5_of_clubs.svg", "Img/5_of_diamonds.svg",
      "Img/5_of_hearts.svg","Img/5_of_spades.svg",
      "Img/6_of_clubs.svg","Img/6_of_diamonds.svg",
      "Img/6_of_hearts.svg","Img/6_of_spades.svg",
      "Img/7_of_clubs.svg","Img/7_of_diamonds.svg",
      "Img/7_of_hearts.svg","Img/7_of_spades.svg",
      "Img/8_of_clubs.svg","Img/8_of_diamonds.svg",
      "Img/8_of_hearts.svg","Img/8_of_spades.svg",
      "Img/9_of_clubs.svg","Img/9_of_diamonds.svg",
      "Img/9_of_hearts.svg","Img/9_of_spades.svg",
      "Img/10_of_clubs.svg","Img/10_of_diamonds.svg",
      "Img/10_of_hearts.svg","Img/10_of_spades.svg",
      "Img/ace_of_clubs.svg","Img/ace_of_diamonds.svg",
      "Img/ace_of_hearts.svg","Img/ace_of_spades2.svg",
      "Img/jack_of_clubs2.svg","Img/jack_of_diamonds2.svg",
      "Img/jack_of_hearts2.svg","Img/jack_of_spades2.svg",
      "Img/king_of_clubs2.svg", "Img/king_of_diamonds2.svg",
      "Img/king_of_hearts2.svg", "Img/king_of_spades2.svg",
      "Img/queen_of_clubs2.svg", "Img/queen_of_diamonds2.svg",
      "Img/queen_of_hearts2.svg", "Img/queen_of_spades2.svg"]
   const message = document.getElementById("message");
   let playerCount = 0;
   let pcCount = 0;
   let pcAces = 0;
   let computerAceArray;
   let playerAces = 0;
   let computerHasDrawn = false;
   let playerHasDrawn = false;
   const computerDraw = () => {
      computerHasDrawn = true;
      let el = document.getElementById("computerHand");
      let img = document.createElement("img");
      let index = Math.floor(Math.random() * cardArray.length);
      img.src = "Img/cardBack.jpg";
      img.classList.add("pcCardUnknown");
      img.setAttribute("data-image", cardArray[index]);
      let value = getCardValue(cardArray[index], "pc");
      pcCount += value;
      el.appendChild(img);
      console.log(pcCount);
      computerAceArray = [];
      computerAceArray.push(pcCount)
      let aces = pcAces;
      let newValue = pcCount;
      while(aces > 0){
         newValue += 10;
         computerAceArray.push(newValue);
         aces--;
      }
      if(pcCount >= 21) return;
      if(pcCount < 15) computerDraw();
      if(pcCount === 15 && Math.round(Math.random())) computerDraw();
      if(computerHasDrawn && playerHasDrawn){
         document.getElementById("section-result").style.display = "flex";
      }
   }
   const getCardValue = (imgsrc, whoDrew) => {
      switch(imgsrc.replace("Img/", "").split("_")[0]){
         case "2": return 2;
         case "3": return 3;
         case "4": return 4;
         case "5": return 5;
         case "6": return 6;
         case "7": return 7;
         case "8": return 8;
         case "9": return 9;
         case "10": return 10;
         case "jack": return 10;
         case "queen": return 10;
         case "king": return 10;
         case "ace":
            if(whoDrew === "pc") {
               pcAces++;
            } else playerAces++;
            return 1;
      }
   }
   const checkResult = () => {
      let time = 0;
      let pcCards = Array.from(document.getElementsByClassName("pcCardUnknown"));
      pcCards.forEach(card => {
         card.src = card.getAttribute("data-image");
         setTimeout(()=> {
            card.classList.add("pcCard")
         }, time++ * 100);
      });
      document.getElementById("again").style.display = "flex";
      document.getElementById("section-result").style.display = "none";
      let msgPcHand = computerAceArray.length > 0 ? computerAceArray.join(" / ") : pcCount;
      document.getElementById("pcHandMsg").innerHTML+= `<span style="font-weight: bold"> ${msgPcHand}</span>`;
      let playerAceArray = [];
      playerAceArray.push(playerCount);
      let newHandValue = playerCount;
      while(playerAces > 0){
         newHandValue += 10;
         playerAceArray.push(newHandValue);
         playerAces--;
      }
      if(playerAceArray.every(x => x > 21) && computerAceArray.every(x => x > 21)){
         return "Nobody wins! The chips go back to the bank."
      }
      if(playerAceArray.every(x => x > 21) && computerAceArray.some(x => x <= 21)){
         return "Computer wins."
      }
      if(computerAceArray.every(x => x > 21) && playerAceArray.some(x => x <= 21)){
         return "You win!"
      }
      if(playerAceArray.some(x => x <= 21) && playerAceArray.some(x => x <= 21)){

         let playercheck = playerAceArray.filter(x => x <= 21);
         let computercheck = computerAceArray.filter(x => x <= 21);

         playercheck = playercheck.map(x => 21 - x).reduce((acc, curr) => curr < acc ? curr : acc);
         computercheck = computercheck.map(x => 21 - x).reduce((acc, curr) => curr < acc ? curr : acc);
         if(playercheck < computercheck){
            return "You win!"
         } else if(playercheck === computercheck){
            return "Draw!"
         } else return "Pc wins!"
      }
   }
   let turnStart = Math.round(Math.random());
   if(turnStart === 0){
      message.innerText = "The computer has drawn first, your turn!";
      computerDraw();
   } else {message.innerText = "You start! Draw a card!"}
   document.getElementById("drawCard").addEventListener("click", (e) => {
      e.preventDefault();
      if(playerHasDrawn) return;
      if(playerCount >= 21){
         alert("Your hand is already 21 or higher, you maniac");
         return;
      }
      let img = document.createElement("img");
      let index = Math.floor(Math.random() * cardArray.length);
      img.src = cardArray[index];
      let value = getCardValue(cardArray[index]);
      playerCount += value;
      let hand = document.getElementById("handValue");
      hand.innerText = playerCount;
      let aces = playerAces;
      while(aces > 0){
         hand.innerText += ` / ${playerCount+10}`;
         aces--;
      }
      document.getElementById("hand").appendChild(img);
      cardArray.splice(index, 1);
   })
   document.getElementById("no-card").addEventListener("click", () => {
      console.log(playerCount)
      if(!playerCount) return;
      playerHasDrawn = true;
      if(!computerHasDrawn){
         computerDraw();
         message.innerText = "The computer has drawn";
      }
      document.getElementById("section-result").style.display = "flex";
      document.querySelector(".end-turn").style.display = "none";
      document.querySelector(".draw-container").style.display = "none";
   })
   document.getElementById("check-result").addEventListener("click", () => {
      message.innerText = checkResult()
   })
   document.getElementById("play-again").addEventListener("click", () => {
      location.reload()
   })
})()

/*
BACKUP

(() => {
   let cardArray = [
      "Img/2_of_clubs.svg","Img/2_of_diamonds.svg",
      "Img/2_of_hearts.svg","Img/2_of_spades.svg",
      "Img/3_of_clubs.svg", "Img/3_of_diamonds.svg",
      "Img/3_of_hearts.svg", "Img/3_of_spades.svg",
      "Img/4_of_clubs.svg", "Img/4_of_diamonds.svg",
      "Img/4_of_hearts.svg", "Img/4_of_spades.svg",
      "Img/5_of_clubs.svg", "Img/5_of_diamonds.svg",
      "Img/5_of_hearts.svg","Img/5_of_spades.svg",
      "Img/6_of_clubs.svg","Img/6_of_diamonds.svg",
      "Img/6_of_hearts.svg","Img/6_of_spades.svg",
      "Img/7_of_clubs.svg","Img/7_of_diamonds.svg",
      "Img/7_of_hearts.svg","Img/7_of_spades.svg",
      "Img/8_of_clubs.svg","Img/8_of_diamonds.svg",
      "Img/8_of_hearts.svg","Img/8_of_spades.svg",
      "Img/9_of_clubs.svg","Img/9_of_diamonds.svg",
      "Img/9_of_hearts.svg","Img/9_of_spades.svg",
      "Img/10_of_clubs.svg","Img/10_of_diamonds.svg",
      "Img/10_of_hearts.svg","Img/10_of_spades.svg",
      "Img/ace_of_clubs.svg","Img/ace_of_diamonds.svg",
      "Img/ace_of_hearts.svg","Img/ace_of_spades2.svg",
      "Img/jack_of_clubs2.svg","Img/jack_of_diamonds2.svg",
      "Img/jack_of_hearts2.svg","Img/jack_of_spades2.svg",
      "Img/king_of_clubs2.svg", "Img/king_of_diamonds2.svg",
      "Img/king_of_hearts2.svg", "Img/king_of_spades2.svg",
      "Img/queen_of_clubs2.svg", "Img/queen_of_diamonds2.svg",
      "Img/queen_of_hearts2.svg", "Img/queen_of_spades2.svg"]
   const message = document.getElementById("message");
   let playerCount = 0;
   let pcCount = 0;
   let pcAces = 0;
   let playerAces = 0;
   let computerHasDrawn = false;
   let playerHasDrawn = false;
   const computerDraw = () => {
      computerHasDrawn = true;
      let el = document.getElementById("computerHand");
      let img = document.createElement("img");
      let index = Math.floor(Math.random() * cardArray.length);
      img.src = "Img/cardBack.jpg";
      img.classList.add("pcCardUnknown");
      img.setAttribute("data-image", cardArray[index]);
      let value = getCardValue(cardArray[index], "pc");
      pcCount += value;
      el.appendChild(img);
      console.log(pcCount)
      if(pcCount >= 21) return;
      if(pcCount < 15) computerDraw();
      if(pcCount === 15 && Math.round(Math.random())) computerDraw();
      if(computerHasDrawn && playerHasDrawn){
         document.getElementById("section-result").style.display = "flex";
      }
   }
   const getCardValue = (imgsrc, whoDrew) => {
      switch(imgsrc.replace("Img/", "").split("_")[0]){
         case "2": return 2;
         case "3": return 3;
         case "4": return 4;
         case "5": return 5;
         case "6": return 6;
         case "7": return 7;
         case "8": return 8;
         case "9": return 9;
         case "10": return 10;
         case "jack": return 10;
         case "queen": return 10;
         case "king": return 10;
         case "ace":
            if(whoDrew === "pc") {
               pcAces++;
            } else playerAces++;
            return 1;
      }
   }
   const checkResult = () => {
      let time = 0;
      let pcCards = Array.from(document.getElementsByClassName("pcCardUnknown"));
      pcCards.forEach(card => {
         card.src = card.getAttribute("data-image");
         setTimeout(()=> {
            card.classList.add("pcCard")
         }, time++ * 100);
      });
      document.getElementById("again").style.display = "block";
      document.getElementById("check-result").style.display = "none";
      document.getElementById("pcHandMsg").innerHTML+= `<span style="font-weight: bold"> ${pcCount}</span>`;
      if(playerCount > 21 && pcCount > 21){
         return "Nobody wins! The chips go back to the bank."
      }
      if(playerCount > 21 && pcCount <= 21){
         return "Computer wins. Cya chips."
      }
      if(pcCount > 21 && playerCount <= 21){
         return "You win!"
      }
      if(playerCount <= 21 && pcCount <= 21){
         let pcDiff = 21 - pcCount;
         let playDiff = 21 - playerCount;
         if(playDiff < pcDiff){
            return "You win!"
         } else if(playDiff === pcDiff){
            return "Draw!"
         } else return "Pc wins!"
      }
   }
   let turnStart = Math.round(Math.random());
   if(turnStart === 0){
      message.innerText = "The computer has drawn first, your turn!";
      computerDraw();
   } else {message.innerText = "You start! Draw a card!"}
   document.getElementById("drawCard").addEventListener("click", (e) => {
      e.preventDefault();
      if(playerHasDrawn) return;
      if(playerCount >= 21){
         alert("Your hand is already 21 or higher, you maniac");
         return;
      }
      let img = document.createElement("img");
      let index = Math.floor(Math.random() * cardArray.length);
      img.src = cardArray[index];
      let value = getCardValue(cardArray[index]);
      playerCount += value;
      let hand = document.getElementById("handValue");
      hand.innerText = playerCount;
      let aces = playerAces;
      while(aces > 0){
         hand.innerText += ` / ${playerCount+10}`;
         aces--;
      }
      document.getElementById("hand").appendChild(img);
      cardArray.splice(index, 1);
   })
   document.getElementById("no-card").addEventListener("click", () => {
      console.log(playerCount)
      if(!playerCount) return;
      playerHasDrawn = true;
      if(!computerHasDrawn){
         computerDraw();
         message.innerText = "The computer has drawn";
      }
      document.getElementById("section-result").style.display = "flex";
   })
   document.getElementById("check-result").addEventListener("click", () => {
      message.innerText = checkResult()
   })

   document.getElementById("play-again").addEventListener("click", () => {
      location.reload()
   })
})()
*/











/*
      */