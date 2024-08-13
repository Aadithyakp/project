const appointment = require("./../models/appointment");

module.exports = async (req, res) => {
  const { time, date } = req.body;
  
  try {
    const newSlot = {
      date: date,
      time: time,
      isTimeSlotAvailable: false,
    };
    const createSlot = new appointment(newSlot);
    await createSlot.save();
    return res.redirect("/");
  } catch (err) {
    console.log("Error saving slots", err);
    return res.status(500).send("An error occurred");
  }
};
