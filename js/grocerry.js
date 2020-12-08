let user = {
    canAddItem: true,
};

const LIMIT = 5;

addItemToItems = addListItem();

document.getElementsByClassName('deleteButton').onclick = function() {
console.log(this.id);
}

// document.getElementById('add-item').onclick = function() {

//     if( user.canAddItem === true) {
//         addItemToItems();
//     } else {
//         document.getElementById('error-message').classList.remove('hide');
//     }

// }

document.getElementById('add-user-name').onclick = function() {

user.userName = document.getElementById('user-name').value;

if(localStorage.length != 0) {
    if(typeof localStorage.getItem(user.userName) == "string") {
        user = JSON.parse(localStorage.getItem(user.userName));
    }
}

if(user.limit !== 5) {
    user.items.forEach(element => {
        createListItem(element);

    });
}

if(false === user.canAddItem) {
    warningAndDisableButton();
}

document.getElementById('user-names').classList.add('hide')
document.getElementById('user-items').classList.remove("hide");
document.getElementById('message').innerHTML = 'Welcome ' + user.userName + ' to your Grocery list';
document.getElementById('limit').innerHTML =  LIMIT - user.items.length;
}

function addListItem() {
user.items = [];
let count = 0;

return function addToArray() {
    let item = document.getElementById('item').value;
    
    createListItem(item);
    
    user.items.push(item);
    
    user.limit = LIMIT - user.items.length;
    document.getElementById('limit').innerHTML = user.limit
    
    if( 5 === user.items.length) {
        user.canAddItem = false;
        warningAndDisableButton();
    }
    console.log(user);
}
}

function save() {
localStorage.setItem(user.userName, JSON.stringify(user));
console.log(localStorage.getItem(user.userName));
}


document.getElementById('save').onclick = function() {

if(true === user.canAddItem ) {
    addItemToItems()
}

save();
}

function warningAndDisableButton() {
document.getElementById('warning-message').classList.remove('hide');
}

function createListItem(element) {
let listItem = document.createElement("li");
listItem.setAttribute('data-element', element)

let listText = document.createTextNode(element);

let btn =  document.createElement("BUTTON");
let buttonText = document.createTextNode('Delete')
btn.appendChild(buttonText);
btn.setAttribute('class', 'deleteButton');
btn.setAttribute('id', element);
btn.setAttribute('onclick', 'deleteItem(\''+element+'\')');

listItem.appendChild(listText);
listItem.append(btn);

document.getElementById('list').appendChild(listItem);
}

document.getElementById('add-new-user').onclick = function() {
location.reload();
}

function deleteItem(element) {

user.items = user.items.filter(function(item) {
    return item !== element
});

if(5 > user.items.length) {
    user.canAddItem =true;
    user.limit = LIMIT-user.items.length;
    document.getElementById('warning-message').classList.add('hide');
}

document.getElementById(element).parentNode.remove()
document.getElementById('limit').innerHTML = user.limit;

save();        
}