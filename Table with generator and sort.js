"use strict";
var tasksList = [];
var lastIndex = 0;
var filterObjRules = {  //объект с памятью про сортировку
   name: 1,
   state: 1,
   answer: 1,
   lastSortProperty: "name",
   lastSort: function () {
      let prop = this.lastSortProperty;
      this[prop] *= -1;
      sortByProperty (prop);
   }
};
document.getElementById("generate10Strings").onclick =  generate10Strings;
document.getElementById("nameId").onclick = sortByName;
document.getElementById("stateId").onclick = sortByState;
document.getElementById("answerId").onclick = sortByAnswer;
document.getElementById("add").onclick = addTask;

function addTask() {       //добавление тасков
   let name = document.getElementById("name").value;
   let state = document.getElementById("state").value;
   let answer = document.getElementById("answer").value;
   if (name.length <= 0 || state.length <= 0 || answer.length <=0) {
      alert("Поля не могут быть пустыми!");
      return false;   
   }
   tasksList.push(new Task(name, state, answer));
   filterObjRules.lastSort();
   refreshTbody();
}

document.getElementById("mainContent").addEventListener("click", onRowContainerClick, true);
function onRowContainerClick(event) {
    if (event.target.classList.contains("delBut")) {
        const row = event.target.parentElement.parentElement;
        console.log(event);
        console.log(row);
        const container = row.parentElement;        
        const rowIndex = Array.prototype.indexOf.call(container.children, row);
        console.log(rowIndex);
        tasksList.splice(rowIndex, 1);
        refreshTbody();
    }
}

class Task {
   constructor(name, state, answer) {
      this.name = name;
      this.state = state;
      this.answer = answer;
      this.id = lastIndex++;      
   } 
}

function sortByName () { 
   let prop = "name";
   sortByProperty (prop);     
}
function sortByState () { 
   let prop = "state";
   sortByProperty (prop);     
}
function sortByAnswer () { 
   let prop = "answer";
   sortByProperty (prop);     
}

function sortByProperty (prop) {  
   filterObjRules.lastSortProperty = prop;
   tasksList.sort((a, b) => {if (String(a[prop]) > String(b[prop])) 
         {return filterObjRules[prop]} 
      else 
         {return filterObjRules[prop] * -1}}); 
   filterObjRules[prop] *= -1;   
   refreshTbody();           
}

function generate10Strings () {
   let counter = 10;
   while (counter > 0) {
      tasksList.push(new Task(Math.round((Math.random() * 1000)), 
      Math.round((Math.random() * 100)), 
      Math.round((Math.random() * 20))));
      counter--;
   }
   refreshTbody();   
}

function removeAllChildrenElem (container) {  
   while (container.firstChild) {
      container.removeChild(container.firstChild);
   }   
}

function refreshTbody() {          
   let container = document.getElementById("mainContent");
   let numb = 0;
   removeAllChildrenElem(container);   
   tasksList
      .map((value, index) => createRowForTask(value, index + 1))
      .forEach((value) => container.appendChild(value));   
}

function createRowForTask(task, num) {
   let row = document.createElement("tr");
   let cellNumber = document.createElement("td");
   cellNumber.innerHTML = num;
   row.appendChild(cellNumber);
   
   let cellName = document.createElement("td");
   cellName.innerHTML = task.name;
   row.appendChild(cellName);
   
   let cellState = document.createElement("td");
   cellState.innerHTML = task.state;
   row.appendChild(cellState);
   
   let cellAnswer = document.createElement("td");
   cellAnswer.innerHTML = task.answer;
   row.appendChild(cellAnswer);
   
   let cellDel = document.createElement("td");
   let butDel = document.createElement("button");
   butDel.type = "button";
   butDel.innerHTML = "X";
   butDel.id = task.id;
   butDel.className = "delBut";
   cellDel.appendChild(butDel);
   row.appendChild(cellDel);
   
   return row;
}
