// Traemos el modelo de Usuario que hicimos antes
const { matchedData } = require('express-validator');
const userModel = require('../models/users');

// Traemos las formas de encriptación
const { encrypt, compare } = require('../utils/handlePassword');

// Traemos los tokens
const { tokenSign } = require('../utils/handleJWT');

const accountLDAP = require('../config/ldap');

/**
 * Registar un usuario nuevo
 * @param req
 * @param res
 *
 * @return registeredUser
 */
async function registerUser(req, res) {
  const body = matchedData(req);

  try {
    await accountLDAP.registerUser(body.username, body.password);
  } catch (err) {
    let s = err === 'USERNAME_ALREADY_TAKEN' ? 409 : 500;
    res.status(s).send({ error: `err` });
    return;
  }

  const passwordHash = await encrypt(body.password);
  body.password = passwordHash;

  const dataUser = await userModel.create(body);

  const registeredUser = {
    token: await tokenSign(dataUser),
    data: dataUser,
  };

  res.status(201).send(registeredUser);
}

/**
 * Ingresar a un usuario nuevo
 * @param req
 * @param res
 *
 * @return loggedUser
 */
async function loginUser(req, res) {
  const body = matchedData(req);

  try {
    await accountLDAP.loginUser();
  } catch (err) {
    let s = err === 'INVALID_CREDENTIALS' ? 401 : 500;
    res.status(s).send({ error: `err` });
    return;
  }

  const user = await userModel.findOne({
    where: { username: body.username },
  });

  if (user == null) {
    res.status(404).send({ error: 'USER_NOT_FOUND' });
    return;
  }

  const hashPassword = user.password;
  const check = await compare(body.password, hashPassword);

  if (!check) {
    res.status(401).send({ error: 'INVALID_PASSWORD' });
    return;
  }

  const loggedUser = {
    token: await tokenSign(user),
    data: user,
  };

  res.status(200).send(loggedUser);
}

/**
 * Obtener el usuario autenticado de las bases de datos
 * @param {*} res
 *
 * @return user
 */
async function getUser(_req, res) {
  const user = await userModel.findByPk(res.locals.userID);

  if (!user) {
    res.status(404).send({ error: 'USER_NOT_FOUND' });
    return;
  }

  res.status(200).send({ data: user });
}

/**
 * Obtener algún usuario de las bases de datos
 * @param {*} res
 *
 * @return user
 */
async function getUserByID(req, res) {
  const user = await userModel.findByPk(req.params.userID);

  if (!user) {
    res.status(404).send({ error: 'USER_NOT_FOUND' });
    return;
  }

  res.status(200).send({ data: user });
}

/**
 * Actualizar un usuario
 * @param {*} req
 * @param {*} res
 *
 * @return updatedUser
 */
async function updateUser(req, res) {
  const body = matchedData(req);
  const userID = res.locals.userID;

  const user = await userModel.findByPk(userID);

  if (user == null) {
    res.status(404).send({ error: 'USER_NOT_FOUND' });
    return;
  }

  try {
    await accountLDAP.updateUser(user.dataValues.username, body.username)
  } catch (err) {
    let s = err === 'LDAP_USER_NOT_FOUND' ? 404 : 500;
    res.status(s).send({ error: `err` });
    return;
  }

  const passwordHash = await encrypt(body.password);
  body.password = passwordHash;

  await userModel.update(body, {
    where: { id: userID },
  });

  await getUser(req, res);
}

/**
 * Eliminar un usuario
 * @param {*} res
 */
async function deleteUser(_req, res) {
  const userID = res.locals.userID;

  const user = await userModel.findByPk(userID);

  if (user == null) {
    res.status(404).send({ error: 'USER_NOT_FOUND' });
    return;
  }

  userModel.destroy({
    where: { id: userID },
  });

  res.status(410).send({ data: user });
}

// Exportar los controladores
module.exports = { getUser, registerUser, updateUser, deleteUser, loginUser, getUserByID };
