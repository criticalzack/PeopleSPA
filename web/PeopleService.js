let peopleMap = new Map();

function postPerson (person)
{
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/PeopleSPA/RestFulPeopleServlet");
    xhr.responseType = "json";
    xhr.onload = function() {
        let newPerson = xhr.response;
        peopleMap.set(newPerson.id, newPerson);
        let personView = new PeopleListPage(peopleMap);
        personView.makeAndSetView(document.getElementById("container"));
    };
    xhr.send(JSON.stringify(person));   
}

function putPerson(person)
{
        let xhr = new XMLHttpRequest();
        xhr.open("PUT", "/PeopleSPA/RestFulPeopleServlet/" + person.id);
        xhr.responseType = "json";
        xhr.onload = function() {
            let updatedPerson = xhr.response;

            peopleMap.get(updatedPerson.id).name = updatedPerson.name;
            peopleMap.get(updatedPerson.id).age = updatedPerson.age;            
            let personView = new PeopleListPage(peopleMap);
            personView.makeAndSetView(document.getElementById("container"));
        };
        xhr.send(JSON.stringify(person));
}

function deletePerson(personId)
{
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", "/PeopleSPA/RestFulPeopleServlet/" + personId);
        xhr.responseType = "json";
        xhr.onload = function() {
            let deletedPerson = xhr.response;

            peopleMap.delete(deletedPerson.id);
            let personView = new PeopleListPage(peopleMap);
            personView.makeAndSetView(document.getElementById("container"));
        };
        xhr.send();
}

class PeopleListPage
{
    constructor(peopleMap)
    {
        this.peopleMap = peopleMap;
    }
    makeAndSetView(container)
    {
        // empty the container
        while (container.hasChildNodes())
        {
            container.removeChild(container.lastChild);
        }
        // fill the container with the new view
        container.appendChild(this.makeTable());
        container.appendChild(this.makeAddButton());
    }
    makeButton(caption, handler, personId)
    {
        let button = document.createElement("button");
        button.setAttribute("data-id", personId);
        let buttonCaption = document.createTextNode(caption);
        button.onclick = handler;
        button.appendChild(buttonCaption);

        return button;
    }
    makeTableRow(person)
    {
        let row = document.createElement("tr");

        let id = document.createElement("td");
        let name = document.createElement("td");
        let age = document.createElement("td");
        let viewDetails = document.createElement("td");
        let editDetails = document.createElement("td");
        let deleteRow = document.createElement("td");

        let idText = document.createTextNode(person.id);
        let nameText = document.createTextNode(person.name)
        let ageText = document.createTextNode(person.age);
        let viewDetailsButton = this.makeButton("View Details", this.viewDetailsHandler, person.id);
        let editDetailsButton = this.makeButton("Edit Details", this.editDetailsHandler, person.id);
        let deleteButton = this.makeButton("Delete", this.deleteHandler, person.id);

        id.appendChild(idText);
        name.appendChild(nameText);
        age.appendChild(ageText);
        viewDetails.appendChild(viewDetailsButton);
        editDetails.appendChild(editDetailsButton);
        deleteRow.appendChild(deleteButton);

        row.appendChild(id);
        row.appendChild(name);
        row.appendChild(age);
        row.appendChild(viewDetails);
        row.appendChild(editDetails);
        row.appendChild(deleteRow);

        return row;
    }
    makeTable()
    {
        let table = document.createElement("table");

        let tableHead = document.createElement("thead");

        let idHeader = document.createElement("th");
        let nameHeader = document.createElement("th");
        let ageHeader = document.createElement("th");

        let idText = document.createTextNode("Id");
        let nameText = document.createTextNode("Name");
        let ageText = document.createTextNode("Age");

        idHeader.appendChild(idText);
        nameHeader.appendChild(nameText);
        ageHeader.appendChild(ageText);

        tableHead.appendChild(idHeader);
        tableHead.appendChild(nameHeader);
        tableHead.appendChild(ageHeader);

        table.appendChild(tableHead);

        let tableBody = document.createElement("tbody");

        for (var person of this.peopleMap.values())
        {
            let row = this.makeTableRow(person);
            tableBody.appendChild(row);
        }

        table.appendChild(tableBody);
        // ****** stuff goes here
        return table;
    }
    makeAddButton()
    {
        var button = document.createElement("button");
        button.innerHTML = "Add a new person";
        button.onclick = this.addButtonHandler;
        return button;
    }
    addButtonHandler(evt)
    {
        var container = document.getElementById("container");
        var addPersonPage = new AddPersonPage();
        addPersonPage.makeAndSetView(container);
    }
    viewDetailsHandler(evt)
    {
        //alert("View Details of " + evt.target.dataset.id);
    }
    editDetailsHandler(evt)
    {
        //alert(evt.target.dataset.id);
        let container = document.getElementById("container");
        let editPersonPage = new EditPersonPage(evt.target.dataset.id);
        editPersonPage.makeAndSetView(container);
    }
    deleteHandler(evt)
    {
        let container = document.getElementById("container");
        let deletePersonPage = new DeletePersonPage(evt.target.dataset.id);
        deletePersonPage.makeAndSetView(container);    
    }
}

