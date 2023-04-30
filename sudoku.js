var numSelected = null;

let timer = null;

let seconds = 0;
let minutes = 0;
let hours = 0;

var errors = 0;
var score = 0;

var easyBoard = [
    "38--91--5",
    "2415--379",
    "5--327--8",
    "7586----4",
    "1--784596",
    "49-253--7",
    "--4176-52",
    "675--2941",
    "8-2945--3"
    /*"--7491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"*/
];

var mediumBoard = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];

var hardBoard = [
    "--74----5",
    "2---6-3-9",
    "-----7-1-",
    "-5-6----4",
    "--3----9-",
    "--62--1-7",
    "9-4-7---2",
    "-7--3----",
    "8---4----"
];

var BoardSol = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];

function setGame() {
    // Remove all child elements from digits and board
    let digits = document.getElementById("digits");
    while (digits.firstChild) {
        digits.removeChild(digits.firstChild);
    }

    let boardElem = document.getElementById("board");
    while (boardElem.firstChild) {
        boardElem.removeChild(boardElem.firstChild);
    }

    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        digits.appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (easyBoard[r][c] !== "-") {
                tile.innerText = easyBoard[r][c];
                tile.classList.add("tile-start");
            }
            if (r === 2 || r === 5) {
                tile.classList.add("horizontal-line");
            }
            if (c === 2 || c === 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            boardElem.appendChild(tile);
        }
    }

    // Reset errors counter
    errors = 0;
    document.getElementById("errors").innerText = errors;
    score = 0;
    document.getElementById("score").innerText = score;
}
function setGame1() {
    // Remove all child elements from digits and board
    let digits = document.getElementById("digits");
    while (digits.firstChild) {
        digits.removeChild(digits.firstChild);
    }

    let boardElem = document.getElementById("board");
    while (boardElem.firstChild) {
        boardElem.removeChild(boardElem.firstChild);
    }

    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        digits.appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (mediumBoard[r][c] !== "-") {
                tile.innerText = mediumBoard[r][c];
                tile.classList.add("tile-start");
            }
            if (r === 2 || r === 5) {
                tile.classList.add("horizontal-line");
            }
            if (c === 2 || c === 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile1);
            tile.classList.add("tile");
            boardElem.appendChild(tile);
        }
    }

    // Reset errors counter
    errors = 0;
    document.getElementById("errors").innerText = errors;
}
function setGame2() {
    // Remove all child elements from digits and board
    let digits = document.getElementById("digits");
    while (digits.firstChild) {
        digits.removeChild(digits.firstChild);
    }

    let boardElem = document.getElementById("board");
    while (boardElem.firstChild) {
        boardElem.removeChild(boardElem.firstChild);
    }

    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        digits.appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (hardBoard[r][c] !== "-") {
                tile.innerText = hardBoard[r][c];
                tile.classList.add("tile-start");
            }
            if (r === 2 || r === 5) {
                tile.classList.add("horizontal-line");
            }
            if (c === 2 || c === 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile2);
            tile.classList.add("tile");
            boardElem.appendChild(tile);
        }
    }

    // Reset errors counter
    errors = 0;
    document.getElementById("errors").innerText = errors;
}

