import React from "react";
import { UsersProvider } from "./UserContext";
import Users from "./Users";

function App() {
  return (
    <UsersProvider>
      <Users></Users>
    </UsersProvider>
  );
}
export default App;
