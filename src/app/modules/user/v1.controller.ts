import { Controller, CustomException, Token, readFile, uploadFile } from "@core";
import { userQuery } from "./user.query";

export const getUsers: Controller = async (_, res) => {
  const users = await userQuery.getUsers();
  res.toJson(users);
};

export const getUser: Controller = async (req, res) => {
  const { params: { id } } = req.parsed;
  const user = await userQuery.getUser(id);
  res.toJson({ data: user, apiVersion: 'v1' });
};

export const getUserProfile: Controller = async (req, res) => {
  const { user } = req;
  res.toJson({ info: user });
};

/* This is not registration but adding user/customer by higher rank holders  */
export const addUser: Controller = async (req, res) => {
  const { body } = req.parsed;
  const newUser = await userQuery.addUser(body);
  res.toJson(newUser, null, 201);
};

export const updateUser: Controller = async (req, res) => {
  const { body, params: { id } } = req.parsed;
  const updated = await userQuery.updateUser(id, body);
  res.toJson(updated, null, 202);
};

// file upload test
export const updateUserPhoto: Controller = async (req, res) => {
  const { user, file } = req;
  if (!file) {
    throw new CustomException('File not uploaded!')
  }
  const { filename, mimetype } = file;
  const tokenKey = new Token().genToken('hex');
  await uploadFile('user-photos', tokenKey, {
    mimetype,
    filename,
  });

  const updated = await userQuery.updateUserPhoto(String(user?.sub), filename);
  res.toJson(updated, null, 202);
};

// file retrieve test
export const loadUserPhoto: Controller = async (req, res) => {
  const { params } = req;
  const etag = String(params.etag);
  await readFile(res, 'user-photos', etag);
};

export const removeUser: Controller = async (req, res) => {
  const { params: { id } } = req.parsed;
  const removed = await userQuery.removeUser(id);
  res.toJson(removed, null, 202);
};
