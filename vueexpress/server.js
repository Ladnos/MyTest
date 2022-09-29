import express from "express";
import { fileURLToPath } from "url";
import fs from "fs";
import cookieParser from "cookie-parser";
import { dirname } from "path";
import { secret } from "./js/config.js";
import mysql from "mysql";
import jwt from "jsonwebtoken";
const app = express();
const generateAccessToken = (log, pass) => {
  const payload = {
    log,
    pass,
  };
  return jwt.sign(payload, secret);
};
const sending = JSON.parse(
  fs.readFileSync("D:/openserver/domains/vueexpress/json/tests.json")
);
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "admin",
  password: "XVP-hJj-RSJ-YU7",
  database: "admin",
});
let data;
// app.use(router)
app.use(express.json({ limit: "5000mb" }));
app.use(cookieParser())
app.use(express.text());
app.use(
  express.urlencoded({
    limit: "5000mb",
    extended: true,
    parameterLimit: 50000000000,
  })
);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(dirname('html/index.html'))
app.use(express.static(dirname('html/index.html')))
app.use(express.static(dirname('js/auth.js')))
app.use(express.static(dirname('html/index.html')))

// app.use(bodyParser.json({limit: '50000mb'}));
// app.use(bodyParser.urlencoded({ extended: true, limit: '5000mb' }));
app.use(express.static(__dirname));
app.get("/index", (req, res) => {
  try {
  } catch (eroor) {
    
  }
  res.sendFile(__dirname + '/html/index.html');
});
app.post("/submit", (req, res) => {
  let tesst = true;
  const file = fs.readFileSync("./json/tests.json");
  let result = JSON.parse(file);
  console.log(req.body.test.name);
  for (let item of result.tests) {
    if (item.name == req.body.test.name) {
      console.log(item, req.body.name, "привет");
      tesst = false;
      res.send(tesst);
    }
  }
  if (tesst) {
    res.send(tesst);
  }
  result.tests.push(req.body);
  tesst
    ? fs.writeFileSync("./json/tests.json", JSON.stringify(result), null, 4)
    : "";
});
app.post("/click", (req, res) => {
  data = req.body;
  res.sendStatus(201);
  //res.redirect('/redirect') не работает
});
app.get("/redirect", (req, res) => {
  res.sendFile(__dirname + "/redirect.html");
});
app.get("/getdata", (req, res) => {
  console.log(data);
  res.send(data);
});

app.get("/tests", (req, res) => {
  res.json(sending.tests);
});



app.get("/tests/:slug", (req, res) => {
  const { slug } = req.params // { slug: 'geography' }
})

app.get("/profile", (req, res) => {
  res.sendFile(__dirname + "/profile.html");
});

app.post("/auth", (req, res) => {
  pool.getConnection((err, connection) => {
    pool.query("SELECT * FROM users WHERE login = ?",req.body.login,(err, rows) => {
        if (!err) {
            if(rows[0]){
                if (rows[0].password == req.body.password) {
                    const token = generateAccessToken(
                      req.body.login,
                      req.body.password
                    );
                    console.log(jwt.verify(token, secret));
                    res.json(token);
                  }
            }
           else {
            res.sendStatus(303);
          }
        }
      }
    );
  });
});
app.get('/auth_cookie',(req,res)=>{
  // console.log(req.cookies)
  try{
    if (req.cookies.jwt){
      let para = jwt.verify(req.cookies.jwt,secret)
      pool.getConnection((err, connection) => {
        pool.query("SELECT * FROM users WHERE login = ?",para.log,(err, rows) => {
            if (!err) {
                if(rows[0]){
                    if (rows[0].password == para.pass) {
                      res.json({logging: para.log})
                    }
                }
               else {
                console.log(err)
              }
            }
          }
        );
      });
    }else{
      res.sendStatus(665)
    }
  }catch(error){
    console.log(error);
  }

})
app.post('/registration',(req,res)=>{
  pool.getConnection((err,connection)=>{

    let query = `INSERT INTO users (login, password, email) VALUES (?, ?, ?);`;
    let login = req.body.login;
    let password = req.body.password;
    let email = req.body.email 
    pool.query("SELECT * FROM users WHERE login = ?",login,(err,rows)=>{
      if(!rows[0]){       
        pool.query(query, [login, password, email],(err,rows)=>{
          if(err) throw err
          console.log("вставлено с айди " + connection.threadId)
          res.sendStatus(200)
        })
      }else{
        res.sendStatus(301)
      }
    })
  })
})

app.listen(8080, () => {
  console.log(__dirname);
});
