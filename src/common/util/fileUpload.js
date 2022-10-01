import axios from "axios";

export const imageUpload = async (image, presignedUrl, uploadOptions) => {
  const { data } = await axios.post(
    presignedUrl,
    { file: image, ...uploadOptions },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};
