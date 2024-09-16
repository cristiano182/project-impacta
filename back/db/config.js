const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const EventModel = require("./EventModel");
const eventsMock = require("./mock");

const connect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  mongoose
    .connect(uri)
    .then(async () => {
      await EventModel.deleteMany({});
      await EventModel.insertMany(eventsMock);
      console.log("Connected!");
    })
    .catch((e) => console.log(e));
};
connect();
