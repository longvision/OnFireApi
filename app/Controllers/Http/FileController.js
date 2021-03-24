"use strict";

const File = use("App/Models/File");

const Drive = use("Drive");
class FileController {
  async show({ params, response }) {
    try {
      const { id: name } = params;
      const file = await File.findByOrFail("name", name);
      response.implicitEnd = false;
      response.header("Content-Type", file.content_type);
      const stream = await Drive.getStream(file.key);
      stream.pipe(response.response);
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: "File doesn't exists!",
          err_message: err.message,
        },
      });
    }
  }

  async store({ request, response }) {
    request.multipart
      .file("image", { size: "2mb" }, async (file) => {
        try {
          const query = request.get();

          const ContentType = file.headers["content-type"];

          const ACL = "public-read";

          const cleanName = file.clientName
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            // Remove acentos
            .replace(/([^\w]+|\s+)/g, "-")
            // Substitui espaço e outros caracteres por hífen
            .replace(/\-\-+/g, "-")
            // Substitui multiplos hífens por um único hífen
            .replace(/(^-+|-+$)/, "");
          // Remove hífens extras do final ou do inicio da string

          const randomName =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

          const fileName = `${randomName}_`;

          const stampName = `${Date.now()}.${cleanName}.${file.subtype}`;

          // Uploads the file to Amazon S3 and stores the url
          const s3Path = `${query.folder}/${fileName + stampName}`;

          const Key = s3Path;

          const url = await Drive.put(Key, file.stream, {
            ContentType,
            ACL,
          });

          const createdFile = await File.create({
            name: stampName,
            key: Key,
            url,
            product_id: query.productId,
            content_type: ContentType,
          });

          return createdFile;
        } catch (e) {
          return response.status(e.status).send({
            e: {
              message: "Error on file upload!",
              err_message: e.message,
            },
          });
        }
      })
      .process();
  }
  async destroy({ params, response }) {
    try {
      const { id: name } = params;
      const file = await File.findByOrFail("name", name);

      await Drive.delete(file.key);

      await file.delete();
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: "File doesn't exists!",
          err_message: err.message,
        },
      });
    }
  }
}

module.exports = FileController;
