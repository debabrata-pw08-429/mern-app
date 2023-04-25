// Import Modules_
import { useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

// Import Styles_
import "../App.css";

// Export Component_
const Admin = () => {
  // STATES MANAGEMENT_
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  // Handler Functions_
  const handleSubmit = (event) => {
    event.preventDefault();
    const adminCred = {
      email: inputEmail,
      password: inputPassword,
    };

    console.log(adminCred);
  };

  // Return Statement_
  return (
    <div className="admin_form">
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          id="admin_email"
          type="email"
          name="Email"
          value={inputEmail}
          mb={5}
          onChange={(e) => setInputEmail(e.target.value)}
        />

        <FormLabel>Password</FormLabel>
        <Input
          id="admin_password"
          type="password"
          name="Password"
          value={inputPassword}
          mb={6}
          onChange={(e) => setInputPassword(e.target.value)}
        />

        <Button
          variant="outline"
          spacing="6"
          display="flex"
          justifyContent="center"
          colorScheme="blue"
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </FormControl>
    </div>
  );
};

export default Admin;
