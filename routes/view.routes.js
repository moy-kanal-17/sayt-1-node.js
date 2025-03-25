const { createViewPage } = require("../helpers/create.view.page");

const router = require("express").Router();


router.get("/",(req,res)=>{
    res.render(createViewPage("index"),{
        title:"Asosiy sahifa",
        mainPage:true,
    })
})

router.get("/words", (req, res) => {
  res.render(createViewPage("words"), {
    title: "Words",
    wordPage: true,
  });
});

router.get("/language", (req, res) => {
  res.render(createViewPage("language"), {
    title: "Language page",
    languagePage: true,
  });
});

router.get("/user", (req, res) => {
  res.render(createViewPage("user"), {
    title: "User page",
    userPage: true,
  });
});

router.get("/login", (req, res) => {
  res.render(createViewPage("login"), {
    title: "Login page",
    loginPage: true,
  });
});


router.get("/addUser", (req, res) => {
  res.render(createViewPage("addUser"), {
    title: "Add user page",
    loginPage: true,
  });
});


module.exports =router