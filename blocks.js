(() => {


    let Player= null;
    let enemies = [];
    const movePx = 20;
    const movePxEn = 5;
    const health = document.getElementById("progressBar");
    const healthLabel = document.getElementsByTagName("label")[0];
    const canvas = document.getElementById("gameCanvas");
    canvas.style.border = `${(window.outerWidth % movePx) / 2}px solid black`;
    document.getElementById("spawn").style.height = `${canvas.getBoundingClientRect().height - 5}px`;
    console.log(canvas.getBoundingClientRect())
    console.log(canvas)
    function Enemy() {
        this.enemyEl = document.createElement("div");
        this.enemyEl.classList.add("enemy");
        this.enemyEl.style.position = "absolute";
        this.enemyEl.style.left = `${canvas.getBoundingClientRect().right - 55}px`;
        this.enemyEl.style.top = `${Math.floor(Math.random() * canvas.getBoundingClientRect().height + 55) - 55}px`;
        this.enemyEl.style.width = "50px";
        this.enemyEl.style.height = "50px";
        this.enemyEl.style.backgroundImage = "url('Img/virus.png')";
        this.enemyEl.style.backgroundRepeat = "no-repeat";
        this.enemyEl.style.backgroundPosition = "center";
        this.enemyEl.style.backgroundSize = "contain";
        canvas.appendChild(this.enemyEl);

         this.moveEnemy = () => {
            if(parseInt(Player.style.left) < parseInt(this.enemyEl.style.left)){
                this.enemyEl.style.left = `${parseInt(this.enemyEl.style.left) - movePxEn}px`;
            } else this.enemyEl.style.left = `${parseInt(this.enemyEl.style.left) + movePxEn}px`;
            if(parseInt(Player.style.top) < parseInt(this.enemyEl.style.top)){
                this.enemyEl.style.top = `${parseInt(this.enemyEl.style.top) - movePxEn}px`;
            } else this.enemyEl.style.top = `${parseInt(this.enemyEl.style.top) + movePxEn}px`;
            checkCollision(Player, this.enemyEl)
        }
    }
    function start(){
        Player = document.getElementById("player");
        Player.style.position='absolute';
        Player.style.left='0px';
        Player.style.top='0px';
        Player.style.height = "100px";
        Player.style.width = "100px"
    }
    start()
    
    const movePlayer = e => {
        e.preventDefault()
        let canvasHeight = canvas.getBoundingClientRect().height
        let bottomFix = canvasHeight - (canvasHeight % movePx);
        if (e.key === 'ArrowUp' && parseInt(Player.style.top) !== 0) {
            Player.style.top = parseInt(Player.style.top) - movePx + "px";
            Player.style.transform = "rotate(90deg)"
        }
        else if (e.key === 'ArrowRight' && parseInt(Player.style.left) + parseInt(Player.style.width) <= window.innerWidth - movePx) { //window.innerWidth - player's width
            Player.style.left = parseInt(Player.style.left) + movePx + "px";
            Player.style.transform = "rotateY(180deg)"
        }
        else if (e.key === 'ArrowDown' && parseInt(Player.style.top) + parseInt(Player.style.height) !== bottomFix - movePx) {
            Player.style.top = parseInt(Player.style.top) + movePx + "px";
            Player.style.transform = "rotate(270deg)"
        }
        else if (e.key === 'ArrowLeft' && parseInt(Player.style.left) !== 0) {
            Player.style.left = parseInt(Player.style.left) - movePx + "px";
            Player.style.transform = "rotateY(0deg)"

        }
        enemies.forEach(enemy => checkCollision(Player, enemy.enemyEl))

    }
    const checkCollision = (Player, enemy) => {
        let playerArea = Player.getBoundingClientRect();
        let enemyArea = enemy.getBoundingClientRect();

        if (!(
            playerArea.top > enemyArea.bottom ||
            playerArea.right < enemyArea.left ||
            playerArea.bottom < enemyArea.top ||
            playerArea.left > enemyArea.right
        )){
            console.log("DEAD")
            let newHealth = parseFloat(health.value) - 0.05;
            health.value = newHealth;
            healthLabel.innerText = `Health: ${Math.round(500 * newHealth)}`
        };
    }

    enemies.push(new Enemy())

    const spawnEnemy = () => enemies.push(new Enemy())

    const moveEnemies = () => {
        enemies.forEach(enemy => {
            enemy.moveEnemy()
        })
    }

    setInterval(spawnEnemy, 1000)

    setInterval(moveEnemies, 200)

    document.body.addEventListener("keydown", movePlayer);
})()



/*
let Player= null;
    let Enemy = null;
    const movePx = 20;
    const movePxEn = 5;
    document.body.style.border = `${(window.outerWidth % movePx) / 2}px solid black`
    function start(){
        Player = document.getElementById("player");
        Player.style.position='absolute';
        Player.style.left='0px';
        Player.style.top='0px';
        Player.style.height = "100px";
        Player.style.width = "100px"
        Enemy = document.getElementById("enemy");
        Enemy.style.position = "relative";
        Enemy.style.left= `${window.innerWidth - 55}px`;
        Enemy.style.top= `${window.innerHeight - 55}px`;
        Enemy.style.width = "50px";
        Enemy.style.height = "50px";
        Enemy.style.backgroundImage = "url('Img/virus.png')";
        Enemy.style.backgroundRepeat = "no-repeat";
        Enemy.style.backgroundPosition = "center";
        Enemy.style.backgroundSize = "contain";

    }
    start()

    const movePlayer = e => {
        if (e.key === 'ArrowUp' && parseInt(Player.style.top) !== 0) {
            Player.style.top = parseInt(Player.style.top) - movePx + "px";
            Player.style.transform = "rotate(90deg)"
        }
        else if (e.key === 'ArrowRight' && parseInt(Player.style.left) + parseInt(Player.style.width) <= window.innerWidth - movePx) { //window.innerWidth - player's width
            Player.style.left = parseInt(Player.style.left) + movePx + "px";
            Player.style.transform = "rotateY(180deg)"
        }
        else if (e.key === 'ArrowDown' && parseInt(Player.style.top) + parseInt(Player.style.height) <= window.innerHeight - movePx) {
            Player.style.top = parseInt(Player.style.top) + movePx + "px";
            Player.style.transform = "rotate(270deg)"
        }
        else if (e.key === 'ArrowLeft' && parseInt(Player.style.left) !== 0) {
            Player.style.left = parseInt(Player.style.left) - movePx + "px";
            Player.style.transform = "rotateY(0deg)"

        }
        checkCollision()
    }
    const checkCollision = () => {
        let playerArea = Player.getBoundingClientRect();
        let enemyArea = Enemy.getBoundingClientRect();

        if (!(
            playerArea.top > enemyArea.bottom ||
            playerArea.right < enemyArea.left ||
            playerArea.bottom < enemyArea.top ||
            playerArea.left > enemyArea.right
        )){
            console.log("DEAD")
        };
}
const moveEnemy = () => {
    if(parseInt(Player.style.left) < parseInt(Enemy.style.left)){
        Enemy.style.left = `${parseInt(Enemy.style.left) - movePxEn}px`;
    } else Enemy.style.left = `${parseInt(Enemy.style.left) + movePxEn}px`;
    if(parseInt(Player.style.top) < parseInt(Enemy.style.top)){
        Enemy.style.top = `${parseInt(Enemy.style.top) - movePxEn}px`;
    } else Enemy.style.top = `${parseInt(Enemy.style.top) + movePxEn}px`;
    checkCollision()
}

setInterval(moveEnemy, 200)

document.body.addEventListener("keydown", movePlayer);
 */