// Traemos el modelo de Usuario que hicimos antes
const { matchedData } = require("express-validator");
const userModel = require("../models/users");

// Traemos las formas de encriptación
const { encrypt, compare } = require("../utils/handlePassword");

// Traemos los tokens
const { tokenSign } = require("../utils/handleJWT");

/**
 * Obtener el usuario de las bases de datos
 * @param {*} req
 * @param {*} res
 */
async function getUser(req, res) {
  const { username } = matchedData(req);
  const data = await userModel.findOne({
    where: { username: username },
  });
  res.send({ data });
}

/**
 * Crear un usuario nuevo
 * @param {*} req
 * @param {*} res
 */
async function createUser(req, res) {
  let body = matchedData(req);

  const user = await userModel.findOne({
    where: { username: body.username },
  });

  if (user !== null) {
    res.send({ error: "Username ya utilizado" });
    return;
  }

  const passwordHash = await encrypt(body.password);
  body = { ...body, password: passwordHash };

  const dataUser = await userModel.create(body);

  const data = {
    token: await tokenSign(dataUser),
    user: dataUser,
  };

  res.send({ data });
}

async function loginUser(req, res) {
  const body = matchedData(req);

  const user = await userModel.findOne({
    where: { username: body.username },
  });

  if (user === null) {
    res.send({ error: "Usuario no encontrado" });
    return;
  }

  const hashPassword = user.password;
  const check = await compare(body.password, hashPassword);

  if (!check) {
    res.send({ error: "Contraseña incorrecta" });
    return;
  }

  const data = {
    token: await tokenSign(user),
    user: user,
  };

  res.send({ data });
}

/**
 * Actualizar un usuario
 * @param {*} req
 * @param {*} res
 */
async function updateUser(req, res) {
  const body = matchedData(req);

  const user = await userModel.findOne({
    where: { id: body.id },
  });

  if (user === null) {
    res.send({ error: "Usuario no encontrado" });
    return;
  }

  const userNoRepeat = await userModel.findOne({
    where: { username: body.username },
  });

  if (user !== null) {
    res.send({ error: "Nombre de usuario ya existente" });
    return;
  }

  const passwordHash = await encrypt(body.password);
  body = { ...body, password: passwordHash };

  const dataUser = await userModel.update(body,{
    where: { id: body.id },
  });

  const data = {
    token: await tokenSign(dataUser),
    user: dataUser,
  };

  res.send({ data })
}

/**
 * Eliminar un usuario
 * @param {*} req
 * @param {*} res
 */
function deleteUser(req, res) {}

// Exportar los controladores
module.exports = { getUser, createUser, updateUser, deleteUser, loginUser };
