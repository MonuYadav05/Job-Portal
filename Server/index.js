const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.port || 3000;
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: ["https://job-portal-client-puce.vercel.app"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://Monuyadav60010:yplHM42Ga7opMkBS@job-portal.8grox.mongodb.net/?retryWrites=true&w=majority&appName=job-portal`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // create database
    const db = client.db("job-portal");
    const jobsCollection = db.collection("demoJobs");

    //post a job
    app.post("/post-job", async (req, res) => {
      const body = req.body;
      const result = await jobsCollection.insertOne(body);
      res.send(result);
    });

    //get all jobs
    app.get("/all-jobs", async (req, res) => {
      const jobs = await jobsCollection.find({}).toArray();
      res.send(jobs);
    });

    // get job by id
    app.get("/edit-job/:id", async (req, res) => {
      const { id } = req.params;
      const job = await jobsCollection
        .find({ _id: new ObjectId(id) })
        .toArray();
      res.send(job);
    });

    //update job
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

    //get all job by email
    app.get("/myJobs/:email", async (req, res) => {
      const { email } = req.params;

      const jobs = await jobsCollection
        .find({
          postedBy: email,
        })
        .toArray();
      res.send(jobs);
    });

    //delete a job
    app.delete("/delete/:id", (req, res) => {
      const { id } = req.params;
      jobsCollection
        .deleteOne({ _id: new ObjectId(id) })
        .then((result) => res.send(result));
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});


app.get("/all-jobs", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
