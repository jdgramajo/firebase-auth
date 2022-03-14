import admin from "../firebase";
import User from "../models/user";

export const currentUser = async (req, res) => {
  res.json(req.currentUser);
};

export const privateRoute = async (req, res) => {
  if (req.currentUser) {
    res.json({
      ok: true,
    });
  } else {
    res.json({
      ok: false,
    });
  }
};
