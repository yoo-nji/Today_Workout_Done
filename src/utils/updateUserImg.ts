import { api } from "../api/axios";

export const updateUserImg = async (formData: FormData) => {
  try {
    const response = await api.post("/users/upload-photo", formData);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};
