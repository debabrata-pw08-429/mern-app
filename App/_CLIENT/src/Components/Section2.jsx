// Import Modules_
import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

// Import Components_
import Slider from "./Slider";

// Import Styles_
import Styles from "../Styles/stats.css";

// Export Component_
const Section2 = () => {
  // Return Statement_
  return (
    <Box className={Styles.Home_carouselContainer__K44P8}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        py={10}
        mb="50px"
      >
        <Heading as="h2" fontSize={["2xl", "4xl"]} mb={4}>
          Features to explore
        </Heading>
        <Text as="p" fontSize={["xl", "2xl"]} px="7px" wordBreak="break-word">
          Amazing features to connect with people
        </Text>
      </Flex>

      <Slider />
    </Box>
  );
};

export default Section2;
