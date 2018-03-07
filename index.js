function getRepositories() {
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", "https://api.github.com/users/" + username +"/repos")
  req.send()
}

function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText)
  const reposList = `<ul>${repos.map(r =>
    '<li>' + r.name + ' - ' + r.html_url + ' - <a href="#" data-repo="'+ r.name +'" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = reposList
}

function getCommits(el) {
  const name = el.dataset.repository
  const uri = "https://api.github.com" + "/repos/" + el.dataset.username + "/" + name + "/commits"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", uri)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const name = el.dataset.repository
  const uri = "https://api.github.com" + "/repos/" + el.dataset.username + "/" + name + "/branches"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", uri)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
