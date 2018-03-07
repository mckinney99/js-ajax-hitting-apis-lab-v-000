function getRepositories() {
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", "https://api.github.com/users/" + username +"/repos")
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r =>
    '<li><h3><a href="' + r.html_url + '">' + r.name + '</a></h3>' +'<a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '"onclick="getCommits(this)">Get Commits</a><br>' +
    '<a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '"onclick="getBranches(this)">Get Branches</a><br></li>').join("")}<ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.username
  const repoName = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", "https://api.github.com/repos/" + name + "/" + repoName + "/commits")
  req.send()
}

function displayCommits(event, data) {
  const commits = JSON.parse(this.responseText)
  const commitList = `<ul>${commits.map(c => '<li>' + c.author.login + c.commit.author.name + c.commit.message + '- <a href="#" data-repo="' + c.author.login + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitList
}

function getBranches(el) {
  const name = el.dataset.username
  const repoName = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", "https://api.github.com/repos/" + name + "/" + repoName + "/branches")
  req.send()
}

function displayBranches(event, data) {
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(b => '<li>' + b.name + '</li>')}</ul>`
  document.getElementById("details").innerHTML = branchList
}
