const express = require("express");
const app = express();
const fs = require("fs");
let userID = 111;
let trainerID = 111;
let staffID = 111;  
app.use(function (req, res, next) {
    console.log(req.session);
    next();
});

app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "pug"); 

app.use(function(req,res,next){
	console.log(req.method);
	console.log(req.url);
	console.log(req.path);
	console.log(req.get("Content-Type"));
	next();
});

app.get("/", homePage);
app.get("/login", loginPage);
app.get("/createAcc", createAccPage);
app.get("/user", userPage);
app.get("/dash", dashPage);
app.get("/schdule", schdulePage);
app.get("/search", searchPage);
app.get("/maintaince", maintancePage);
app.get("/changeSchdule", changeSchdulePage);
app.get("/pay", payPage);

app.post("/login", login);
app.post("/user", addUser);
app.post("/class", addClass);
app.post("/search", search);

app.put("/username",changeUsername);
app.put("/pass",changePass);
app.put("/goal",changeGoal);
app.put("/health_metrics",changeHealth);
app.put("/join", joinClass);
app.put("/maintaince", maintaince);
app.put("/schdule", schdule);
app.put("/pay", pay);

app.delete("/schdule", removeSchdule);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

async function pay(req, res){
  let id = req.body.id;
  let query = `UPDATE Members SET fee = 0 WHERE user_id = ${id};`;
  let data = await client.query(query);
  res.status(200).send("Fee is charged!");
}

async function payPage(req, res){
  let query = `SELECT user_id, fee, user_name FROM Members;`;
  let data = await client.query(query);
  res.render("./pay", {data: data.rows});
}

async function removeSchdule(req,res){
  let id = req.body.id;
  let query = `DELETE FROM Class WHERE class_id = ${id};`;
  await client.query(query);
  res.status(200).send("Schdule Removed!");
}

async function changeSchdulePage(req,res){
  let query = `SELECT * FROM Schdule;`;
  let data = await client.query(query);
  query = `SELECT class_name, class_id, time FROM Class;`;
  data = await client.query(query);
  query = `
	SELECT room_id, equipment_name
	FROM Equipment e LEFT JOIN Room r ON e.equipment_id = r.equipment_id
	`;
  let room = await client.query(query);
  res.render("./changeSchdule", {data: data.rows, room: room.rows});
}

async function schdule(req, res){
  let time = req.body.time;
  let date = req.body.date;
  let room = req.body.room;
  let name = req.body.name;
  let fee = req.body.fee;
  let id = req.body.id;
  let query = `UPDATE Class SET time = '${time}', date = '${date}', class_room = ${room}, class_fee = ${fee}, class_name = '${name}' WHERE class_id = ${id};`;
  await client.query(query);
  res.status(200).send("Schdule Changed!");
}

async function maintaince(req, res){
  let id = req.body.id;
  let query = `UPDATE Equipment SET broken = true WHERE equipment_id = '${id}';`;
  await client.query(query);
  res.status(200).send("Equipment Fixed!");
}

async function maintancePage(req, res){
  let query = `SELECT * FROM Equipment;`;
  let data = await client.query(query);
  res.render("./maintaince", {data: data.rows});
}

async function search(req, res){
  let name = req.body.name;
  let query = `SELECT user_name, goal, health_metrics FROM Members WHERE user_name = '${name}';`;
  let data = await client.query(query);
  res.status(200).send(data.rows[0]);
}


async function searchPage(req, res){
  let query = `SELECT user_name FROM Members;`;
  let data = await client.query(query);
  res.render("./search", {"user": data.rows});
}

async function addClass(req, res){
  let name = req.body.name;
  let time = req.body.time;
  let fee = req.body.fee;
  let date = req.body.date;
  let room = req.body.room;
  let query = `INSERT INTO Class (class_name, class_fee, date, time, class_trainer, class_room)
                VALUES ('${name}', ${fee}, '${date}', '${time}', '${trainerID}', '${room}');`;
  await client.query(query);
  res.status(200).send("Class Added!");
}
async function login(req, res){
  let user = req.body.user;
  let pass = req.body.pass;
  let query = `SELECT user_id FROM Members WHERE user_name = '${user}' AND password = '${pass}';`;
  let data = await client.query(query);
  console.log(query);
  if(data.rows.length == 0){
    query = `SELECT trainer_id FROM Trainer WHERE trainer_name = '${user}' AND password = '${pass}';`;
    data = await client.query(query);
    if(data.rows.length == 0){
      query = `SELECT staff_id FROM Staff WHERE staff_name = '${user}' AND password = '${pass}';`;
      data = await client.query(query);
      if(data.rows.length == 0){
      res.status(400).send("User not found");
      }else{
        console.log("Staff found");
        staffID = data.rows[0].staff_id;
        console.log("Staff ID: " + staffID + " is log on");
        res.status(200).send("Staff found");
      }
    }else{
      console.log("Trainer found");
      trainerID = data.rows[0].trainer_id;
      console.log("Trainer ID: " + trainerID + " is log on");
      res.status(200).send("Trainer found");
    }
  }else{
    console.log("User found");
    userID = data.rows[0].user_id;
    console.log("User ID: " + userID + " is log on");
    res.status(200).send("User found");
  }
}

