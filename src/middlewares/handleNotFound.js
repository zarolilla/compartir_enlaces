const handleNotFound = (req, res) => {
  res.status(404).send({ status: 'error', message: 'no encontrado' });
};

module.exports = handleNotFound;