function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText !== "") {
            return;
        }
        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (BoardSol[r][c] === numSelected.id) {
            this.innerText = numSelected.id;
            score += 200;
            document.getElementById("score").innerText = score;
            if(checkWin()){
                openPopupWin();
                countScore();
                clearTimer();
            }
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
            if(errors > 2){
                openPopupLose();
            }else{
                closePopupLose();
            }
        }
    }
}
function selectTile1() {
    if (numSelected) {
        if (this.innerText !== "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (BoardSol[r][c] === numSelected.id) {
            this.innerText = numSelected.id;
            score += 300;
            document.getElementById("score").innerText = score;
            if(checkWin1()){
                openPopupWin();
                countScore();
                clearTimer();
            }
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
            if(errors > 2){
                openPopupLose1();
            }else{
                closePopupLose();
            }
        }
    }
}
function selectTile2() {
    if (numSelected) {
        if (this.innerText !== "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (BoardSol[r][c] === numSelected.id) {
            this.innerText = numSelected.id;
            score += 400;
            document.getElementById("score").innerText = score;
            if(checkWin2()){
                openPopupWin();
                countScore();
                clearTimer();
            }
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
            if(errors > 2){
                openPopupLose2();
            }else{
                closePopupLose();
            }
        }
    }
}
function checkWin() {
    let board = getBoard()
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] !== BoardSol[r][c]) {
                return false;
            }
        }
    }
    return true;
}
function checkWin1() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (mediumBoard[r][c] !== BoardSol[r][c]) {
                return false;
            }
        }
    }
    return true;
}
function checkWin2() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (hardBoard[r][c] !== BoardSol[r][c]) {
                return false;
            }
        }
    }
    return true;
}
function cleanBoard() {
    // Remove all child elements from digits and board
    let digits = document.getElementById("digits");
    while (digits.firstChild) {
        digits.removeChild(digits.firstChild);
    }

    let board = document.getElementById("board");
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }

    errors = 0;
    document.getElementById("errors").innerText = errors;

    // Call setGame to regenerate the board and digits elements
    setGame();
}
function cleanBoard1() {
    // Remove all child elements from digits and board
    let digits = document.getElementById("digits");
    while (digits.firstChild) {
        digits.removeChild(digits.firstChild);
    }

    let board = document.getElementById("board");
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }

    errors = 0;
    document.getElementById("errors").innerText = errors;

    // Call setGame to regenerate the board and digits elements
    setGame1();
}
function cleanBoard2() {
    // Remove all child elements from digits and board
    let digits = document.getElementById("digits");
    while (digits.firstChild) {
        digits.removeChild(digits.firstChild);
    }

    let board = document.getElementById("board");
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }

    errors = 0;
    document.getElementById("errors").innerText = errors;

    // Call setGame to regenerate the board and digits elements
    setGame2();
}
function showSolution() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = BoardSol[r][c];
        }
    }
}

function setTimer(){

    timer = setInterval(function() {
        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }

        let timeString = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

        document.getElementById("timer").innerHTML = timeString;
    }, 1000);
}
function clearTimer(){
    seconds = 0
    minutes = 0
    hours = 0
    clearInterval(timer);
}
function countScore() {

    if (minutes === 0 && seconds > 30) {
        score -= 500;
    } else if (minutes === 1 && seconds > 0) {
        score -= 500;
    } else if (minutes === 1 && seconds > 30) {
        score -= 500;
    } else if (minutes === 2 && seconds > 0) {
        score -= 500;
    } else if (minutes === 2 && seconds > 30) {
        score -= 500;
    } else if (minutes === 3 && seconds > 0) {
        score -= 500;
    } else if (minutes === 3 && seconds > 30) {
        score -= 500;
    } else if (minutes === 4 && seconds > 0) {
        score -= 500;
    } else if (minutes === 4 && seconds > 30) {
        score -= 500;
    } else if (minutes === 5 && seconds > 0) {
        score -= 500;
        openPopupLose()
    }
    score -= errors * 500;

    // Get the best score from localStorage or set it to 0
    let bestScore = localStorage.getItem("bestScore") || 0;

// Update the best score if the current score is greater
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
    }

// Display the best score
    document.getElementById("bestScore").textContent = bestScore;

    document.getElementById("score").innerText = score;
    score = 0;
}

function openPopupLose() {
    cleanBoard();
    document.querySelector('.popup1').style.display = 'flex';
}
function openPopupLose1() {
    cleanBoard1();
    document.querySelector('.popup1').style.display = 'flex';
}
function openPopupLose2() {
    cleanBoard2();
    document.querySelector('.popup1').style.display = 'flex';
}

function closePopupLose() {
    clearTimer()
    document.querySelector('.popup1').style.display = 'none';
}

function openPopupWin() {
    document.querySelector('.popup2').style.display = 'flex';
}

function closePopupWin() {
    clearTimer()
    document.querySelector('.popup2').style.display = 'none';
}
function openPopup() {
    document.querySelector('.popup').style.display = 'flex';
}

function closePopup() {
    document.querySelector('.popup').style.display = 'none';
}
function getBoard() {
    let board = [];

    for (let r = 0; r < 9; r++) {
        let row = [];
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            if (tile.innerText !== "") {
                row.push(tile.innerText);
            } else {
                row.push("-");
            }
        }
        board.push(row);
    }

    return board;
}

