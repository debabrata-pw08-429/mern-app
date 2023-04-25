// Import Modules_
import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SiAdguard } from "react-icons/si";
import { TiTick } from "react-icons/ti";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Text,
  Button,
  Box,
  Spinner,
} from "@chakra-ui/react";

// Import Components_
import { FeedContext } from "../Context/FeedContext";
import { putData } from "../Redux/PeopleDetails/action";

// Export Component_
function ProfileComp({ id1, name, category, img, userFollowState }) {
  // STATES MANAGEMENT_
  let { followstate, setFollowstate, setidC, trueCount, setTrueCount } =
    useContext(FeedContext);
  let peopleData = useSelector((state) => state.PeopleReducer.peopleData);
  const [showSpinner, setShowSpinner] = useState(false);
  let [bt, setBt] = useState("Follow +");
  let [bt1, setBt1] = useState(0);
  let dispatch = useDispatch();

  // Handler Functions_
  const changeFollow = () => {
    setBt();
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
      setBt1(1);
      setidC(id1);
      let q = -1;
      let x = [
        ...peopleData.map((e, idx) => {
          if (e.id === id1) {
            q = idx;
            return {
              ...e,
              userFollowState: false,
            };
          } else {
            return e;
          }
        }),
      ];
      setTrueCount(trueCount - 1);
      let send = x[q];
      dispatch(putData(send, id1));
      setFollowstate(followstate);
    }, 2000);
  };

  // Return Statement_
  return userFollowState === true ? (
    <div>
      <Card alignItems="center" height={"12em"} width={"130px"}>
        <CardBody alignItems="center" justify-Content="Center" p="6px 16px">
          <Image
            src={img}
            alt=""
            borderRadius="50%"
            width="80px"
            height="80px"
          />
          <Box marginLeft={"41%"} marginTop={"-6%"} marginBottom={"5%"}>
            <SiAdguard color="#ffbf00" />
          </Box>
          <Stack spacing="3">
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.0",
                fontWeight: "bold",
              }}
            >
              {name}
            </p>
            <Text color="#888888" fontSize="12px">
              {category}
            </Text>
          </Stack>
        </CardBody>
        <Button
          border="1px solid #4b4b4b"
          onClick={changeFollow}
          variant="solid"
          bg={bt1 === 0 ? "#4b4b4b" : "#ffffff"}
          colorScheme="#4b4b4b"
          borderRadius="20px"
          position="relative"
          bottom="-10px"
          height={"26px"}
          width={"79px"}
          fontSize="12px"
        >
          {bt1 === 0 ? (
            bt
          ) : bt1 === 1 ? (
            <TiTick fill={"#4b4b4b"} size={"20px"} />
          ) : (
            ""
          )}{" "}
          {showSpinner && <Spinner />}{" "}
        </Button>
      </Card>
    </div>
  ) : (
    <></>
  );
}

export default ProfileComp;
