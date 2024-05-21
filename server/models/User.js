const mongoose = require("mongoose");
const { isEmail, contains } = require("validator");
const filter = require("../util/filter");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Минимум 5 символов"],
      maxlength: [30, "Максимум 30 символов"],
      validate: {
        validator: (val) => !contains(val, " "),
        message: "Поле пустое",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "Некорректный e-mail"],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Минимум 8 символов"],
    },
    biography: {
      type: String,
      default: "",
      maxLength: [250, "Максимум 250 символов"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (filter.isProfane(this.username)) {
    throw new Error("Username cannot contain profanity");
  }

  if (this.biography.length > 0) {
    this.biography = filter.clean(this.biography);
  }

  next();
});

module.exports = mongoose.model("user", UserSchema);
