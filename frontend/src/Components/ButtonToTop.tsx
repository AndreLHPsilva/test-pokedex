import { useEffect, useState } from "react";
import { Button } from "./Global/Button";
import { Icon } from "@iconify/react/dist/iconify.js";

export function ButtonToTop() {
  const [isVisible, setIsVisible] = useState(false);

  function handleScroll() {
    const scrollY = window.scrollY;
    setIsVisible(scrollY > 100);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="group fixed bottom-4 right-4 rounded-full p-2 animate-bounce shadow shadow-redPrimary  bg-white transition-all duration-300 hover:bg-redPrimary hover:shadow-black"
        >
          <Icon
            icon="mdi:arrow-top-bold-circle"
            width={28}
            className=" transition-all duration-300 group-hover:text-white text-redPrimary"
          />
        </Button>
      )}
    </div>
  );
}
