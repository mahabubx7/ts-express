import { Controller, CustomException } from "@core";
import { userQuery } from "./user.query";

export const getUsers: Controller = async (_, res) => {
  // const users = await userQuery.getUsers();

  throw new CustomException('Test global error!')

  // res.status(200).json({
  //   data: users,
  //   apiVersion: 'v1'
  // })
};

export const getUser: Controller = async (req, res) => {
  const { id } = req.params;
  const user = await userQuery.getUser(id);
  res.status(200).json({
    data: user,
    apiVersion: 'v1'
  })
};


export const addUser: Controller = async (req, res) => {
  const user = req.body;
  await userQuery.addUser(user).then((u) => {
    res.status(201).json({
      message: 'User added!',
      data: u
    })
  }).catch(err => {
    res.status(400).json({
      message: err.message ?? 'Something went wrong!',
      error: err
    })
  })
};

export const updateUser: Controller = async (req, res) => {
  const { body, params: { id } } = req;
  await userQuery.updateUser(id, body).then((u) => {
    res.status(201).json({
      message: 'User updated!',
      data: u
    })
  }).catch(err => {
    res.status(400).json({
      message: err.message ?? 'Something went wrong!',
      error: err
    })
  })
};

export const removeUser: Controller = async (req, res) => {
  const { params: { id } } = req;
  await userQuery.removeUser(id).then((u) => {
    res.status(201).json({
      message: 'User removed!',
      data: u
    })
  }).catch(err => {
    res.status(400).json({
      message: err.message ?? 'Something went wrong!',
      error: err
    })
  })
};