class AddPersonPage
{
    construtor()
    {
        let that = this;
    }
    makeAndSetView(container)
    {
        while (container.hasChildNodes())
        {
            container.removeChild(container.lastChild);
        }
        
        let prompt = document.createTextNode("Add information for a new person");
        
        let table = document.createElement("table");
        let tBody = document.createElement("tbody");
        
        let nameRow = document.createElement("tr");
        
        let nameTextCol = document.createElement("td");
        let nameText = document.createTextNode("Name");
        nameTextCol.appendChild(nameText);
        
        let nameInputCol = document.createElement("td");
        let nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("id", "name");
        nameInputCol.appendChild(nameInput);
        
        nameRow.appendChild(nameTextCol);
        nameRow.appendChild(nameInputCol);
        
        let ageRow = document.createElement("tr");
        let ageTextCol = document.createElement("td");
        let ageText = document.createTextNode("Age");
        ageTextCol.appendChild(ageText);
        
        let ageInputCol = document.createElement("td");
        let ageInput = document.createElement("input");
        ageInput.setAttribute("type", "text");
        ageInput.setAttribute("id", "age");
        ageInputCol.appendChild(ageInput);
        
        ageRow.appendChild(ageTextCol);
        ageRow.appendChild(ageInputCol);
        
        let buttonRow = document.createElement("tr");
        let addButtonCol = document.createElement("td"); 
        let addButton = this.makeButton("Add", this.addPersonHandler);
        addButtonCol.appendChild(addButton);
        let cancelButtonCol = document.createElement("td");
        let cancelButton = this.makeButton("Cancel", this.cancelAddPersonHandler);
        cancelButtonCol.appendChild(cancelButton);
        buttonRow.appendChild(addButtonCol);
        buttonRow.appendChild(cancelButtonCol);
        
        tBody.appendChild(nameRow);
        tBody.appendChild(ageRow);
        tBody.appendChild(buttonRow);
        table.appendChild(tBody);
        
        container.appendChild(prompt);
        container.appendChild(table);
    }
    makeButton(caption, handler)
    {
        let button = document.createElement("button");
        let buttonText = document.createTextNode(caption);
        button.onclick = handler;
        button.appendChild(buttonText);
        return button;
    }
// Collect input info, form a person object with
// dummy id of -1 and post to server
// Wait for response from server and add it to people map
// Then display the people list page

    
    
    addPersonHandler(evt)
    {
        let person = {id: -1};
        person.name = document.getElementById("name").value;
        person.age = document.getElementById("age").value;
        
        postPerson(person);
    }
// Just returns to page with the list of people
    cancelAddPersonHandler(evt)
    {
        var peopleListPage = new PeopleListPage(peopleMap);
        var container = document.getElementById("container");
        peopleListPage.makeAndSetView(container);
    }
    
}

class EditPersonPage
{
    constructor(personId)
    {
        this.personId = Number.parseInt(personId);
    }
    makeAndSetView(container)
    {
        while (container.hasChildNodes())
        {
            container.removeChild(container.lastChild);
        }
        
        let prompt = document.createTextNode("Edit information for this person");
        
        let table = document.createElement("table");
        let tBody = document.createElement("tbody");
        
        let nameRow = document.createElement("tr");
        
        let nameTextCol = document.createElement("td");
        let nameText = document.createTextNode("Name");
        nameTextCol.appendChild(nameText);
        
        let nameInputCol = document.createElement("td");
        let nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("id", "name");
        nameInput.setAttribute("value", peopleMap.get(this.personId).name);
        nameInputCol.appendChild(nameInput);
        
        
        nameRow.appendChild(nameTextCol);
        nameRow.appendChild(nameInputCol);
        
        let ageRow = document.createElement("tr");
        let ageTextCol = document.createElement("td");
        let ageText = document.createTextNode("Age");
        ageTextCol.appendChild(ageText);
        
        let ageInputCol = document.createElement("td");
        let ageInput = document.createElement("input");
        ageInput.setAttribute("type", "text");
        ageInput.setAttribute("id", "age");
        ageInput.setAttribute("value", peopleMap.get(this.personId).age);
        ageInputCol.appendChild(ageInput);
        
        ageRow.appendChild(ageTextCol);
        ageRow.appendChild(ageInputCol);
        
        let buttonRow = document.createElement("tr");
        let editButtonCol = document.createElement("td"); 
        let editButton = this.makeButton("Edit", this.editPersonHandler, this.personId);
        editButtonCol.appendChild(editButton);
        let cancelButtonCol = document.createElement("td");
        let cancelButton = this.makeButton("Cancel", this.cancelEditPersonHandler);
        cancelButtonCol.appendChild(cancelButton);
        buttonRow.appendChild(editButtonCol);
        buttonRow.appendChild(cancelButtonCol);
        
        tBody.appendChild(nameRow);
        tBody.appendChild(ageRow);
        tBody.appendChild(buttonRow);
        table.appendChild(tBody);
        
        container.appendChild(prompt);
        container.appendChild(table);
    }
    makeButton(caption, handler, personId)
    {
        var button = document.createElement("button");
        button.innerHTML = caption;
        button.onclick = handler;
        button.dataset.id = personId;
        return button;
    }
// Collect input info, form a person object with
// for this id and end put request to the server
// Wait for response from server and add it to people map
// Then display the people list page
    editPersonHandler(evt)
    {
        let personId = Number.parseInt(evt.target.dataset.id);
        let person = {id: personId};
        person.name = document.getElementById("name").value;
        person.age = document.getElementById("age").value;
        
        putPerson(person);

    }
    cancelEditPersonHandler(evt)
    {
        var peopleListPage = new PeopleListPage(peopleMap);
        var container = document.getElementById("container");
        peopleListPage.makeAndSetView(container);
    }
    
}

