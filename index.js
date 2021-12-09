const usersUrl = "https://api.github.com/users";

fetch(usersUrl)
    .then(res => res.json())
    .then(com => console.log(com))

fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
    .then(response => response.json())
    .then(commits => console.log(commits))