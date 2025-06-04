


const myImage = document.querySelector("img");
let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");
myHeading.textContent = "Welcome to the site";

function setUserName() {
    const myName = prompt("Please enter your name.");
    localStorage.setItem("name", myName);
    if (myName === null || myName.trim() === "") {
        myHeading.textContent = `Welcome to the site!`;
    }
    else {
        myHeading.textContent = `Welcome to the site, ${myName}`;
    }

}
function SwitchImage(image, src1, src2) {
    image.addEventListener("click", () => {
        const mySrc = image.getAttribute("src");
        if (mySrc === src1) {
            image.setAttribute("src", src2);
        } else {
            image.setAttribute("src", src1);
        }
    });
}

if (!localStorage.getItem("name")) {
    setUserName();
} else {
    const storedName = localStorage.getItem("name");
    // myHeading.textContent = `Welcome to the site, ${storedName}`;
}
/*
myButton.addEventListener("click", () => {
    setUserName();
});*/
image1 = document.getElementById("Ave Mujica");
image2 = document.getElementById("MyGO");
SwitchImage(image1, "images/Ave_Mujica.png", "images/MyGO.png");
SwitchImage(image2, "images/MyGO.png", "images/Ave_Mujica.png");
/*
myImage.addEventListener("click", () => {
    const mySrc = myImage.getAttribute("src");
    if (mySrc === "images/Ave_Mujica.png") {
        myImage.setAttribute("src", "images/MyGO.png");
    } else {
        myImage.setAttribute("src", "images/Ave_Mujica.png");
    }
});*/