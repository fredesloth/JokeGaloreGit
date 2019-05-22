const jokeContainer = document.getElementById('jokes');
const btnPost = document.getElementById('btnPost');
const serviceContainer = document.getElementById('services');
const newJokeContainer = document.getElementById('newJoke');
const maxJokes = 50;


update();

async function update() {
    jokeContainer.innerHTML = '';
    serviceContainer.innerHTML = '';
    for (let input of document.querySelectorAll('input')) input.value = '';
    servicesGet();
}

function jokesUpdate() {
    jokeContainer.innerHTML = '';
    for (let input of document.querySelectorAll('input')) input.value = '';
    if (serviceContainer.value != '0') {
        jokesGet(serviceContainer.value);
    }
}

async function jokesGet(id) {
    jokeContainer.innerHTML = 'Loading...';
    let template;
    let response;
 
    if (!id || serviceContainer.options[serviceContainer.selectedIndex].id === 'https://jokegalore.herokuapp.com/') {
        response = await fetch('/api/jokes');
        template = await fetch('/joke.hbs');
    } else {
        response = await fetch('/api/otherjokes/' + id);
        template = await fetch('/otherJoke.hbs');
    }

    console.log(response);

    try {
        const templateText = await template.text();
        const jokes = await response.json();

        console.log(jokes);

        const compiledTemplate = Handlebars.compile(templateText);

        console.log(jokes.length);

        let jokesHTML = '';

        jokes.forEach(joke => {
            jokesHTML += compiledTemplate({
                id: joke._id,
                setup: joke.setup,
                punchline: joke.punchline,
            });
        });
        jokeContainer.innerHTML = jokesHTML;
    } catch (err) {
        console.log(err);
        jokeContainer.innerHTML = 'Failed to fetch jokes from service';
    }
}

async function servicesGet() {
    const [template, response] = await Promise.all([fetch('/service.hbs'), fetch('/api/othersites')]);
    const [templateText, services] = await Promise.all([template.text(), response.json()]);

    const compiledTemplate = Handlebars.compile(templateText);
    let HTML = '<option value="0" disabled selected>Select a site</option>';
    services.forEach(service => {
        HTML += compiledTemplate({
            id: service._id,
            name: service.name,
            address: service.address,
            secret: service.secret
        });
    });
    serviceContainer.innerHTML = HTML;
}

// Not yet implemented
async function deleteJoke(id) {
    try {
        const response = await fetch('/api/jokes/' + id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        const json = await response.json();
        console.log(`Resultat: %o`, json);
        jokesUpdate();
    } catch (err) {
        console.log(err);
    }
   
}

// Not yet implemented
async function editJoke(id) {
    const setup = document.getElementById('setup-' + id).innerText;
    const punchline = document.getElementById('punchline-' + id).innerText;
    if (setup.length > 0 && punchline.length > 0) {
        const msg = {
            setup: setup,
            punchline: punchline
        };
        try {
            const response = await fetch('/api/jokes/' + id, {
                method: 'PUT',
                body: JSON.stringify(msg),
                headers: {'Content-Type': 'application/json'}
            })
            const json = await response.json();
            console.log(`Result: %o`, json);
            alert('Your joke has been saved');
            jokesUpdate();
        } catch (err) {
            alert('Sorry, something went wrong: ', err);
            console.log(err);
        }
    }
}

// when the btnPost button element is clicked a new joke is posted to the currently selected service and the jokes are being updated
btnPost.onclick = async () => {
    let setup = document.getElementById('setup').value;
    let punchline = document.getElementById('punchline').value
    if (setup.length > 0 && punchline.length > 0) {
        const msg = {setup: setup, punchline: punchline};
        try {
            const response = await fetch('/api/jokes/' + serviceContainer.value, {
                method: "POST",
                body: JSON.stringify(msg),
                headers: {'Content-Type': 'application/json'}
            })
            if (response.status >= 400 || !response) {
                throw new Error('Failed to fetch');
            }
            const json = await response.json();
            console.log(`Resultat: %o`, json);
            updateJokes();
        } catch (err) {
            alert('Noget gik galt: ', err);
            console.log(err);
        }
    }
}

/* btnCreateService.onclick = async () => {
    const data = {name: 'Joke Galore', address: 'https://jokegalore.herokuapp.com/', secret: 'jokeGalore'};
    try {
        const service = await fetch('https://krdo-joke-registry.herokuapp.com/api/services', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.status >= 400 || !response){
            throw new Error("Fetch failed");
        }
        console.log(service);
    } catch (err) {
        console.log(err);
    }
}*/
