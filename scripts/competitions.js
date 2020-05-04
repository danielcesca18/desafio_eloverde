const card_row = document.getElementById('card-row');

const URL = 'https://api.football-data.org/v2/competitions/';
const config = {
  headers: {'X-Auth-Token': 'c710e33b71fe486c949abef77404ed69',
}
};

axios.get(URL, config).then(response => {
  console.log(response.data);

  response.data.competitions.forEach(competitions => {

    const card_grid = document.createElement('div');
    card_grid.setAttribute('class', 'col mb-4');

    const card = document.createElement('div');
    card.setAttribute('class', 'card text-center h-100');

    const logo = document.createElement('img');
    logo.setAttribute('class', 'card-img-top');
    logo.setAttribute('alt', '...');
    logo.setAttribute('onerror',"this.src='https://apexrfc.com/web/sites/default/files/2020-03/product_image_not_available.png'") 
    logo.src = competitions.emblemUrl;

    const card_body = document.createElement('div');
    card_body.setAttribute('class', 'card-body');

    const h5 = document.createElement('h5');
    h5.setAttribute('class', 'card-title');
    h5.textContent = competitions.name;

    const button = document.createElement('button');
    button.setAttribute('class', 'btn btn-primary');
    button.textContent = "Acessar";

    button.onclick = function handleId(){
      const id = competitions.id; 
      window.location.href =`teams.html?${id}`;
    };

    card_row.appendChild(card_grid);
    card_grid.appendChild(card);
    card.appendChild(logo);
    card.appendChild(card_body);
    card_body.appendChild(h5);
    card_body.appendChild(button);
  })
}) .catch(error => {
  console.log(error);

  const container = document.getElementById('container');
  const h5 = document.createElement('h5');
  h5.textContent = `${error}`;
  const a = document.createElement('a');
  a.setAttribute('href', 'https://www.football-data.org/documentation/api#errors');
  a.textContent = 'Saiba mais';
  container.appendChild(h5);
  container.appendChild(a);
})