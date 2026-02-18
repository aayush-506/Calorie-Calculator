import { Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";

import { LogOut } from "../redux/auth/auth.actions";
const LogoutButton = () => {
  const dispatch = useDispatch();



  const handleClick = () => {
    dispatch(LogOut());
  };

  return (
    <Button
      onClick={handleClick}
      size="sm"
      variant="outline"
      borderWidth="1px"
      borderColor="orange.400"
      color="orange.500"
      bg="white"
      _hover={{ bg: 'orange.50', borderColor: 'orange.500' }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
