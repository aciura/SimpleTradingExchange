import IUser from '../models/user'
import express from 'express'

const userList: IUser[] = [
  {
    userId: '1234',
  },
]

const getListOfUsers = (req: express.Request, res: express.Response) => {
  res.status(200).send({ users: userList })
}

const addUser = (
  req: express.Request<{ name: string }>,
  res: express.Response,
) => {
  // TODO: add body validation
  const newUser: IUser = { userId: req.body.userId }
  userList.push(newUser)
  res.status(201).send({ newUser })
}

const getUserWithId = (
  req: express.Request<{ userId: string }>,
  res: express.Response,
) => {
  const user = userList.find((u) => u.userId === req.params.userId)
  if (user) {
    res.status(200).send({ user })
  } else {
    res
      .status(404)
      .send({ userId: req.params.userId, message: 'User not found' })
  }
}

const UserController = {
  getListOfUsers,
  addUser,
  getUserWithId,
}
export default UserController
