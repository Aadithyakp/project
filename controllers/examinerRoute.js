const User = require("./../models/userSchema");

module.exports = async (req, res) => {
  const userData = await User.find({
    appointmentId: {
      $exists: true,
    },
  });
  let singleUserData = null;
  console.log("QuERY", req.query);
  if (req.query.userId) {
    singleUserData = await User.findById(req.query.userId);
  }
  console.log("Query", req.query?.userId);
  console.log("USERDATA", userData);
  console.log("SINGLEUSERDATA", singleUserData);

  
  res.render("examiner", {
    pageTitle: "Examiner",
    allApps: userData,
    singleUser: singleUserData,
  });
};
