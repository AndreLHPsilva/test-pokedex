import Notiflix from "notiflix";

interface INotificationDTO {
  type?: "success" | "warning" | "error";
  message: string;
}

export function Notifications({ message, type = "success" }: INotificationDTO) {
  switch (type) {
    case "warning":
      return Notiflix.Notify.info(message, {
        timeout: 1700,
        pauseOnHover: true,
      });
    case "error":
      return Notiflix.Notify.failure(message, {
        timeout: 1700,
        pauseOnHover: true,
      });
    case "success":
      return Notiflix.Notify.success(message, { timeout: 1500 });
  }
}

export async function WaitToDisappear(time: number) {
  await new Promise((resolve) => setTimeout(resolve, time));

  return;
}
