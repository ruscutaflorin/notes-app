import { check } from "express-validator";
export const validateRegister = [
  check("username").isString(),
  check("email")
    .isEmail()
    .custom((value) => {
      if (!value.endsWith("@stud.ase.ro")) {
        throw new Error("Email must be from @stud.ase.ro domain");
      }
      return true;
    }),
  check("password").isString().isLength({ min: 6 }),
];
export const validateLogin = [
  check("email")
    .isEmail()
    .custom((value) => {
      if (!value.endsWith("@stud.ase.ro")) {
        throw new Error("Email must be from @stud.ase.ro domain");
      }
      return true;
    }),
  check("password").isString().isLength({ min: 6 }),
];

export const validateAttachment = [
  check("type").isString().notEmpty(),
  check("url").optional().isString(),
];

export const validateClass = [
  check("className").isString().notEmpty(),
  check("description").optional().isString(),
];

export const validateNote = [
  check("title").isString().notEmpty(),
  check("content").optional().isString(),
];

export const validateStudyGroup = [
  check("groupName").isString().notEmpty(),
  check("members").optional().isArray(),
  check("notes").optional().isArray(),
];
