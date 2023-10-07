const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("./models/users");
const UserSchedules = require("./models/schedules");
const http = require("http");
const Token = require("./models/token");
const sendEmail = require("./utils/sendEmail");
const crypto = require("crypto");
const Router = express.Router();

require("dotenv").config();

const app = express();
var router = express.Router();

app.use(express.json());
app.use("/api", Router);
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/todoappdb");

const varifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token is missing");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("Error with token");
      } else {
        if (decoded.role === "admin") {
          next();
          //    return res.json("admin")
        } else {
          return res.json("not admin");
        }
      }
    });
  }
};

app.get("/Admin", varifyUser, (req, res) => {
  res.json("Success");
});

app.post("/Login", (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, role: user.role },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.status(200).cookie("token", token, {
            sameSite: "none",
            secure: true,
            httpOnly: true,
          });
          // Cookies.set('jwt-secret-key', token)
          return res.json({ Status: "Success", role: user.role, token: token });
        } else {
          return res.status(200).send({ message: "Password incorrect" });
        }
      });
    } else {
      res.json("No record existed");
    }
  });
});

app.post("/Register", async (req, res) => {
  const { email, firstname, lastname, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res.json({ message: "Email already exists" });
    } else {
      const hash = await bcrypt.hash(password, 10);
      const user = await UserModel.create({
        email,
        firstname,
        lastname,
        password: hash,
      });

      const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      const url = `${process.env.URL}users/${user.id}/verify/${token.token}`;
      await sendEmail(user.email, "Verify your Email", url);

      res
        .status(200)
        .send({ message: "An email has been sent please verify your account" });
    }
  } catch (err) {
    res.json({ Status: err });
  }
});

router.get("/:id/verify/:token", async (req, res) => {
  try {
    const user = await UserModel.findByOne({
      _id: req.params.id,
    });
    if (!user)
      return res.status(400).send({
        message: "Invalid link",
      });
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });
    await UserModel.updateOne({ _id: user._id, verified: true });
    await token.remove();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (err) {}
});

app.get("/Home", (req, res) => {
  UserSchedules.find({})
    .then((todos) => res.json(todos))
    .catch((err) => console.log(err));
});
app.get("/Count", (req, res) => {
  UserSchedules.countDocuments({})
    .then((count) => res.json({ count }))
    .catch((err) => console.log(err));
});

// app.post("/Home", async (req, res) => {
//     await UserSchedules.create(req.body).then(todos => res.json(todos)).catch(err => res.json(err))
// })

app.post("/Home", async (req, res) => {
  try {
    const latestTask = await UserSchedules.findOne(
      {},
      {},
      { sort: { taskNo: -1 } }
    );

    let newTaskNo = 1;

    if (latestTask && latestTask.taskNo) {
      newTaskNo = latestTask.taskNo + 1;
    }

    const newTask = {
      taskNo: newTaskNo,
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
    };

    const todos = await UserSchedules.create(newTask);
    res.json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/deleteTask/:taskNo", async (req, res) => {
  const taskNo = req.params.taskNo;
  try {
    const deletedTask = await UserSchedules.findByIdAndDelete(taskNo);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(deletedTask);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3001, () => {
  console.log("Serving is Running");
});
