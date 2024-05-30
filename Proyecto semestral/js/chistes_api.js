fetch('https://v2.jokeapi.dev/joke/Any')
  .then(response => response.json())
  .then(data => {
    const chisteDiv = document.getElementById('chiste');
    if (data.type === 'single') {
      chisteDiv.innerText = data.joke;
    } else if (data.type === 'twopart') {
      chisteDiv.innerHTML = `<p>${data.setup}</p><p>${data.delivery}</p>`;
    }
  })
  .catch(error => console.error('Error al obtener el chiste:', error));
