


const myImage = document.querySelector("img");
let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");
myHeading.textContent = "Welcome to the site";

function setUserName() {
    const myName = prompt("Please enter your name.");
    localStorage.setItem("name", myName);
    if (myName === null||myName.trim() === "") {
        myHeading.textContent = `Welcome to the site!`;
    }
    else {
        myHeading.textContent = `Welcome to the site, ${myName}`;
    }

}

if (!localStorage.getItem("name")) {
    setUserName();
} else {
    const storedName = localStorage.getItem("name");
    // myHeading.textContent = `Welcome to the site, ${storedName}`;
}
myButton.addEventListener("click", () => {
    setUserName();
});

myImage.addEventListener("click", () => {
    const mySrc = myImage.getAttribute("src");
    if (mySrc === "images/Ave_Mujica.png") {
        myImage.setAttribute("src", "images/MyGO.png");
    } else {
        myImage.setAttribute("src", "images/Ave_Mujica.png");
    }
});