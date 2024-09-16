const EventModel = require("./EventModel");
const moongose = require("mongoose");

class EventRepo {
  static async getEvents(title) {
    const events = await EventModel.find({
      title: { $regex: new RegExp(title || "", "i") },
    });
    return events;
  }

  static async createEvent(event) {
    const newEvent = new EventModel();
    newEvent.id = new moongose.mongo.ObjectId();
    newEvent.title = event.title || "";
    newEvent.description = event.description || "";
    newEvent.data = event.data || "";
    newEvent.image =
      event.image ||
      "https://s3.us-east-1.wasabisys.com/instax/74/instax/2023/08/shows-2023-1691006443-2048x1365.jpeg";
    const created = await newEvent.save();
    return created;
  }

  static async updateEvent(event) {
    await EventModel.updateOne({ id: event.id }, event);
  }

  static async deleteEvent(eventId) {
    await EventModel.deleteOne(eventId);
  }
}

module.exports = EventRepo;
