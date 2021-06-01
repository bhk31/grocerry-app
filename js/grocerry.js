const LIMIT = 5;

setBodyHeight();

let user = {
  canAddItem: true,
  items: [],
};

getSelectedElement("login").onclick = function () {
  user.userName = getInputElementFromForm("login-form", "user-name");

  if (user.userName === "") {
    removeHtmlClass("required-field-user", "hide");
    return;
  }

  users = getUsers();

  if (users && users[user.userName]) {
    user = users[user.userName];
    let strHtml = "";

    if (user.limit !== 5) {
      user.items.forEach((element) => {
        strHtml = strHtml + createListItem(element);
      });
    }

    getSelectedElement("listContainer").insertAdjacentHTML(
      "beforeend",
      strHtml
    );
  }

  removeHtmlClass("loggedIn", "hide");
  addHtmlClass("loginContainer", "hide");
  setInnerHtml("heading", "Welcome " + user.userName + " to your grocery list");

  if (false === user.canAddItem) {
    warningAndDisableButton();
  }

  setLimitHtml(LIMIT - user.items.length);
};

function createListItem(element) {
  return (
    '<div class="list-item" id="'+element+'"><div class="item-name">' +
    element +
    '<input type="hidden" value="'+element+'" name="'+element+'" value="'+element+'"></input>' +
    '<button class="hide" id="update-' +
    element +
    '"onclick="updateItem(\'' +
    element +
    '\')">Update</button>'+
    '<button class="hide" id="cancel-' +
    element +
    '"onclick="cancelItem(\'' +
    element +
    '\')">Cancel</button>'+
    '</div><div class="button-container"><button id="delete-' +
    element +
    '"onclick="deleteItem(\'' +
    element +
    '\')">Delete</button><button id="edit-' +
    element +
    '" onclick="editItem(\'' +
    element +
    "')\">Edit</button></div></div>"
  );
}

getSelectedElement("save").onclick = function () {
  if (true === user.canAddItem) {
    addItemToItems();
  }

  save();
};

function addItemToItems() {
  let item = getInputElementFromForm("grocerry-form", "item");

  if (item) {
    addHtmlClass("required-field", "hide");

    if (false === compareListItems(item)) {
      addHtmlClass("existing-item", "hide");

      let strHtml = createListItem(item);

      getSelectedElement("listContainer").insertAdjacentHTML(
        "beforeend",
        strHtml
      );

      user.items.push(item);

      user.limit = LIMIT - user.items.length;
      setLimitHtml(user.limit);

      if (5 === user.items.length) {
        user.canAddItem = false;
        warningAndDisableButton();
      }
      console.log(user);
    } else {
      removeHtmlClass("existing-item", "hide");
    }
  } else {
    removeHtmlClass("required-field", "hide");
  }
}

function compareListItems(item) {
  return user.items.includes(item);
}

function warningAndDisableButton() {
  removeHtmlClass("warning-message", "hide");
}

function save() {
  let users = {};

  if (getUsers(false)) {
    users = getUsers();
  }

  let key = user.userName;
  users[key] = user;

  console.log(JSON.stringify(users));
  setUsers(users);

  users = getUsers(true);
  keys = Object.keys(users);
  let usersCount = keys.length;

  if (4 === usersCount) {
    deleteAndUpdateUsers(users, keys);
  }
}

function deleteAndUpdateUsers(users, keys) {
  delete users[keys[0]];
  setUsers(users);
}

function deleteItem(element) {
  user.items = user.items.filter(function (item) {
    return item !== element;
  });

  if (5 > user.items.length) {
    user.canAddItem = true;
    user.limit = LIMIT - user.items.length;
    addHtmlClass("warning-message", "hide");
  }

  getSelectedElement("delete-" + element).parentNode.parentNode.remove();
  setLimitHtml(user.limit);

  save();
}

function getSelectedElement(element) {
  return document.getElementById(element);
}

function getInputElementFromForm(form, input) {
  let formData = new FormData(getSelectedElement(form));
  return formData.get(input);
}

function addHtmlClass(element, className) {
  getSelectedElement(element).classList.add(className);
}

function removeHtmlClass(element, className) {
  getSelectedElement(element).classList.remove(className);
}

function setBodyHeight() {
  let h = window.innerHeight;
  document.querySelector("body").setAttribute("style", "height:" + h);
}

function setInnerHtml(element, html) {
  getSelectedElement(element).innerHTML = html;
}

function setLimitHtml(html) {
  setInnerHtml("limit", html);
}

function getUsers(isParsed = true) {
  if (true === isParsed) {
    return JSON.parse(localStorage.getItem("users"));
  }

  return localStorage.getItem("users");
}

function setUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function editItem(element) {
  document.getElementById("edit-" + element).parentElement.parentElement.childNodes[0].childNodes[0].nodeValue = ''
  removeHtmlClass('update-'+element, 'hide');
  removeHtmlClass('cancel-'+element, 'hide');
  console.log(document.getElementById("edit-" + element).parentElement.parentElement.childNodes[0].childNodes[1].setAttribute('type', 'text'));
}

function updateItem(element) {
  
  const newValue = document.querySelector('input[name="'+element+'"]').value;

  user.items.map((value, index) => {
    if( value === element ) {
      user.items[index] = newValue
    }
  });

  save();
  getSelectedElement(element).remove();

  const strHtml = createListItem(newValue);

  getSelectedElement("listContainer").insertAdjacentHTML(
    "beforeend",
    strHtml
  );

}


function cancelItem(element) {
  const inputElement = getSelectedElement(element).querySelector('input');
  inputElement.setAttribute('type', 'hidden');
  document.getElementById("edit-" + element).parentElement.parentElement.childNodes[0].childNodes[0].nodeValue = element;
//   inputElement.insertAdjacentText('beforebegin', element);
  getSelectedElement(`update-${element}`).addHtmlClass;
  addHtmlClass(`update-${element}`, 'hide')
  addHtmlClass(`cancel-${element}`, 'hide')
}