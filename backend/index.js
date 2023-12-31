const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bodyParser = require("body-parser");
const startServer = async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const con = await mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12673801",
    password: "xGIUYPIwKC",
    database: "sql12673801",
  });

  app.use(express.json());

  app.post("/createProject", async (req, res) => {
    try {
      const { title } = req.body;
      const results = await con.execute(
        `insert into projects (title) values ('${title}')`
      );
      res.json(results);
    } catch (error) {
      res.json(error);
    }
  });

  app.get("/allProjects", async (req, res) => {
    try {
      const [results] = await con.execute(`select * from projects`);
      res.json(results);
    } catch (error) {
      res.json(error);
    }
  });

  app.post("/:id/createtask", async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const { startDate } = req.body;
      const { endDate } = req.body;
      const { status } = req.body;
      const results = await con.execute(
        `insert into tasks(task,start_date,deadlink,status,projectId) values('${title}','${startDate}','${endDate}','${status}', '${id}')`
      );
      res.json(results);
    } catch (error) {
      res.json(error);
    }
  });
  app.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const [results] = await con.execute(
        `select * from tasks where projectId = '${id}'`
      );
      res.json(results);
    } catch (error) {
      res.json(error);
    }
  });

  app.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const [results] = await con.execute(
        `delete from tasks where projectId = '${id}'`
      );
      const [projects] = await con.execute(
        `delete from projects where id = '${id}'`
      );
      res.json({
        taskResults,
        projectResults,
      });
    } catch (error) {
      res.json(error);
    }
  });

  //tasks upadate
  app.put("/:task_id/update", async (req, res) => {
    try {
      const { task_id } = req.params;
      const { task } = req.body;
      const { start_date } = req.body;
      const { deadlink } = req.body;
      const { status } = req.body;
      // console.log(start_date, deadlink);
      // const formattedStartDate = moment(start_date).format("YYYY-MM-DD");
      // const formattedEndDate = moment(deadlink).format("YYYY-MM-DD");

      const [results] = await con.execute(
        `update tasks set task='${task}',start_date='${start_date}',deadlink='${deadlink}',status='${status}' where task_id='${task_id}'`
      );
      // console.log(results.data);
      // start_date='${formattedStartDate}',deadlink='${formattedEndDate}',
      res.json({
        task: task,
        start_date: start_date,
        deadlink: deadlink,
        status: status,
      });
    } catch (error) {
      res.json(error);
    }
  });

  //task details

  app.get("/details/:task_id", async (req, res) => {
    try {
      const { task_id } = req.params;
      const [result] = await con.execute(
        `select * from tasks where task_id='${task_id}'`
      );
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  //title name
  app.get("/title/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const [results] = await con.execute(
        `select title from projects where id='${id}'`
      );
      res.json(results);
    } catch (error) {
      res.json(error);
    }
  });

  // app.get("/", (req, res) => {
  //   res.send("hellow");
  // });

  app.listen(3000, async () => {
    console.log("listening on port 3000");
  });
};
startServer();