async function joinClass(req, res){
  let classID = req.body.id;
  let time = req.body.time;
  let fee = req.body.fee;
  let query = `INSERT INTO Schdule (student_id, class_id, time) VALUES (${userID}, ${classID}, '${time}');`;
  await client.query(query);
  query = `UPDATE Members SET fee = fee + ${fee} WHERE user_id = ${userID};`;
  await client.query(query);
  res.status(200).send("Class joined");
}

async function changeUsername(req, res){
  let user = req.body.username;
  let query = `UPDATE Members SET user_name = '${user}' WHERE user_id = ${userID};`;
  await client.query(query);
  res.status(200).send("Username changed");
}

async function changePass(req, res){
  let pass = req.body.pass;
  let query = `UPDATE Members SET password = '${pass}' WHERE user_id = ${userID};`;
  await client.query(query);
  res.status(200).send("Password changed");
}

async function changeGoal(req, res){
  let goal = req.body.goal;
  let query = `UPDATE Members SET goal = '${goal}' WHERE user_id = ${userID};`;
  await client.query(query);
  res.status(200).send("Goal changed");
}

async function changeHealth(req, res){
  let health_metrics = req.body.health_metrics;
  let query = `UPDATE Members SET health_metrics = '${health_metrics}' WHERE user_id = ${userID};`;
  await client.query(query);
  res.status(200).send("Health metrics changed");
}

async function schdulePage(req, res){
  let query = `
	SELECT room_id, equipment_name
	FROM Equipment e LEFT JOIN Room r ON e.equipment_id = r.equipment_id
	`;
  let room = await client.query(query);
  res.render("./schdule", {room: room.rows});
}


async function dashPage(req, res){
  let query = `SELECT * FROM Members WHERE user_id = ${userID};`;
  let user = await client.query(query);

  query = `SELECT list.trainer_name, list.trainer_specialty, list.class_fee, list.time, list.date, list.class_id
FROM(
	SELECT *
	FROM Trainer t Right JOIN Class c ON t.trainer_id = c.class_trainer
) list
WHERE list.trainer_specialty = '${user.rows[0].goal}'`;
  let data = await client.query(query);

  query = `SELECT *
FROM(
	SELECT *
	FROM Schdule s LEFT JOIN Class c ON s.class_id = c.class_id
) list
WHERE list.student_id = ${userID}`;
  let enroll = await client.query(query);
  res.render("./dashboard", {data: data.rows, enroll: enroll.rows});
}

async function userPage(req, res){
  let query = `SELECT * FROM Members WHERE user_id = ${userID};`;
  let user = await client.query(query);

  query = `SELECT class_name FROM (
	SELECT *
	FROM Schdule s LEFT JOIN Class c ON s.class_id = c.class_id
) list
WHERE student_id = ${userID}`;
  let routine = await client.query(query);
  console.log(routine.rows);
  res.render("./user", {user: user.rows[0].user_name, goal: user.rows[0].goal, health_metrics: user.rows[0].health_metrics, routine: routine.rows});
}

function loginPage(req, res){
    res.render("./login");
}

function homePage(req, res){
    res.render("./Home");
}

function createAccPage(req, res){
    res.render("./createAccount");
}

//add user

async function addUser(req, res){
    let user = req.body.username;
    let pass = req.body.password;
    let goal = req.body.goal;
    let health_metrics = req.body.health_metrics;

    let query = `INSERT INTO Members (user_name,password, goal, health_metrics, fee)
                    VALUES 
                    ('${user}', '${pass}', '${goal}', '${health_metrics}', 0);`;
    
    await client.query(query);
    query = `SELECT user_id FROM Members WHERE user_name = '${user}';`;
    let data = await client.query(query);
    userID = data.rows[0].user_id;
    console.log(userID + " is log on");
    res.status(200).send("User added");
}


//Create and fill database
async function executeScript(scriptPath) {
  try {
    // Read the SQL script
    const sqlScript = fs.readFileSync(scriptPath, 'utf8');
    // Execute the SQL script
    await client.query(sqlScript);
    console.log(`Script ${scriptPath} executed successfully`);
  } catch (error) {
    console.error(`Error executing script ${scriptPath}:`, error);
  }
}

async function resetDatabase() {
  try {
    const query = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
    `;

    // Execute the query
    const result = await client.query(query);

    // Drop each table
    for (const row of result.rows) {
      const tableName = row.table_name;
      const dropQuery = `DROP TABLE IF EXISTS "${tableName}" CASCADE;`;
      await client.query(dropQuery);
      console.log(`Dropped table ${tableName}`);
    }

    console.log('All tables dropped successfully');

  } catch (error) {
    console.error(`Error executing script DDL.sql:`, error);
  }
}


const { Client, Query } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


async function run() {
	try {
    await resetDatabase();
    await executeScript("./SQL/DDL.sql");
    await executeScript("./SQL/DML.sql");

    console.log("Database created and filled successfully");
	} finally {
		console.log("Server listening at http://localhost:3000");
		app.listen(3000, "0.0.0.0");

	}
}
// Run the function and handle any errors
run().catch(console.dir);