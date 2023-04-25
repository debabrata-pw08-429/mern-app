// Import Modules_
import React from "react";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  Avatar,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
} from "@chakra-ui/react";

// Export Component_
function FeedCreate() {
  // STATES MANAGEMENT_
  let img_DP = useSelector((state) => {
    return state.loginReducer.picture;
  });

  let Image = img_DP;

  // Return Statement_
  return (
    <div style={{ pointer: "cursor" }}>
      <Link to="/create">
        <Stack padding="10px" spacing={4}>
          <InputGroup pointer="cursor" style={{ backgroundColor: "#FFFFFF" }}>
            <InputLeftElement
              children={
                <div>
                  <Avatar src={Image} size="xs" ml={4} mr={2} />
                </div>
              }
            />
            <Input
              type="text"
              placeholder="What's on your mind?"
              color={"#CCCCCC"}
              fontSize="14px"
              pointer="cursor"
            />
            <InputRightElement
              children={
                <AiFillPlusCircle size={19} style={{ fill: "#474747" }} />
              }
            />
          </InputGroup>
        </Stack>
      </Link>
    </div>
  );
}
export default FeedCreate;
