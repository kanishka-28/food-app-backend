import Resizer from "react-image-file-resizer";

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      600,
      600,
      file.type.split('/')[1],
      10,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });