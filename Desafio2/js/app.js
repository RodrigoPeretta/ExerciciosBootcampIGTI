main();

var dataOriginal = [];
var data = [];
var listUser;
var userText;
var statisticText;
var inputSearch;
var buttonSearch;

async function main() {
  dataOriginal = await loadPeople();
  data = dataOriginal;
  getComponents();
  setEvents();
  
  updateListUser(data);
}

async function loadPeople() {
  let res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  let resJson = await res.json();
  return resJson.results.map((person)=>{
    return {
      name: `${person.name.first} ${person.name.last}`,
      picture: person.picture.thumbnail,
      age: person.dob.age,
      gender: person.gender
    }
  });
}

function getComponents() { 
  listUser = document.querySelector('#users');
  userText = document.querySelector('#textUser');

  listStatistics = document.querySelector('#statistics');
  statisticText = document.querySelector('#statisticText');

  inputSearch = document.querySelector('#inputSearch');
  buttonSearch = document.querySelector('#buttonSearch');
}

function setEvents() {
  inputSearch.addEventListener('keyup', (event) => {
    if(event.key === 'Enter') {
      filterUser();
    }
  });

  buttonSearch.addEventListener('click', filterUser);
}

function filterUser() {
  const searchText = inputSearch.value;
  if(searchText.length > 0) {
    data = dataOriginal.filter((user) => user.name.toLowerCase().includes(searchText.toLowerCase()));
  } else {
    data = dataOriginal;
  }

  updateListUser();
}

function updateListUser() {
  fillListUser();
  if(data.length > 0) {
    setText();
    fillStatistics();
  } else {
    setTextNotUser();
  }
} 


function fillListUser(){
  listUser.innerHTML = '';
  data.forEach((item)=> {
    listUser.appendChild(createLi(item.name));
  })
  
  setText();
}

function setText(){
  userText.textContent = `${data.length} usuário(s) encontrado(s)`;
  statisticText.textContent = `Estatísticas`;
}

function setTextNotUser(){
  userText.textContent = `Nenhum usuário filtrado`;
  statisticText.textContent = `Nada a ser exibido`;
  listStatistics.innerHTML = '';
}

function fillStatistics(){
  const ages = calcAge();
  listStatistics.innerHTML = '';

  listStatistics.appendChild(createLi(`Sexo masculino: ${calcGender('male')}`));
  listStatistics.appendChild(createLi(`Sexo feminino: ${calcGender('female')}`));
  listStatistics.appendChild(createLi(`Soma da Idades: ${ages}`));
  listStatistics.appendChild(createLi(`Média das Idades: ${calcAvgAge(ages)}`));
}

function calcGender(gender) {
  return data.filter((x) => x.gender == gender).length;
}

function calcAge() {
  return data.reduce((accumulator, current) => { 
    return accumulator + current.age;
  }, 0);
}

function calcAvgAge(ages) {
  return (ages / data.length).toFixed(2);
}

function createLi(text) {
  var element = document.createElement('li')
  element.appendChild(document.createTextNode(text));
  return element;
}