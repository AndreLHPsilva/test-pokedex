import axios from "axios";
import Notiflix from "notiflix";
import { SendNotify, WaitToDisappear } from "../../Helpers/Notifications";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL_API ?? "http://localhost:3000",
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

axiosInstance.interceptors.request.use((config) => {
  Notiflix.Loading.circle("Aguarde...", {
    svgColor: "#FF0000",
    messageColor: "#FF0000",
    messageFontSize: "18px",
  });
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    Notiflix.Loading.remove();
    return response;
  },
  async (error) => {
    if (error.code == "ERR_NETWORK") {
      Notiflix.Loading.remove();
      localStorage.clear();
      SendNotify({
        message: "Servidor ainda não disponível, em instantes tente novamente.",
        type: "error",
        time: 3000
      })
      await WaitToDisappear(3000);
      window.location.replace("/");
    }

    if (error?.response?.status == 401) {
      localStorage.clear();
      SendNotify({
        message: "Token inválido ou expirado, faça login novamente.",
        type: "error",
        time: 3000
      })
      await WaitToDisappear(3000);
      window.location.replace("/");
      return;
    }

    Notiflix.Loading.remove();
    return Promise.reject(error);
  }
);
