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

export const changePasswordService = async (
  userId,
  currentPassword,
  newPassword
) => {
  try {
    const user = await UserModel.findOne({
      where: {
        username: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const comparePassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!comparePassword) {
      throw new Error("Current password is incorrect");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    await UserModel.update(
      { password: hashedNewPassword },
      { where: { username: userId } }
    );

    return { success: true };
  } catch (err) {
    throw err;
  }
};
