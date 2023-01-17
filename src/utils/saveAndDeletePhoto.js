async function savePhoto(image, type) {
  try {
    await ensureDir(uploadsDir);

    const sharpImage = sharp(image.data);

    const imageInfo = await sharpImage.metadata();
    if (type === 0) {
      sharpImage.resize(150, 150);
    }

    const imageName = `${uuid.v4()}.jpg`;
    const imagePath = path.join(uploadsDir, imageName);

    await sharpImage.toFile(imagePath);

    return imageName;
  } catch (_) {
    throw new Error('Error al procesar la imagen');
  }
}

async function deletePhoto(photoName) {
  try {
    const photoPath = path.join(uploadsDir, photoName);

    await unlink(photoPath);
  } catch (_) {
    throw new Error('Error al eliminar la imagen del servidor');
  }
}
