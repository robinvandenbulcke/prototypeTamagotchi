"use strict";
const dierenArr = [];

class Dieren {
    #gewicht;
    #naam;
    hongerNiveau = 100;
    static #aantalDieren = 0;
    constructor(gewicht, naam, hongerniveau) {
        this.#gewicht = gewicht;
        this.#naam = naam;
        Dieren.#aantalDieren++;
    };
    getGewicht() {
        return this.#gewicht;
    };
    getNaam() {
        return this.#naam;
    };
    getHongerNiveau() {
        return this.hongerNiveau;
    };
    static getAantalDieren() {
        return Dieren.#aantalDieren;
    };
};

class Hond extends Dieren {
    #dogTag = "Hond";
    constructor(gewicht, naam, hongerniveau) {
        super(gewicht, naam, hongerniveau);
    };
    getGeluid() {
        return "woef";
    };
    getTag() {
        return this.#dogTag;
    };
};

class Kat extends Dieren {
    #catTag = "Kat";
    constructor(gewicht, naam, hongerniveau) {
        super(gewicht, naam, hongerniveau);
    };
    getGeluid() {
        return "miauw";
    };
    getTag() {
        return this.#catTag;
    };
};

class Konijn extends Dieren {
    #bunnyTag = "Konijn"
    constructor(gewicht, naam, hongerniveau) {
        super(gewicht, naam, hongerniveau);
    };
    getGeluid() {
        return "ia ia";
    };
    getTag() {
        return this.#bunnyTag;
    };
};

function maakDier(dierNaam, dierClass) {
    //De 3 volgende blokken zijn herhaalde code, met deze functie zou ik ze willen inkorten
    //maar ik weet niet direct hoe
};

document.getElementById("addRabbit").onclick = function () {
    let inputName = document.getElementById('nameTag').value;
    let inputWeight = document.getElementById('weight').value;
    const konijn = new Konijn(inputWeight, inputName);
    dierenArr.push(konijn);
    updateKennel(konijn);
    updateTotaalAantalDieren();
    clearTextFields()
};

document.getElementById("addDog").onclick = function () {
    let inputName = document.getElementById('nameTag').value;
    let inputWeight = document.getElementById('weight').value;
    const hond = new Hond(inputWeight, inputName);
    dierenArr.push(hond);
    updateKennel(hond);
    updateTotaalAantalDieren();
    clearTextFields()
};

document.getElementById("addCat").onclick = function () {
    let inputName = document.getElementById('nameTag').value;
    let inputWeight = document.getElementById('weight').value;
    const kat = new Kat(inputWeight, inputName);
    dierenArr.push(kat);
    updateKennel(kat);
    updateTotaalAantalDieren();
    clearTextFields()
};

function updateKennel(dier) {
    const foodTray = document.createElement("img");
    foodTray.id = "foodTray";
    foodTray.src = `images/foodTray.png`;
    const dogPa = document.createElement("img");
    dogPa.id = "dogPa";
    dogPa.src = `images/dog.png`;
    const catPa = document.createElement("img");
    catPa.id = "catPa";
    catPa.src = `images/cat.png`;
    const bunPa = document.createElement("img");
    bunPa.id = "bunPa";
    bunPa.src = `images/bunny.png`;
    foodTray.style.height = '50px';
    dogPa.style.height = '50px';
    catPa.style.height = '50px';
    bunPa.style.height = '50px';
    const tbody = document.querySelector("tbody");
    const row = tbody.insertRow();

    if (dier.getTag() === "Kat") {
        row.insertCell().appendChild(catPa);
    } else if (dier.getTag() === "Hond") {
        row.insertCell().appendChild(dogPa);
    } else {
        row.insertCell().appendChild(bunPa);
    };

    row.insertCell().innerText = dier.getNaam();
    row.insertCell().innerText = dier.getHongerNiveau();
    row.insertCell().innerText = dier.getGewicht();
    row.insertCell().innerText = dier.getGeluid();
    row.insertCell().appendChild(foodTray);

    foodTray.onclick = function () {
        updateHonger(row);
    };
};

function updateHonger(row) {
    const tbody = document.getElementById("tbody");
    let hunger = Number(row.querySelector('td:nth-child(3)').innerText);
    let weight = Number(row.querySelector('td:nth-child(4)').innerText);
    let kindOfAnimal = row.querySelector('td:nth-child(1)').innerHTML;
    switch (kindOfAnimal) {
        case '<img id="catPa" src="images/cat.png" style="height: 50px;">':
            if (hunger > 0) {
                hunger += 15;
                weight += 0.03;
            }
            else {
                hunger = 0;
            };
            break;
        case '<img id="dogPa" src="images/dog.png" style="height: 50px;">':
            if (hunger > 0) {
                hunger += 5;
                weight += 0.02;
            }
            else {
                hunger = 0;
            };
            break;
        case '<img id="bunPa" src="images/bunny.png" style="height: 50px;">':
            if (hunger > 0) {
                hunger += 25;
                weight += 0.06;
            }
            else {
                hunger = 0;
            };
            break;
        default:
            if (hunger > 0) {
                hunger += 20;
                weight += 0.20;
            }
            else {
                hunger = 0;
            };
    };
    row.querySelector('td:nth-child(3)').innerText = hunger;
    row.querySelector('td:nth-child(4)').innerText = weight.toFixed(2);
};

function updateTotaalAantalDieren() {
    let totaalDieren = document.getElementById('totaalAantalDieren');
    totaalDieren.innerText = Dieren.getAantalDieren();
};

document.getElementById("timeBoost").onclick = function () {
    let deathCount = 0;
    const tbody = document.getElementById("tbody");
    const animalRows = tbody.querySelectorAll("tr");
    for (const row of animalRows) {
        let hunger = Number(row.querySelector('td:nth-child(3)').innerText);
        let weight = Number(row.querySelector('td:nth-child(4)').innerText);
        let kindOfAnimal = row.querySelector('td:nth-child(1)').innerHTML;
        switch (kindOfAnimal) {
            case '<img id="catPa" src="images/cat.png" style="height: 50px;">':
                hunger = hunger - 43;
                weight -= 0.02;
                break;
            case '<img id="dogPa" src="images/dog.png" style="height: 50px;">':
                hunger = hunger - 23;
                weight -= 0.01;
                break;
            case '<img id="bunPa" src="images/bunny.png" style="height: 50px;">':
                hunger = hunger - 55;
                weight -= 0.03;
                break;
            default:
                hunger = hunger - 33;
                weight -= 0.01;
        };
        row.querySelector('td:nth-child(3)').innerText = hunger;
        row.querySelector('td:nth-child(4)').innerText = weight.toFixed(2);
        if (hunger <= 0) {
            hunger = 0;
            row.querySelector('td').style.backgroundColor = 'red';
            row.querySelector('td:nth-child(3)').innerText = hunger;
            deathCount++;
            document.getElementById('deathToll').innerText = deathCount;
        };
    };
};

function clearTextFields() {
    document.getElementById('nameTag').value = "";
    document.getElementById('weight').value = "";
};