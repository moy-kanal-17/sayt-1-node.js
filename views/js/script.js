const { response } = require("express");
const { func } = require("joi");
const { refreshKey } = require("../../services/jwt.service");

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const form = document.getElementById("loginform");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// uygi vazifa uchun

async function getAllUsers() {
  let accessToken = localStorage.getItem("accessToken");
  console.log("accessToken:", accessToken);
  const accessTokenExpTime = getTokenExpiration(accessToken);
  console.log("accessTokenExpTime", accessTokenExpTime);

  const currentTime = new Date();
  if (currentTime < accessTokenExpTime) {
    console.log("accessToken faol");
  } else {
    console.log("accessToken vaqti chiqib ketgan");
    accessToken = await refreshToken();
    console.log("New accessToken", accessToken);
  }

  fetch("http://localhost:3002/api/users/all", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    mode: "cors", //buni keyin o'rgataman
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Request failed");
      }
    })
    .then((data) => {
      console.log("API dan kelgan data:", data);

      const users = data.users;

      if (Array.isArray(users)) {
        printUsers(users);
      } else {
        console.log("Xatolik: Foydalanuvchilar massivi kelmadi.");
      }
    })

    .catch((error) => {
      console.log("error:", error);
    });
}

//chiqarish userlarni

function printUsers(user) {
  const wordsContainer = document.getElementById("user-list");
  user.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.textContent = `👤 User ismi: ${user.username} | 📧 Email: ${user.email}`;
    wordsContainer.appendChild(listItem);
  });
}





//-------------Language----------------------------------getAllLanguage


async function getAllLanguage() {
  let accessToken = localStorage.getItem("accessToken");
  console.log("accessToken:", accessToken);
  const accessTokenExpTime = getTokenExpiration(accessToken);
  console.log("accessTokenExpTime", accessTokenExpTime);

  const currentTime = new Date();
  if (currentTime < accessTokenExpTime) {
    console.log("accessToken faol");
  } else {
    console.log("accessToken vaqti chiqib ketgan");
    accessToken = await refreshToken();
    console.log("New accessToken", accessToken);
  }

  fetch("http://localhost:3002/api/languages/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    mode: "cors", //buni keyin o'rgataman
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Request failed");
      }
    })
    .then((data) => {
      console.log("API dan kelgan data:", data);
      console.log(data.languages);

      const language = data.languages;

      if (Array.isArray(language)) {
        printLanguages(language);

      } else {
        console.log("Xatolik: Launguages massivi kelmadi.");
      }
    })

    .catch((error) => {
      console.log("error:", error);
    });
}



//---------printLanguages

function printLanguages(language) {
  const wordsContainer = document.getElementById("language-list");
  language.forEach((language) => {
    const listItem = document.createElement("li");
    listItem.textContent = ` 🌎Til nomi: ${language.language_name} | 👨‍💻 Til codi: ${language.language_code}`;
    wordsContainer.appendChild(listItem);
  });
}







//------------------------------------------add user--------------------





async function addUser() {
  let accessToken = localStorage.getItem("accessToken");
  const accessTokenExpTime = getTokenExpiration(accessToken);
  const currentTime = new Date();

  if (currentTime >= accessTokenExpTime) {
    accessToken = await refreshToken();
  }

  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;
    const role = document.getElementById("role").value;
    const is_active = document.getElementById("is_active").checked;
    const phone = document.getElementById("phone").value;
    console.log("Username👨‍💻 :",req.body);
    

    if (password !== confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("api/users/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          first_name,
          last_name,
          email,
          password,
          role,
          is_active,
          phone
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("User added successfully!");
        form.reset();
      } else {
        alert("Failed to add user: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the user");
    }
  });
}















//--------------------------------------------------------------
async function getAllWords() {
  let accessToken = localStorage.getItem("accessToken");
  console.log("accessToken:", accessToken);
  const accessTokenExpTime = getTokenExpiration(accessToken);
  console.log("accessTokenExpTime", accessTokenExpTime);

  const currentTime = new Date();
  if (currentTime < accessTokenExpTime) {
    console.log("accessToken faol");
  } else {
    console.log("accessToken vaqti chiqib ketgan");
    accessToken = await refreshToken();
    console.log("New accessToken", accessToken);
  }

  fetch("http://localhost:3002/api/words/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    mode: "cors", //buni keyin o'rgataman
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Request failed");
      }
    })
    .then((words) => {
      console.log(words.words);
      printWords(words.words);
    })
    .catch((error) => {
      console.log("error:", error);
    });
}

function printWords(words) {
  const wordsContainer = document.getElementById("words-list");
  words.forEach((word) => {
    const listItem = document.createElement("li");
    listItem.textContent = word.word;
    wordsContainer.appendChild(listItem);
  });
}

function getTokenExpiration(token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  if (decodedToken.exp) {
    return new Date(decodedToken.exp * 1000);
  }
  return null;
}

async function refreshToken() {
  try {
    const response = await fetch("http://localhost:3002/api/users/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.error && data.error == "jwt expired") {
      console.log("Refresh tokenni ham vaqti chiqib ketgan");
      return window.location.replace("/login");
    }
    console.log("Tokenlar yangilandi");
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.log(error);
  }
}
