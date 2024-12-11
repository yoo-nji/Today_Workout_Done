import { api } from "../api/axios";

export const updatePost = async (formData: FormData) => {
  try {
    const response = await api.put("/posts/update", formData);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
