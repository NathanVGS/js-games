(() => {
    document.getElementById("reset").addEventListener("click", () => {
        location.reload()
    })
    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    const imgArray = ["Img/front1.png", "Img/front2.png",
        "Img/front3.png", "Img/front4.png",
        "Img/front5.png", "Img/front6.png",
        "Img/front7.png", "Img/front8.png"];
    let imgDoubles = [...imgArray, ...imgArray];
    const grid = document.querySelector(".grid");
    shuffleArray(imgDoubles);
    const setUp = () => {
        imgDoubles.forEach(link => {
            let div = document.createElement("div");
            div.classList.add("cell");
            let img = document.createElement("img");
            img.src = "Img/back.png";
            img.setAttribute("data-image", link);
            div.appendChild(img);
            grid.appendChild(div);
        })
    }
    setUp()

    const checkCards = e => {
        console.log(e)
        let target = e.target;
        if(target.classList.contains("grid")) return;
        if(target.src.match(/back/) != "back") return;
        if(target.classList.contains("match")) return;
        if(compare.length === 2) return;
        turns++; //add html
        target.src = target.getAttribute("data-image");
        compare.push(target.src);
        cardsFlipped++;
        console.log(cardsFlipped)
        if(cardsFlipped === 2){
            grid.removeEventListener("click", checkCards);
            cardsFlipped = 0;
            console.log(compare);
            if(compare[0] === compare[1]){
                score++; //add html
                target.classList.add("match");
                lastClicked.classList.add("match");
                setTimeout(() => {
                    grid.addEventListener("click", checkCards);
                }, 1000)
            } else {
                setTimeout(() => {
                    grid.addEventListener("click", checkCards);
                    cells.forEach(cell => {
                        if(cell.firstChild.classList.contains("match")) return;
                        cell.firstChild.src = "Img/back.png";
                    })
                }, 1500)
            }
            compare = [];
            lastClicked = "";
        } else {
            lastClicked = target;
        }
        console.log("score: " + score)
    }
    const cells = Array.from(document.getElementsByClassName("cell"));
    let cardsFlipped = 0;
    let score = 0;
    let turns = 0;
    let compare = [];
    let lastClicked;
    grid.addEventListener("click", checkCards)
})()



