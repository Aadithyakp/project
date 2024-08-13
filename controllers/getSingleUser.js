const User = require("./../models/userSchema");

module.exports = async (req, res) => {
  const userData = await User.find({ userType: "Driver" });
  const singleUserData = await User.findById("661f46d3f3132f813b41726c");
  console.log("Query", req.query?.userId);
  console.log("USERDATA", userData);
  console.log("SINGLEUSERDATA", singleUserData);


  res.render("examiner", {
    pageTitle: "Examiner",
    allApps: userData,
    singleUser: singleUserData,
  });
};
