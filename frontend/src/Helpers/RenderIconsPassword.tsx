import { Icon } from "@iconify/react/dist/iconify.js";

export function RenderIconsPassword(isVisiblePassword: boolean) {
  return (
    <>
      {isVisiblePassword ? (
        <Icon
          className="text-red-500 hover:text-red-600 transition-all"
          icon="mdi:eye"
          width="20"
        />
      ) : (
        <Icon
          className="text-red-500 hover:text-red-600 transition-all"
          icon="mdi:eye-off"
          width="20"
        />
      )}
    </>
  );
}
