document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDispaly = document.querySelector('#score')
    const width = 4
    const resultDisplay = document.getElementById('#result')
    let squares = []

    function createBoard() {
        for (let i = 0; i < width * width; i++){
            const square = document.createElement('div')
            square.innerHTML = 0;
            gridDisplay.appendChild(square)
            squares.push(square)
            console.log(square)
        }
        generate()
        generate()
    }
    createBoard()
    function generate() {
        const randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2
            //checkForGameOver()

        }else generate()
    }
        function moveRight(){
            for (let i = 0; i < 16; i++) {
                if (i % 4 === 0 ) {
                    let totalone = squares[i].innerHTML
                    let totalTwo = squares[i + 1].innerHTML
                    let totalThree = squares[i + 2].innerHTML
                    let totalFour = squares[i + 3].innerHTML
                    let row = [parseInt(totalone), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                    let filteredRow = row.filter(num => num)
                    let missing = 4 - filteredRow.length
                    let zeros = Array(missing).fill(0)
                    let newRow = zeros.concat(filteredRow)
                    squares[i].innerHTML = newRow[0]
                    squares[i + 1].innerHTML = newRow[1]
                    squares[i + 2].innerHTML = newRow[2]
                    squares[i + 3].innerHTML =  newRow[3]
                }
            }
        }
        function control (e) {
            if (e.key === 'ArrowLeft') {
                keyLeft()
            }else if (e.key === 'ArrowRight') {
                keyRight()
            }

        }
        document.addEventListener('keydown', control)

        // function keyLeft(){
        //     moveLeft()
        //     combineRow()
        //     moveLeft()
        //     generate()
        // }
        function keyRight(){
            moveRight()
            // combineRow()
            moveRight()
            generate()
        }

})