module.exports = (req, res) => {
  console.log(req.session.userInfo?.userId);
  res.render("dashboard", { pageTitle: "Dashboard" });
};
