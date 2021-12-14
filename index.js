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

  return table;
}

const getUsers = (user, count, table) => {
    const row = document.createElement("tr");
    row.classList.add('table-row')

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

const testAsyncAwait = async (urlString) => {
    try {
        const res = await fetch(urlString);
        if (!(res.status === 200)) throw new Error();

        const usersArr = await res.json();
        let count = 1;
        const table = createTable();

        console.log("Async / await");

        for (let user of usersArr) {
            getUsers(user, count, table);
            count += 1;
        }
    }
    catch (e) {
        throwErr(e);
    }
}

const testPromise = (urlString) => {
    fetch(urlString)
    .then(response => {
        if (!(response.status === 200)) throw new Error()
        else return response.json()
    })
    .then(usersArr => {

        let count = 0;
        const table = createTable();
        console.log("Promise");

        for (let user of usersArr) {
            getUsers(user, count, table);
            count += 1;
        }
    })
    .catch(e => {
        throwErr(e)
    })
}


testAsyncAwait(usersUrl);
// testPromise(usersUrl);
