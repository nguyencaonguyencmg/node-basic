import pool from "../configs/connectDB";
import multer from "multer";

let getHomepage = async (rep, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM users");
  return res.render("index.ejs", {
    dataUser: rows,
    // test: "abc test",
  });
};
let getDetailPage = async (req, res) => {
  let id = req.params.userId;
  let [user] = await pool.execute(`select * from users where ID = ?`, [id]);
  return res.render("detail.ejs", {
    dataUser: user,
  });
};
let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    `INSERT INTO users(firstName,lastName,email,address) VALUES (?,?,?,?)`,
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};
let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute(`DELETE FROM users WHERE id = ?`, [userId]);
  return res.redirect("/");
};
let getEditUser = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  let [user] = await pool.execute(`SELECT * FROM users where ID = ?`, [id]);
  return res.render("edit.ejs", { dataUser: user[0] });
};
let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    `UPDATE users SET firstName=?,lastName=?,email=?,address=? WHERE ID=?`,
    [firstName, lastName, email, address, id]
  );
  return res.redirect("/");
};
let getUploadPage = async (req, res) => {
  return res.render("uploadfile.ejs");
};

const upload = multer().single("profile_pic");
let handleUploadFile = async (req, res) => {
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
    );
  });
};
module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditUser,
  updateUser,
  getUploadPage,
  handleUploadFile,
};
