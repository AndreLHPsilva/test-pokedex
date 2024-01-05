import { TypeLoginDataProps } from "../Types/Zod/LoginTypes";
import { axiosInstance } from "../Config/Axios";
import { SendNotify, WaitToDisappear } from "../Helpers/Notifications";
import { IUser } from "../Types/User";

interface IDataResponse {
  token: string;
  user: IUser;
}

interface ApiResponse {
  data: IDataResponse;
  message: string;
  developMessage: string | null;
  statusHTTP: number;
}

export async function handleLogin(
  data: TypeLoginDataProps
): Promise<IDataResponse | null> {
  try {
    const response = await axiosInstance.post<ApiResponse>(
      "/users/signin",
      data
    );

    SendNotify({ message: response.data.message });
    await WaitToDisappear(1500);
    return response.data.data;
  } catch (error: any) {
    SendNotify({
      type: "error",
      message: error.response
        ? error.response.data.message
        : "Erro inesperado do sistema!",
    });
    return null;
  }
}
