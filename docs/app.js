'use strict';
//geting the label properties using id in service.html
var lblCollapseSupplies = document.getElementById("idCollapseSupplies");
var lblCollapseKits = document.getElementById("idcollapseKits");
var lblCollapseGrinders = document.getElementById("idcollapseGrinders");

//Reset button
const resetBtn = document.getElementById('btnReset');
//Submit button
const submitBtn = document.getElementById('btnSubmit');
//Contact page 
const divOverlay = document.getElementById('idOverlay');
const divConfirmPopup = document.getElementById('confirmPopup');
//input fields in a form
const txtFirstName = document.getElementById("fname");
const txtLastName = document.getElementById("lname");
const txtContactNumber = document.getElementById("number");
const txtEmail = document.getElementById("email");
const drpSelect = document.getElementById("chooseItem");
const txtDescription = document.getElementById("description");
const lblError = document.getElementById("lblError");
//get the newssection
var newsSection = document.getElementById("idContainerNews");
//Adding a click event listener after the document has loaded
document.addEventListener("readystatechange", function () {
    if (document.readyState === "interactive") {
        addClickListener();
    }
});
function addClickListener() {

    //initialise the events in home.html
    if (location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === "home.html") {
        //Add popup on landing page.
        window.onload = function () {
            var popup = document.getElementById("idPopupPromo");
            var overlay = document.getElementById("idOverlayHome");
            var dismissButton = document.getElementById("idPopupDismiss");

            dismissButton.onclick = function () {
                overlay.style.display = "none";
                popup.style.display = "none";
            }

            overlay.style.display = "block";
            popup.style.display = "block";
        }
        //Increasing the height and width of images on the home page and adding an on-focus effect.    
        const singleBoxes = document.querySelectorAll('.single-box');
        singleBoxes.forEach(singleBox => {
            const aElement = singleBox.querySelector('a');
            const imgElement = singleBox.querySelector('a img');

            aElement.addEventListener('mouseenter', () => {
                imgElement.style.transform = 'rotate(5deg) scale(1.4)';
            });

            aElement.addEventListener('mouseleave', () => {
                imgElement.style.transform = 'none';
            });
        });
    }
    //initialise the events in services.html
    else if (location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === "ourservices.html") {
        lblCollapseSupplies.addEventListener("mouseenter", mouseEnter);
        lblCollapseSupplies.addEventListener("mouseleave", mouseLeave);

        lblCollapseKits.addEventListener("mouseenter", mouseEnter);
        lblCollapseKits.addEventListener("mouseleave", mouseLeave);

        lblCollapseGrinders.addEventListener("mouseenter", mouseEnter);
        lblCollapseGrinders.addEventListener("mouseleave", mouseLeave);
    }
    //initialise the events in contactus.html
    else if (location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === "contactus.html") {
        //Adding event handler to the buttons
        resetBtn.addEventListener("click", showConfirmPopup);
        submitBtn.addEventListener("click", validateInputfield);
    }
    else if (location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === "news.html") {
        // Add event handler in add news button
        var btnAddNews = document.getElementById("btnAddNews");
        btnAddNews.addEventListener("click", showPrompt, true);

        var btnNewsSubmit = document.getElementById("btnNewsSubmit");
        btnNewsSubmit.addEventListener("click", addNews);
    }
}

// get value from local storage
var pItem = localStorage.getItem("pItem");
var newsItem = CreatePtag(pItem);
if (newsSection != null) {
    newsSection.appendChild(newsItem);
}
// show reset button popup 
function showConfirmPopup(e) {
    e.preventDefault();
    divOverlay.style.display = 'block';
    divConfirmPopup.style.display = 'block';
}
// show hide button popup 
function hideConfirmPopup() {
    divOverlay.style.display = 'none';
    divConfirmPopup.style.display = 'none';
}
// reset confirm button click 
function handleConfirm() {
    hideConfirmPopup();
    document.getElementById('frmContact').reset();
    lblError.innerHTML = "";
}
// reset cancel button click  
function hideConfirmation(event) {
    event.preventDefault();
    hideConfirmPopup();
}

/// validation on contact form
//validate the name
function validateNameRegex(name) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name.value)) {
        name.classList.add("error");
    } else {
        name.classList.remove("error");
    }
}

