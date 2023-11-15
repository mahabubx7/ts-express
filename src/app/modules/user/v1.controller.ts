import { Controller } from "@core";
import { userQuery } from "./user.query";

export const getUsers: Controller = async (_, res) => {
  const users = await userQuery.getUsers();
  res.toJson(users);
};

export const getUser: Controller = async (req, res) => {
  const { id } = req.params;
  const user = await userQuery.getUser(id);
  res.toJson({ data: user, apiVersion: 'v1' });
};

export const getUserProfile: Controller = async (req, res) => {
  const { user } = req;
  res.toJson({ info: user });
};

/* This is not registration but adding user/customer by higher rank holders  */
export const addUser: Controller = async (req, res) => {
  const user = req.body;
  const newUser = await userQuery.addUser(user);
  res.toJson(newUser, null, 201);
};

export const updateUser: Controller = async (req, res) => {
  const { body, params: { id } } = req;
  const updated = await userQuery.updateUser(id, body);
  res.toJson(updated, null, 202);
};

export const removeUser: Controller = async (req, res) => {
  const { params: { id } } = req;
  const removed = await userQuery.removeUser(id);
  res.toJson(removed, null, 202);
};
