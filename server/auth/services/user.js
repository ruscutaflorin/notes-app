import bcrypt from "bcrypt";
import { AuthenticationError } from "../../utils/errors.js";
import UserModel from "../../models/User.js";
const saltRounds = 10;

export const registerService = async (user) => {
  try {
    const existingUser = await UserModel.findOne({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      throw Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const userSecure = { ...user, password: hashedPassword };

    const userData = await UserModel.create(userSecure);
    return userData;
  } catch (err) {
    throw err;
  }
};

export const loginService = async (userEmail, userPassword) => {
  try {
    const foundUser = await UserModel.findOne({
      where: {
        email: userEmail,
      },
    });
    if (!foundUser) {
      throw new AuthenticationError();
    }
    const comparePassword = await bcrypt.compare(
      userPassword,
      foundUser.password
    );
    if (!comparePassword) {
      throw new AuthenticationError();
    }
    return foundUser;
  } catch (err) {
    throw err;
  }
};
