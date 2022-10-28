fetch('http://localhost:3000/', {
    method: "GET",
    mode: "cors"})
    .then((response) => response.json())
    .then((data) => document.getElementById('quote').innerHTML = `<i>"${data.affirmation}"</i>`)
    .catch((e) => alert('There is a mistake: ' + e));


const form = document.getElementById('formQuote');
let newQuote = document.getElementById('newQuote');
console.log(form);
console.log(newQuote);

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const displayQuote = {
        affirmation: newQuote.value
    };
    console.log(displayQuote);
    fetch('http://localhost:3000/', {
        method: "POST",
        mode: "cors", 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(displayQuote)})
        .then((response) => response.json())
        .catch((e) => alert('There is a mistake: ' + e));
});