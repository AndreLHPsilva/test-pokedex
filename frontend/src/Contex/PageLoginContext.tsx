import { createContext, useState } from "react";
import { IPageLoginContext } from "../Types/PageLogin/PageLoginTypes";

const PageLoginContext = createContext<IPageLoginContext>(
  {} as IPageLoginContext
);

const PageLoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);

  const valuesContext = {
    isVisiblePassword, setIsVisiblePassword
  }

  return (
    <PageLoginContext.Provider
      value={valuesContext}
    >
      <>{children}</>
    </PageLoginContext.Provider>
  );
};

export { PageLoginContext, PageLoginProvider };
