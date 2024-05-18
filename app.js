const express = require("express");
const connectDB = require("./database"); // Include the database connection
const User = require("./model/User"); // Include the User model E:\UI-Task\main-server\model\User.js
const countSchema = require("./model/Count"); // Include the User model E:\UI-Task\main-server\model\User.js

const app = express();
app.use(express.json());

// Connect to Database
connectDB();

// Middleware to count API calls
app.use(async (req, res, next) => {
  console.log("Middleware called");
  const { id } = req.body;
  if (id) {
    try {
      //   let user = await User.findOne({ id });
      //   const doesUserExist = await countSchema.exists({ 'apiCalls': { $exists: true } });
      //   if (doesUserExist) {

      //     // const doesUserExist = await User.exists({ 'apiCalls': { $exists: true } });

      //     // await Count.updateOne(
      //     //   {},
      //     //   { $inc: { apiCalls: 1 } }
      //     // );
      //     doesUserExist.apiCalls++;
      //     await doesUserExist.save();
      //   }
      const filter = { apiCalls: { $exists: true } };
      const update = { $inc: { apiCalls: 1 } };
      const options = { new: true, upsert: true };

      const updatedUser = await countSchema.findOneAndUpdate(filter, update, options);

      if (updatedUser) {
        console.log(
          "The apiCalls attribute has been incremented or the document has been created."
        );
      } else {
        console.log("No document was found or created.");
      }
    } catch (error) {
      console.error("Error in middleware", error);
    }
  }
  next();
});

app.post("/addUser", async (req, res) => {
  const { id, name } = req.body;
  try {
    let user = await User.findOne({ id });
    if (user) {
      return res.status(409).send("User already exists.");
    }
    user = new User({ id, name, apiCalls: 0 });
    await user.save();
    res.status(200).send("User added.");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Update User Route
app.put("/updateUser/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).send("User not found.");
    }
    user.name = name;
    await user.save();
    res.send("User updated.");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// User API Count Route
app.get("/userApiCount/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.send(`User ${id} has made ${user.apiCalls} API calls.`);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
