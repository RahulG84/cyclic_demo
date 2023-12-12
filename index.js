require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const book = require('./server/books');

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connect On ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
  res.send({
    name: "Rahul"
  });
});

app.get("/add-note", async (req, res) => {
  try {
    await book.insertMany([
      {
        title: "JavaScript",
        body: "Book For Some ...."
      },
      {
        title: "Dart",
        body: "Book For Some ...."
      }
    ]);
  } catch (error) {
    console.log(error);
  }
});

app.get("/get-books", async (req, res) => {
  const books = await book.find();
  if (books) {
    res.json(books);
  } else {
    res.send("Something Wrong");
  }
});
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listing on Port ${PORT}`);
  });
});
