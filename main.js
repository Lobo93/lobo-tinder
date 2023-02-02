const cardArea = document.getElementById('cardArea')

// Get user data from API
async function getUsers(quantity) {
	const data = await( fetch(`https://randomuser.me/api/?results=${quantity}`) )
	const {results} = await( data.json() )
	results.forEach(userData => {
		buildCard(userData.name.first, userData.name.last, userData.dob.age, userData.picture.large)
	})
}

// Build cards
function buildCard(firstName, lastName, age, picture) {
	const cardTemplate = document.getElementById('cardTemplate')
	const newCard = cardTemplate.content.cloneNode(true);

	newCard.querySelector('.user-picture').src = picture
	newCard.querySelector('.user-info').textContent = `${firstName} ${lastName}, ${age}`

	cardArea.insertBefore(newCard, cardArea.firstElementChild)
}

// Like
function dislike() {
	const card = this.event.target.parentElement.parentElement
	card.classList.add('card-dislike')
	setTimeout(() => card.parentElement.removeChild(card), 500);
	// Generate 1 new card user
	getUsers(1)
}

// Like
function like() {
	const card = this.event.target.parentElement.parentElement
	card.classList.add('card-like')
	setTimeout(() => card.parentElement.removeChild(card), 500);
	// Generate 1 new card user
	getUsers(1)
}

// Generate 5 user cards on start
getUsers(5)