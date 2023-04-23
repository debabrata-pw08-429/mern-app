import "./styles/App.css";
import AllRouter from "./routes/AllRouter";
import { Profile } from "./components/Profile";

function App() {
  return (
    <>
      <AllRouter />
      <Profile />
    </>
  );
}

export default App;
