const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.port || 3000;
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: ["https://job-portal-clien.vercel.app"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.MONGODB_URI || `mongodb+srv://Monuyadav60010:yplHM42Ga7opMkBS@job-portal.8grox.mongodb.net/?retryWrites=true&w=majority&appName=job-portal`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let jobsCollection;

client.connect()
  .then(() => {
    const db = client.db("job-portal");
    jobsCollection = db.collection("demoJobs");
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });

// post a job
app.post("/post-job", async (req, res) => {
  const body = req.body;
  const result = await jobsCollection.insertOne(body);
  res.send(result);
});

// get all jobs
app.get("/all-jobs", async (req, res) => {
  const jobs = await jobsCollection.find({}).toArray();
  res.send(jobs);
});

// get job by id
app.get("/edit-job/:id", async (req, res) => {
  const { id } = req.params;
  const job = await jobsCollection.find({ _id: new ObjectId(id) }).toArray();
  res.send(job);
});

// update job
app.patch("/update-job/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      ...data,
    },
  };

  const result = await jobsCollection.updateOne(filter, updateDoc);
  res.send(result);
});

// get all jobs by email
app.get("/myJobs/:email", async (req, res) => {
  const { email } = req.params;

  const jobs = await jobsCollection.find({ postedBy: email }).toArray();
  res.send(jobs);
});

// delete a job
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  jobsCollection
    .deleteOne({ _id: new ObjectId(id) })
    .then((result) => res.send(result));
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});
