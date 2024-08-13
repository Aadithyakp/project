const User = require("./../models/userSchema");

module.exports = async (req, res) => {
  const { comment, result, userId } = req.body;
  const newData = {
    comment: comment,
    result: result,
  };

  const user = await User.findByIdAndUpdate(userId, newData);
  res.redirect("/");
};