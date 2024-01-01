import { useContext } from "react";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { PageLoginProvider } from "./Contex/PageLoginContext";
import { AuthContext } from "./Contex/AuthContext";

function App() {
  const { showLogin } = useContext(AuthContext);

  return (
    <PageLoginProvider>
      <main className="h-screen">
        {showLogin && <Login />}
        {!showLogin && <Register />}
      </main>
    </PageLoginProvider>
  );
}

export default App;
