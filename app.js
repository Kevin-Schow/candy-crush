document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid')
	const width = 8
	const squares = []
	let score = 0

	const candyColors = [
	'red',
	'yellow',
	'orange',
	'purple',
	'green',
	'blue'
	]

	// Create Board
	function createBoard() {
		for (let i = 0; i < width*width; i++) {
			const square = document.createElement('div')
			square.setAttribute('draggable', true)
			square.setAttribute('id', i)
			let randomColor = Math.floor(Math.random() * candyColors.length)
			square.style.backgroundColor = candyColors[randomColor]
			grid.appendChild(square)
			squares.push(square)
		}
	}

	createBoard()

	// Drag Candies
	let colorBeingDragged
	let colorBeingReplaced
	let squareIdBeingDragged
	let squareIdBeingReplaced

	// Drag Events
	squares.forEach(square => square.addEventListener('dragstart', dragStart))
	squares.forEach(square => square.addEventListener('dragend', dragEnd))
	squares.forEach(square => square.addEventListener('dragover', dragOver))
	squares.forEach(square => square.addEventListener('dragenter', dragEnter))
	squares.forEach(square => square.addEventListener('dragleave', dragLeave))
	squares.forEach(square => square.addEventListener('drop', dragDrop))


	function dragStart() {
		colorBeingDragged = this.style.backgroundColor
		squareIdBeingDragged = parseInt(this.id)
	}

	function dragOver(e) {
		e.preventDefault()
	}

	function dragEnter(e) {
		e.preventDefault()
	}

	function dragLeave() {
		pass
	}

	function dragDrop() {
		colorBeingReplaced = this.style.backgroundColor
		squareIdBeingReplaced = parseInt(this.id)
		this.style.backgroundColor = colorBeingDragged
		squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
	}

	function dragEnd() {
		// What is a valid move
		let validMoves = [
		squareIdBeingDragged - 1,
		squareIdBeingDragged - width,
		squareIdBeingDragged + 1,
		squareIdBeingDragged + width,
		 ]
		let validMove = validMoves.includes(squareIdBeingReplaced)

		if (squareIdBeingReplaced && validMove) {
			squareIdBeingReplaced = null
		} else if (squareIdBeingReplaced && !validMove) {
			squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced
			squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
		} else squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
	}


	// Check for Matches
	// Row of 3
	function checkRowForThree() {
		for (i = 0; i < 61; i++) {
			let rowOfThree = [i, i+1, i+2]
			let decidedColor = squares[i].style.backgroundColor
			const isBlank = squares[i].style.backgroundColor === ''

			const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
			if (notValid.includes(i)) continue

			if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor  && !isBlank)) {
				score += 3
				rowOfThree.forEach(index => {
					squares[index].style.backgroundColor = ''
				})
			}
		}
	}
	checkRowForThree()

	// Column of 3
	function checkColForThree() {
		for (i = 0; i < 47; i++) {
			let colOfThree = [i, i+width, i+width*2]
			let decidedColor = squares[i].style.backgroundColor
			const isBlank = squares[i].style.backgroundColor === ''

			if (colOfThree.every(index => squares[index].style.backgroundColor === decidedColor  && !isBlank)) {
				score += 3
				colOfThree.forEach(index => {
					squares[index].style.backgroundColor = ''
				})
			}
		}
	}
	checkColForThree()

	// Row of 4
	function checkRowForFour() {
		for (i = 0; i < 60; i++) {
			let rowOfFour = [i, i+1, i+2, i+3]
			let decidedColor = squares[i].style.backgroundColor
			const isBlank = squares[i].style.backgroundColor === ''

			const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
			if (notValid.includes(i)) continue

			if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor  && !isBlank)) {
				score += 4
				rowOfFour.forEach(index => {
					squares[index].style.backgroundColor = ''
				})
			}
		}
	}
	checkRowForFour()

	// Column of 4
	function checkColForFour() {
		for (i = 0; i < 47; i++) {
			let colOfFour = [i, i+width, i+width*2, i+width*3]
			let decidedColor = squares[i].style.backgroundColor
			const isBlank = squares[i].style.backgroundColor === ''

			if (colOfFour.every(index => squares[index].style.backgroundColor === decidedColor  && !isBlank)) {
				score += 4
				colOfFour.forEach(index => {
					squares[index].style.backgroundColor = ''
				})
			}
		}
	}
	checkColForFour()

	window.setInterval(function() {
		checkRowForFour()
		checkColForFour()
		checkRowForThree()
		checkColForThree()

	}, 100)

})