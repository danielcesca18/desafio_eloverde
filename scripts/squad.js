const card_row = document.getElementById('card-row');

const id = window.location.search.substring(1).split('?');
console.log(id);

const title = document.getElementById('title');
const logo = document.getElementById('logo');

const URL = 'https://api.football-data.org/v2/teams';
const config = {
  headers: {'X-Auth-Token': 'c710e33b71fe486c949abef77404ed69',
}
}; 

  axios.get((`${URL}/${id}`), config).then(response => {
    console.log(response.data);
    title.textContent = response.data.name;
    logo.src = response.data.crestUrl;
    logo.setAttribute('onerror',"this.src='https://apexrfc.com/web/sites/default/files/2020-03/product_image_not_available.png'") 

    if(response.data.squad.length === 0){
      console.log('Error: Empty Squad');
      const container = document.getElementById('container');
      const h5 = document.createElement('h5');
      h5.textContent = 'Conteúdo fornecido pela API está vazio';
      const a = document.createElement('a');
      a.setAttribute('href', 'https://www.football-data.org/documentation/api#errors');
      a.textContent = 'Saiba mais';
      container.appendChild(h5);
      container.appendChild(a);
    }else{

    response.data.squad.forEach(squad => {

      const card_grid = document.createElement('div');
      card_grid.setAttribute('class', 'col mb-4');

      const card = document.createElement('div');
      card.setAttribute('class', 'card text-center h-100');

      const card_body = document.createElement('div');
      card_body.setAttribute('class', 'card-body');

      function calcAge(dateString) {
        var birthday = +new Date(dateString);
        return ~~((Date.now() - birthday) / (31557600000));
      }

      if(squad.role === 'COACH'){
        const tec_name = document.getElementById('tec_name');
        tec_name.textContent = squad.name;

        const tec_nat = document.getElementById('tec_nat');
        tec_nat.textContent = squad.nationality;

        const tec_age = document.getElementById('tec_age');
        tec_age.textContent = `${calcAge(squad.dateOfBirth)} anos`;
      }else{

        const h5 = document.createElement('h5');
        h5.setAttribute('class', 'card-title');
        h5.textContent = squad.name;

        const ul = document.createElement('ul');
        ul.setAttribute('class', 'list-group list-group-flush');

        const position = document.createElement('li');
        position.setAttribute('class', 'list-group-item');

        if(squad.position === null){
          position.textContent = "N/A";
        }else{
          position.textContent = squad.position;
        }

        const nationality = document.createElement('li');
        nationality.setAttribute('class', 'list-group-item');
        nationality.textContent = squad.nationality;

        const age = document.createElement('li');
        age.setAttribute('class', 'list-group-item');
        age.textContent = `${calcAge(squad.dateOfBirth)} anos`;

        ul.appendChild(position);
        ul.appendChild(nationality);
        ul.appendChild(age);
        card_row.appendChild(card_grid);
        card_grid.appendChild(card);
        card.appendChild(card_body);
        card_body.appendChild(h5);
        card_body.appendChild(ul);
      }
    })
    }
  }) .catch(error => {
    console.log(error.response);

    const container = document.getElementById('container');
    const h5 = document.createElement('h5');
    h5.textContent = 'Conteúdo bloqueado pela API (403 Restricted Resource)';
    const a = document.createElement('a');
    a.setAttribute('href', 'https://www.football-data.org/documentation/api#errors');
    a.textContent = 'Saiba mais';
    container.appendChild(h5);
    container.appendChild(a);
  })

