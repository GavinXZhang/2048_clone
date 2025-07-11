document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDispaly = document.querySelector('#score')
    const width = 4
    const resultDisplay = document.getElementById('result')
    let squares = []
    let score = 0;

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
            checkForGameOver()

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
        function moveLeft(){
            for (let i = 0; i < 16; i ++){
                if (i % 4 ===0 ){
                    let totalone = squares[i].innerHTML
                    let totalTwo = squares[i + 1].innerHTML
                    let totalThree = squares[i + 2].innerHTML
                    let totalFour = squares[i + 3].innerHTML

                    let row = [parseInt(totalone), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                    let filteredRow = row.filter(num => num)
                    let missing = 4 - filteredRow.length
                    let zeros = Array(missing).fill(0)
                    let newRow = filteredRow.concat(zeros)
                    squares[i].innerHTML = newRow[0]
                    squares[i + 1].innerHTML = newRow[1]
                    squares[i + 2].innerHTML = newRow[2]
                    squares[i + 3].innerHTML =  newRow[3]
                }
            }
        }

        function moveup() {
            for (let i = 0; i < 4; i++) {
                let totalone = squares[i].innerHTML
                let totalTwo = squares[i + width].innerHTML
                let totalThree = squares[i + 2 * width].innerHTML
                let totalFour = squares[i + 3 * width].innerHTML

                let column = [parseInt(totalone), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredColumn = column.filter(num => num)
                let missing = 4 - filteredColumn.length
                let zeros = Array(missing).fill(0)
                let newColumn = filteredColumn.concat(zeros)
                squares[i].innerHTML = newColumn[0]
                squares[i + width].innerHTML = newColumn[1]
                squares[i + width * 2].innerHTML = newColumn[2]
                squares[i + width * 3].innerHTML = newColumn[3]
            }
        }
        function movedown() {
            for (let i = 0; i < 4; i++) {
                let totalone = squares[i].innerHTML
                let totalTwo = squares[i + width].innerHTML
                let totalThree = squares[i + 2 * width].innerHTML
                let totalFour = squares[i + 3 * width].innerHTML

                let column = [parseInt(totalone), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredColumn = column.filter(num => num)
                let missing = 4 - filteredColumn.length
                let zeros = Array(missing).fill(0)
                let newColumn = zeros.concat(filteredColumn)
                squares[i].innerHTML = newColumn[0]
                squares[i + width].innerHTML = newColumn[1]
                squares[i + width * 2].innerHTML = newColumn[2]
                squares[i + width * 3].innerHTML = newColumn[3]
            }
        }


        function combineRow() {
            for (let i = 0; i < 15; i++){
                if(squares[i].innerHTML === squares[i+1].innerHTML){
                    let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                    squares[i].innerHTML = combinedTotal
                    squares[i+1].innerHTML = 0
                    score += combinedTotal
                    scoreDispaly.innerHTML = score
                }
            }
            checkForWin()

        }
        function combineColumn() {
            for (let i = 0; i < 12; i++){
                if(squares[i].innerHTML === squares[i+width].innerHTML){
                    let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                    squares[i].innerHTML = combinedTotal
                    squares[i+width].innerHTML = 0
                    score += combinedTotal
                    scoreDispaly.innerHTML = score
                }
            }
            checkForWin()

        }
        function control (e) {
            if (e.key === 'ArrowLeft') {
                keyLeft()
            }else if (e.key === 'ArrowRight') {
                keyRight()
            }else if (e.key === 'ArrowUp') {
                keyUp()
            }else if (e.key === 'ArrowDown') {
                keyDown()
            }

        }
        document.addEventListener('keydown', control)

        function keyLeft(){
            moveLeft()
            combineRow()
            moveLeft()
            generate()
        }
        function keyRight(){
            moveRight()
            combineRow()
            moveRight()
            generate()
        }
        function keyUp(){
            moveup()
            combineColumn()
            moveup()
            generate()
        }
        function keyDown(){
            movedown()
            combineColumn()
            movedown()
            generate()
        }
        function checkForWin() {
            for (let i = 0; i < squares.length; i++){
                if (squares[i].innerHTML == 2048) {
                    resultDisplay.innerHTML = 'You WIN!'
                    document.removeEventListener('keydown', control)
                    setTimeout(clear, 2000)

                }
            }
        }
        function checkForGameOver() {
            let hasEmptyTile = squares.some(square => square.innerHTML == 0)
            if (hasEmptyTile) return // Game is not over if there's an empty tile
        
            for (let i = 0; i < squares.length; i++) {
                // Check right (ignore rightmost columns)
                if (i % width !== width - 1 && squares[i].innerHTML === squares[i + 1].innerHTML) {
                    return // still a valid move
                }
        
                // Check down (ignore bottom row)
                if (i < squares.length - width && squares[i].innerHTML === squares[i + width].innerHTML) {
                    return // still a valid move
                }
            }
        
            // No empty squares, and no possible merges
            resultDisplay.innerHTML = 'You LOSE!'
            document.removeEventListener('keydown', control)
            setTimeout(clear, 2000)
        }
        function clear() {
            clearInterval(myTimer)
        }
        function addColours () {
            for (let i = 0; i < squares.length; i++){
                if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192'
                else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#eee4da'
                else if (squares[i].innerHTML == 4) squares[i].style.backgroundColor = '#ede0c8'
                else if (squares[i].innerHTML == 8) squares[i].style.backgroundColor = '#f2b179'
                else if (squares[i].innerHTML == 16) squares[i].style.backgroundColor = '#f59563'
                else if (squares[i].innerHTML == 32) squares[i].style.backgroundColor = '#f67c5f'
                else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#f65e3b'
                else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#edcf72'
                else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#edcc61'
                else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#edc850'
                else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#edc53f'
                else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#edc22e'
                    
                }
        } 
        addColours()
        
        let myTimer = setInterval(addColours, 50)
})