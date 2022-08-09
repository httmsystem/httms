import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    last_name: {
      type: String,
      required: [true, "Please add a text value"],
    },
    first_name: {
      type: String,
      required: [true, "Please add a text value"],
    },
    suffix: {
      type: String,
    },
    middle_name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    user_role: {
      type: String,
      required: [true, "Please add a user role"],
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("tbl_user", userSchema);

export default Users;
