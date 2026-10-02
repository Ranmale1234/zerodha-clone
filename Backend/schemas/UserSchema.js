const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  mobile: {
    type: String,
    required: [true, "Your mobile number is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = { UserSchema };
