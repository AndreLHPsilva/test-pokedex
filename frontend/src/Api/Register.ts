import { axiosInstance } from "../Config/Axios";
import { Notifications } from "../Helpers/Notifications";
import { TypeRegisterDataProps } from "../Types/Zod/RegisterTypes";

interface ApiResponse {
  data: any;
  message: string;
  developMessage: string | null;
  statusHTTP: number;
}

export async function HandleRegister(data: TypeRegisterDataProps) {
  try {
    const response = await axiosInstance.post<ApiResponse>("/users", data);

    Notifications({ message: response.data.message });
    return response.data.data;
  } catch (error: any) {
    Notifications({
      type: "error",
      message: error.response
        ? error.response.data.message
        : "Erro inesperado do sistema!",
    });
    return null;
  }
}
