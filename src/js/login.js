/**
Author: Steven Short @SparrowDetail
Date: 10/28/2024
Description: Login page styles
**/
const invalidClassName = "invalid";
const simulatedValidUserIds = [
    "A10325442",
    "A12345678",
    "A51238632"
];
const simulatedValidUser = [
    {
        fname: "Steve",
        lname: "Short",
        id: "A10325442",
        username: "sparrow",
        password: "cool123"
    }
];

window.onload = () => {
    loadLogin();
};

/**Loads the administrator login form for submission */
const loadLogin = () => {
    const mainContent = document.querySelector("main");
    mainContent.innerHTML = loginHTML;

    const form = document.getElementById("login-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        console.log(validateLoginForm());

        if (validateLoginForm()) {
            window.sessionStorage.setItem("admin", "login");
            history.back();
        }
    });
};

/**Loads the administrator registration form for submission.
 * Provides core functionality and input validation.
*/
const loadRegistration = () => {
    const mainContent = document.querySelector("main");
    mainContent.innerHTML = registerHTML;

    const form = document.getElementById("register-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        if (validateRegistrationForm()) {
            form.submit();
        }
    });
};

/**Validates the login form contained in the loginHTML layout variable. If the
 * form is invalid, an error dialog will be displayed and a value of false is returned.
 * 
 * @returns true if the form is valid and false if the form is invalid
 */
const validateLoginForm = () => {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameEntry = usernameInput.value;
    const passwordEntry = passwordInput.value;
    let userID = "";

    usernameInput.classList.remove(invalidClassName);
    passwordInput.classList.remove(invalidClassName);

    simulatedValidUser.forEach((user) => {
        if (user.username == usernameEntry && user.password === passwordEntry) {
            userID = user.id;
            return;
        }
    });

    if(userID) {
        return true;
    } 

    inputErrorMsg("Your username or password is incorrect");
    usernameInput.classList.add(invalidClassName);
    passwordInput.classList.add(invalidClassName);
    return false;
};

/**Validates the registration form contained in the registerHTML layout variable. If the
 * form is invalid, an error dialog will be displayed and a value of false is returned.
 * 
 * @returns true if the form is valid and false if the form is invalid
 */
const validateRegistrationForm = () => {
    const userID = document.getElementById("user-id");
    const username = document.getElementById("username");
    
    if (!simulatedValidUserIds.includes(userID.value)) {
        inputErrorMsg("Employee ID not found");
        userID.classList.add(invalidClassName);
        return false;
    } else {
        userID.classList.remove(invalidClassName);
    }

    if (!usernameValidation(username.value)) {
        inputErrorMsg("Username cannot contain special characters");
        username.classList.add(invalidClassName);
        return false;
    } else {
        username.classList.remove(invalidClassName);
    }

    return true;
};

/**Validates a passed string based on username restrictions: may not contain special characters.
 * 
 * @param {username} string - string containing the username being validated
 * @returns true if the username is valid and false if it is invalid
*/
const usernameValidation = (username) => {
    const regex = /[^A-Z1-9]/i;
    return !username.match(regex);
};

/**Syncs to Dialog Box used for input validation to display a passed error message.
 * 
 * @param {string} string - string to display as the dialog message.
 * @requires dialog must appear in document
 */
const inputErrorMsg = (string) => {
    const dialogBox = document.getElementById("improper-input-dialog");
    const dialogText = document.getElementById("invalid-input-dialog-text");
    const dialogCloseBtn = document.getElementById("close-dialog-button");

    dialogText.textContent = string;
    dialogBox.showModal();

    dialogCloseBtn.addEventListener("click", () => {
        dialogBox.close();
        dialogText.textContent="";
    });
};

/**Login page HTML */
const loginHTML = `
    <form id="login-form" action="" method="post">
        <strong class="form-heading">Administrator Login</strong>
        <label for="username">
            Username: 
            <input id="username" type="text" name="usr" required>
        </label>
        <label for="password">
            Password: 
            <input id="password" type="password" name="psw" required>
        </label>
        <div class="submission-buttons">
            <input type="submit" value="Login">
            <input type="button" value="Register" onclick="loadRegistration()">
        </div>
    </form>`;

/**Registration page HTML */
const registerHTML = `
    <form id="register-form" action="register.php" method="post">
        <strong class="form-heading">Administrator Registration Form</strong>
        <label for="first-name">
            First Name: 
            <input id="first-name" type="text" name="fnm" required>
        </label>
        <label for="last-name">
            Last Name: 
            <input id="last-name" type="text" name="lnm" required>
        </label>
        <label for="user-id">
            User ID: 
            <input id="user-id" type="text" name="usrno" required>
        </label>
        <label for="username">
            Username: 
            <input id="username" type="text" name="usr" required>
        </label>
        <label for="password">
            Password: 
            <input id="password" type="password" name="psw" required>
        </label>
        <div class="submission-buttons">
            <input type="submit" value="Register">
            <input type="button" value="Cancel" onclick="loadLogin()">
        </div>
    </form>`;