class DeletePersonPage
{
    constructor(personId)
    {
        this.personId = Number.parseInt(personId);
    }
    makeAndSetView(container)
    {
        while (container.hasChildNodes())
        {
            container.removeChild(container.lastChild);
        }
        
        let prompt = document.createTextNode("Confirm delete of this person");
        
        let table = document.createElement("table");
        let tBody = document.createElement("tbody");
        
        let nameRow = document.createElement("tr");
        
        let nameTextCol = document.createElement("td");
        let nameText = document.createTextNode("Name");
        nameTextCol.appendChild(nameText);
        
        let nameInputCol = document.createElement("td");
        let nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("id", "name");
        nameInput.setAttribute("value", peopleMap.get(this.personId).name);
        nameInput.readOnly  = true;
        nameInputCol.appendChild(nameInput);
        
        
        nameRow.appendChild(nameTextCol);
        nameRow.appendChild(nameInputCol);
        
        let ageRow = document.createElement("tr");
        let ageTextCol = document.createElement("td");
        let ageText = document.createTextNode("Age");
        ageTextCol.appendChild(ageText);
        
        let ageInputCol = document.createElement("td");
        let ageInput = document.createElement("input");
        ageInput.setAttribute("type", "text");
        ageInput.setAttribute("id", "age");
        ageInput.setAttribute("value", peopleMap.get(this.personId).age);
        ageInput.readOnly  = true;
        ageInputCol.appendChild(ageInput);
        
        ageRow.appendChild(ageTextCol);
        ageRow.appendChild(ageInputCol);
        
        let buttonRow = document.createElement("tr");
        let deleteButtonCol = document.createElement("td"); 
        let deleteButton = this.makeButton("Delete", this.deletePersonHandler, this.personId);
        deleteButtonCol.appendChild(deleteButton);
        let cancelButtonCol = document.createElement("td");
        let cancelButton = this.makeButton("Cancel", this.cancelDeletePersonHandler);
        cancelButtonCol.appendChild(cancelButton);
        buttonRow.appendChild(deleteButtonCol);
        buttonRow.appendChild(cancelButtonCol);
        
        tBody.appendChild(nameRow);
        tBody.appendChild(ageRow);
        tBody.appendChild(buttonRow);
        table.appendChild(tBody);
        
        container.appendChild(prompt);
        container.appendChild(table);
    }
    makeButton(caption, handler, personId)
    {
        var button = document.createElement("button");
        button.innerHTML = caption;
        button.onclick = handler;
        button.dataset.id = personId;
        return button;
    }
// Collect input info, form a person object with
// for this id and end put request to the server
// Wait for response from server and add it to people map
// Then display the people list page
    deletePersonHandler(evt)
    {
        let personId = Number.parseInt(evt.target.dataset.id);
        deletePerson(personId)
    }
    cancelDeletePersonHandler(evt)
    {
        var peopleListPage = new PeopleListPage(peopleMap);
        var container = document.getElementById("container");
        peopleListPage.makeAndSetView(container);
    }
}

window.onload = function () {
    let xhr = new XMLHttpRequest();
    //xhr.responseType = "json";
    xhr.open("GET", "/PeopleSPA/RestFulPeopleServlet");
    xhr.onreadystatechange = function () {
        let personArray = JSON.parse(xhr.responseText);
        for(var p of personArray)
        {
            peopleMap.set(p.id, p);
        }
        let personView = new PeopleListPage(peopleMap);
        personView.makeAndSetView(document.getElementById("container"));
    };
    xhr.send();

};

