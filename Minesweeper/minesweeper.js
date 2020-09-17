
//https://www.1001fonts.com/digital+clock-fonts.html --> use this font in CSS

(() => {
        let bombArr = [];
        let zeroArr = [];
        let bombCount = 20;
        const fieldColumns = 12;
        const fieldRows = 10;
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        function setTextColor(num) {
            switch (num) {
                case 1: return "one";
                case 2: return "two";
                case 3: return "three";
                case 4: return "four";
                case 5: return "five";
                case 6: return "six";
                case 7: return "seven";
                case 8: return "eight";
            }
        }
        function handleZeroField(i) {
            if(zeroArr.indexOf(i) === -1){
                zeroArr.push(i);
            }
            console.log(zeroArr);
            let cells = Array.from(document.getElementsByClassName("cell"));
            cells[i].classList.add("clicked");
            if(bombArr[i] > 0){
                cells[i].innerText = bombArr[i]
                cells[i].classList.add(setTextColor(bombArr[i]));

            } else {
                if (i - (fieldColumns + 1) >= 0 && i % fieldColumns !== 0 && !cells[i - (fieldColumns + 1)].classList.contains("clicked")) {
                    zeroArr.push(i - (fieldColumns + 1));
                    cells[i - (fieldColumns + 1)].classList.add("clicked");
                    if(bombArr[i - (fieldColumns + 1)] !== 0){
                        cells[i - (fieldColumns + 1)].innerText = bombArr[i - (fieldColumns + 1)];
                    }
                }
                if (i - fieldColumns >= 0 && !cells[i - fieldColumns].classList.contains("clicked")) {
                    zeroArr.push(i - fieldColumns);
                    cells[i - fieldColumns].classList.add("clicked");
                    if(bombArr[i - fieldColumns] !== 0){
                        cells[i - fieldColumns].innerText = bombArr[i - fieldColumns];
                    }
                }
                if (i - (fieldColumns - 1) >= 0 && (i + 1) % fieldColumns !== 0 && !cells[i - (fieldColumns - 1)].classList.contains("clicked")) {
                    zeroArr.push(i - (fieldColumns - 1));
                    cells[i - (fieldColumns - 1)].classList.add("clicked");
                    if(bombArr[i - (fieldColumns - 1)] !== 0){
                        cells[i - (fieldColumns - 1)].innerText = bombArr[i - (fieldColumns - 1)];
                    }
                }
                if (i - 1 >= 0 && i % fieldColumns !== 0 && !cells[i - 1].classList.contains("clicked")) {
                    zeroArr.push(i - 1);
                    cells[i - 1].classList.add("clicked");
                    if(bombArr[i - 1] !== 0){
                        cells[i - 1].innerText = bombArr[i - 1];
                    }
                }
                if (i + 1 < fieldColumns * fieldRows && (i + 1) % fieldColumns !== 0 && !cells[i + 1].classList.contains("clicked")) {
                    zeroArr.push(i + 1);
                    cells[i + 1].classList.add("clicked");
                    if(bombArr[i + 1] !== 0){
                        cells[i + 1].innerText = bombArr[i + 1];
                    }
                }
                if (i + (fieldColumns - 1) < fieldColumns * fieldRows && i % fieldColumns !== 0 && !cells[i + (fieldColumns - 1)].classList.contains("clicked")) {
                    zeroArr.push(i + (fieldColumns - 1));
                    cells[i + (fieldColumns - 1)].classList.add("clicked");
                    if(bombArr[i + (fieldColumns - 1)] !== 0){
                        cells[i + (fieldColumns - 1)].innerText = bombArr[i + (fieldColumns - 1)];
                    }
                }
                if (i + fieldColumns < fieldColumns * fieldRows && !cells[i + fieldColumns].classList.contains("clicked")) {
                    zeroArr.push(i + fieldColumns);
                    cells[i + fieldColumns].classList.add("clicked");
                    if(bombArr[i+ fieldColumns] !== 0){
                        cells[i+ fieldColumns].innerText = bombArr[i+ fieldColumns];
                    }
                }
                if (i + fieldColumns + 1 < fieldColumns * fieldRows && (i + 1) % fieldColumns !== 0 && !cells[i + fieldColumns + 1].classList.contains("clicked")) {
                    zeroArr.push(i + fieldColumns + 1);
                    cells[i + fieldColumns + 1].classList.add("clicked");
                    if(bombArr[i + fieldColumns + 1] !== 0){
                        cells[i + fieldColumns + 1].innerText = bombArr[i + fieldColumns + 1];
                    }
                }
            }
            zeroArr.shift();
            console.log(zeroArr);
            if(zeroArr.length > 0){
                handleZeroField(zeroArr[0])
            }
        }
        function initialize() {

            for (let i = 0; i < (fieldColumns * fieldRows - bombCount); i++) {
                bombArr.push(0);
            }
            for (let i = 0; i < bombCount ; i++) {
                bombArr.push("X");
            }
            shuffleArray(bombArr);

            let z = 0;
            while (z < bombArr.length){
                if(bombArr[z] === "X"){
                    //if current index z is "X" (a bomb), set neighbours to be + 1 unless neighbour cells also bomb
                    //z % 10 is used to check if you're not in a corner
                    if(z - (fieldColumns + 1) >= 0 && bombArr[z - (fieldColumns + 1)] !== "X" && z % fieldColumns !== 0){
                        bombArr[z - (fieldColumns + 1)] += 1;
                    }
                    if(z - fieldColumns >= 0 && bombArr[z - fieldColumns] !== "X"){
                        bombArr[z - fieldColumns] += 1;
                    }
                    if(z - (fieldColumns - 1) >= 0 && bombArr[z - (fieldColumns - 1)] !== "X" && (z + 1) % fieldColumns !== 0){
                        bombArr[z - (fieldColumns - 1)] += 1;
                    }
                    if(z - 1 >= 0 && bombArr[z - 1] !== "X" && z % fieldColumns !== 0){
                        bombArr[z - 1] += 1;
                    }
                    if(z + 1 < (fieldColumns * fieldRows) && bombArr[z + 1] !== "X" && (z + 1) % fieldColumns !== 0){
                        bombArr[z + 1] += 1;
                    }
                    if(z + (fieldColumns - 1) < (fieldColumns * fieldRows) && bombArr[z + (fieldColumns - 1)] !== "X" && z % fieldColumns !== 0){
                        bombArr[z + (fieldColumns - 1)] += 1;
                    }
                    if(z + fieldColumns < (fieldColumns * fieldRows) && bombArr[z + fieldColumns] !== "X"){
                        bombArr[z + fieldColumns] += 1;
                    }
                    if(z + (fieldColumns + 1) < (fieldRows * fieldColumns) && bombArr[z + (fieldColumns + 1)] !== "X" && (z + 1) % fieldColumns !== 0){
                        bombArr[z + (fieldColumns + 1)] += 1;
                    }
                }
                z++;
            }
            console.log(bombArr);
        }
        const grid = document.getElementsByClassName("grid")[0];
        grid.addEventListener("click", (e) => {
            let child = e.target;
            let parent = child.parentNode;
            let index = Array.prototype.indexOf.call(parent.children, child);
// The equivalent of parent.children.indexOf(child)
            console.log(index);
            if(child.classList.contains("flag")){
                console.log("Bomb was flagged!");
                return;
            }
            //spamclicking gives back index 0 when clicking on parent .grid!!!
            if(index === 0 && child.classList.contains("grid")){
                console.log(child);
                return;
            }
            if(bombArr[index] !== 0 && bombArr[index] !== "X"){
                child.innerText = bombArr[index];
                child.classList.add(setTextColor(bombArr[index]));
            }
            if(bombArr[index] === "X"){
                child.classList.add("mine")
                setTimeout(() => {
                    console.log("GAME OVER!")
                }, 100)
            } else {
                child.classList.add("clicked")
            }
            //create an auto-field around a square with 0 in it
            if(bombArr[index] === 0){
                handleZeroField(index)
            }
        })
    grid.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if(!e.target.classList.contains("clicked")){
            e.target.classList.toggle("flag");
        }
    })
        initialize();
})()
