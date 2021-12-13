const usersUrl = "https://api.github.com/users";

const createTable = () => {
  const headers = ['№', 'Login', 'ID', 'Type'];
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  for (let nameTh of headers) {
      let th = document.createElement('th');
      th.textContent = nameTh;
      thead.appendChild(th);
  }
  table.appendChild(thead);
  table.classList.add('table');
  document.body.appendChild(table);
}

const getUsers = (user, count, table) => {
    createTable()
    // const table = document.querySelector(".table");
    const row = document.createElement("tr");
    row.classList.add(`${'table-row'}`)

    const cellNum = document.createElement("td");
    const cellLogin = document.createElement("td");
    const cellId = document.createElement("td");
    const cellType = document.createElement("td");

    cellNum.textContent = `${count}`
    cellId.textContent = user.id;
    cellType.textContent = user.type;
    cellLogin.textContent = user.login;

    row.appendChild(cellNum)
    row.appendChild(cellLogin);
    row.appendChild(cellId);
    row.appendChild(cellType);
    table.appendChild(row);
}

const throwErr = (e) => {

    const errorBlock = document.createElement("div");
    errorBlock.classList.add("error");

    const errorText = document.createElement("p");
    errorText.innerHTML = `Произошла ошибка загрузки данных :с <br>
        Попробуйте обновить страницу`;

    console.log(e);
    document.body.appendChild(errorBlock);
    errorBlock.appendChild(errorText);
}


let testAsyncAwait = async () => {
    try {
        const res = await fetch(usersUrl);
        const usersArr = await res.json();
        let count = 1;
        const table = createTable();

        for (let user of usersArr) {
            getUsers(user, count, 1)
            count += 1;
        }
    }
    catch (e) {
        throwErr(e, 0)
    }
}

const testPromise = (urlString) => {
    fetch(urlString)
    .then(response => response.json())
    .then(usersArr => {
        let count = 0;
        for (let user of usersArr) {
            getUsers(user, count, 1)
            count += 1;
        }
    })
}

testAsyncAwait()
// testPromise(usersUrl)