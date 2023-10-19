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
const session = require("express-session");
const mongoDBSession = require("connect-mongodb-session")(session);

require("dotenv").config();

const app = express();
var router = express.Router();

app.use(express.json());
app.use("/api", Router);
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());

const mongoURI = "mongodb://127.0.0.1:27017/todoappdb";

mongoose.connect(mongoURI).then((res) => console.log("Connected"));

const store = new mongoDBSession({
  uri: mongoURI,
  collection: "mySession",
});

app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

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

// const isAuth = (req, res, next) => {
//   if (req.session.isAuth) {
//     next();
//   } else {
//     res.send("<script>window.location='/Login';</script>");
//   }
// };

// app.post("/Login", (req, res) => {
//   // res.header("Access-Control-Allow-Origin", "*");
//   const { email, password } = req.body;
//   UserModel.findOne({ email: email }).then((user) => {
//     if (user) {
//       bcrypt.compare(password, user.password, (err, response) => {
//         if (response) {
//           const token = jwt.sign(
//             { email: user.email, role: user.role },
//             "jwt-secret-key",
//             { expiresIn: "1d" }
//           );
//           res.status(200).cookie("token", token, {
//             sameSite: "none",
//             secure: true,
//             httpOnly: true,
//           });
//           // Cookies.set('jwt-secret-key', token)
//           req.session.isAuth = true;
//           return res.json({ Status: "Success", role: user.role, token: token });
//         } else {
//           return res.status(200).send({ message: "Password incorrect" });
//         }
//       });
//     } else {
//       res.json("No record existed");
//     }
//   });
// });

app.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      // User doesn't exist
      return res.status(404).json({ message: "No record existed" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Password is correct; create a JWT token
      const token = jwt.sign(
        { email: user.email, role: user.role },
        "jwt-secret-key",
        { expiresIn: "1d" }
      );

      // Set the token as a cookie
      res.cookie("token", token, {
        sameSite: "none",
        secure: true,
        httpOnly: true,
      });

      req.session.isAuth = true;
      return res
        .status(200)
        .json({ status: "Success", role: user.role, token: token });
    } else {
      // Password is incorrect
      return res.status(401).json({ message: "Password incorrect" });
    }
  } catch (err) {
    // Handle any unexpected errors
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/auth-check", (req, res) => {
  if (req.session.isAuth) {
    return res.json({ status: "authenticated" });
  } else {
    res.send("<script>window.location='/Login';</script>");
  }
});

app.post("/Logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.send("<script>window.location='/Login';</script>");
  });
});

// app.post("/Logout", async (req, res) => {
//   try {
//     await new Promise((resolve, reject) => {
//       req.session.destroy((err) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve();
//         }
//       });
//     });
//     res.redirect("/Login");
//   } catch (err) {
//     console.error("Error destroying session:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

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

app.get("/dashboard", (req, res) => {
  res.send("<script>window.location='/Home';</script>");
});

app.put("/users/:id/verify/:token", async (req, res) => {
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
    if (!token) return res.status(400).send({ message: "Error" });
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

app.get("/getTask/:taskNo/", (req, res) => {
  const task = req.params.taskNo;
  UserSchedules.findOne({ taskNo: task })
    .then((task) => {
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    })
    .catch((err) => console.log(err));
});

app.put("/Update/:taskNo", async (req, res) => {
  try {
    const taskNo = req.params.taskNo;

    UserSchedules.findOneAndUpdate(
      { taskNo: taskNo },
      {
        date: req.body.date,
        title: req.body.title,
        description: req.body.description,
      },
      { new: true }
    )
      .then((todos) => {
        if (!todos) {
          return res.status(404).json({ error: "Task not found" });
        }

        res.json(todos);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/Home", async (req, res) => {
  try {
    const tasks = await UserSchedules.find({}, {}, { sort: { taskNo: 1 } });

    let newTaskNo = 1;

    for (const task of tasks) {
      if (task.taskNo !== newTaskNo) {
        break;
      }
      newTaskNo++;
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
