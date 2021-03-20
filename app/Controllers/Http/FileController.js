"use strict";

const File = use("App/Models/File");
const Helpers = use("Helpers");
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
          const ContentType = file.headers["content-type"];
          const ACL = "public-read";

          const fileName = file.clientName
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Remove acentos
            .replace(/([^\w]+|\s+)/g, "-") // Substitui espaço e outros caracteres por hífen
            .replace(/\-\-+/g, "-") // Substitui multiplos hífens por um único hífen
            .replace(/(^-+|-+$)/, ""); // Remove hífens extras do final ou do inicio da string

          const Key = `${(Math.random() * 100).toString(32)}-${fileName}`;
          const url = await Drive.put(Key, file.stream, {
            ContentType,
            ACL,
          });

          const createdFile = await File.create({
            name: fileName,
            key: Key,
            url,
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
}

module.exports = FileController;