//validate the contact number format
function validateContactRegex() {
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(txtContactNumber.value)) {
        txtContactNumber.classList.add("error");
    } else {
        txtContactNumber.classList.remove("error");
    }
}

//validate the email format
function validateEmailRegex() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(txtEmail.value)) {
        txtEmail.classList.add("error");
    } else {
        txtEmail.classList.remove("error");
    }
}

// Validate the message field
function validateMessage() {
    if (txtDescription.value === "") {
        txtDescription.classList.add("error");
    } else {
        txtDescription.classList.remove("error");
    }
}

// Validate the dropdown field
function validateSelection() {
    if (drpSelect.value === "Selected") {
        drpSelect.classList.add("error");
    } else {
        drpSelect.classList.remove("error");
    }
}

// Prevent form submission if any fields have errors
function validateInputfield(e) {
    validateNameRegex(txtFirstName);
    validateNameRegex(txtLastName);
    validateSelection();
    validateMessage();
    validateContactRegex();
    validateEmailRegex();
    if (txtFirstName.value === "") {
        lblError.innerHTML = "Please enter first name"
        e.preventDefault();
    }
    else if (txtLastName.value === "") {
        lblError.innerHTML = "Please enter last name"
        e.preventDefault();
    }
    else if (txtContactNumber.value === "") {
        lblError.innerHTML = "Please enter contact number"
        e.preventDefault();
    }
    else if (txtEmail.value === "") {
        lblError.innerHTML = "Please enter email"
        e.preventDefault();
    }
    else if (txtFirstName.classList.contains("error")) {
        lblError.innerHTML = "Please use alphabets in first name"
        e.preventDefault();
    }
    else if (txtLastName.classList.contains("error")) {
        lblError.innerHTML = "Please use alphabets in last name"
        e.preventDefault();
    }
    else if (txtContactNumber.classList.contains("error")) {
        lblError.innerHTML = "Please correct your contact number"
        e.preventDefault();
    }
    else if (txtEmail.classList.contains("error")) {
        lblError.innerHTML = "Please format your email"
        e.preventDefault();
    }
    else if (drpSelect.classList.contains("error")) {
        lblError.innerHTML = "Please select a value from services"
        e.preventDefault();
    }
    else if (txtDescription.classList.contains("error")) {
        lblError.innerHTML = "Please enter description"
        e.preventDefault();
    }
    //Add style through javascript
    lblError.style.color = "red";
}
//trigers mouse event on mouse enter and leave
function mouseEnter(e) {
    this.title = "click me";
    this.style.backgroundColor = "#679567";

}
function mouseLeave() {
    this.style.backgroundColor = "#516851";
};

//show the prompt div for adding news
function showPrompt(value) {
    const divPrompt = document.querySelector('.prompt');
    const divOverlay = document.querySelector('.overlay');
    if (value) {
        divOverlay.style.display = 'block';
        divPrompt.style.display = 'block';
    }
    else {
        divOverlay.style.display = 'none';
        divPrompt.style.display = 'none';
    }
}

// add dynamic news to the news page.
function addNews() {
    var newsContent = document.getElementById("txtNews");
    // Check newsContent is empty
    if (newsContent.value != "") {
        // Create a new HTML element to display the news
        var newsItem = CreatePtag(newsContent.value);

        // Create a new date object
        var currentDate = new Date();

        // Array of month names
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        // Format the date as "day Month year"
        var formattedDate = currentDate.getDate() + " " + monthNames[currentDate.getMonth()] + " " + currentDate.getFullYear();

        // Create a new <i> element
        var dateElement = document.createElement("i");

        // Set the inner text of the <i> element to the formatted date
        dateElement.innerText = " (" + formattedDate + ").";

        // Append the <i> element to the newsItem
        newsItem.appendChild(dateElement);
        // Append the new news item to the news section      
        newsSection.appendChild(newsItem);
        // Set the local storge with the p tag content
        localStorage.setItem("pItem", newsItem.innerHTML)
        showPrompt(false);
    }
}

//global method for creating p tag
function CreatePtag(newsContent) {
    var newsItem = document.createElement("p");
    newsItem.innerHTML = newsContent;
    newsItem.classList.add("newsTransform");
    return newsItem;
}
