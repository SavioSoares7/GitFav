export class Favorites {
  constructor() {
    this.button = document.getElementById("button-add");
    this.input = document.getElementById("input-fav");
    this.tbody = document.getElementsByTagName("tbody")[0];
    this.button.addEventListener("click", () => {
      this.UserGitHub();
    });
  }
  emptyTable() {
    alert("Elemento vazio");
  }
  async UserGitHub() {
    if (this.input.value == "") {
      alert("Campo vazio!");
      return;
    }

    let user = this.input.value;
    let API = `https://api.github.com/users/${user}`;

    let req = await fetch(API);
    let res = await req.json();

    if (req.status != 404) {
      this.CreateElement(res);
    } else {
      alert("Usuario não encontrado");
    }
  }

  CreateElement(json) {
    let tr = document.createElement("tr");

    let tdName = document.createElement("td");
    tdName.innerText = json.login;

    let tdRepos = document.createElement("td");
    tdRepos.innerText = json.public_repos;

    let tdFollow = document.createElement("td");
    tdFollow.innerText = json.followers;

    let tdIcon = document.createElement("td");
    let icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-trash-can");
    icon.addEventListener("click", () => {
      this.removeItem(tr);
    });
    tdIcon.append(icon);

    tr.appendChild(tdName);
    tr.appendChild(tdRepos);
    tr.appendChild(tdFollow);
    tr.appendChild(tdIcon);

    this.tbody.append(tr);
  }
  removeItem(tr) {
    const itens = this.tbody.childNodes;
    for (let item of itens) {
      if (item.isSameNode(tr)) {
        item.remove();
      }
    }
  }
}
