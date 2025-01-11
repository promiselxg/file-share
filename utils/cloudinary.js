import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

//  Remove uploaded image function
const removeUploadedImage = async (imageArray, preset) => {
  const publicIds = imageArray.map((img) => `${preset}/${img}`);
  try {
    const result = await cloudinary.v2.api.delete_resources(publicIds, {
      type: "upload",
      resource_type: "image",
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error.error.message);
  }
};

//  upload multiple image function
const cloudinaryImageUploadMethod = async (file, preset) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      { upload_preset: `${preset}` },
      (err, result) => {
        if (err) {
          console.log(err);
        }
        resolve({
          img: result,
        });
      }
    );
  });
};

export { removeUploadedImage, cloudinaryImageUploadMethod };
