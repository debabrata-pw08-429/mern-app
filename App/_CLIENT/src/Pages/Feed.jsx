// Import Modules_
import React, { useEffect, useContext } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Box, Text, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Import Components_
import ProfileComp from "../Components/ProfileComp";
import FeedPost from "../Components/FeedPost";
import Rsidebar from "../Components/Rsidebar";
import FeedCreate from "../Components/FeedCreate";
import { getData } from "../Redux/PeopleDetails/action";
import { getData1 } from "../Redux/PostDetails/action";
import { getData2 } from "../Redux/userDetails/action";
import { getData3 } from "../Redux/LoogedOutData/action";
import { Lsidebar } from "../Components/Lsidebar";
import { FeedContext } from "../Context/FeedContext";

// Import Styles_
import f from "../Styles/feed.module.css";

// Export Component_
function Feed() {
  // STATES MANAGEMENT_
  let { followstate, trueCount, setTrueCount } = useContext(FeedContext);
  let peopleData = useSelector((state) => state.PeopleReducer.peopleData);
  let userPostData = useSelector((state) => state.userPostReducer.userPostData);
  let loggedUser = useSelector((state) => state.loggedReducer.loggedUser);

  let LoggedOutData = useSelector(
    (state) => state.loggedOutDataReducer.loggedOutData
  );

  let isAuth = useSelector((state) => {
    return state.loginReducer.isAuth;
  });

  let dispatch = useDispatch();

  // Handler Functions_
  useEffect(() => {
    dispatch(getData(0));
    dispatch(getData1());
    dispatch(getData2());
    dispatch(getData3());
    setTrueCount(7);
  }, [dispatch, setTrueCount]);

  useEffect(() => {}, [followstate]);

  // Return Statement_
  return (
    <Box>
      <Flex w="100%">
        <Box w={["0", "0", "26%", "26%"]} paddingLeft={["0", "0", "0", "2%"]}>
          <Lsidebar />
        </Box>

        <Box
          w={["100%", "100%", "74%", "42%"]}
          bg="#f8f7f3"
          p={"10px 12px 0px"}
          _zIndex="-1"
          overflow={"hidden"}
        >
          <HStack
            p={"20px 10px"}
            alignItems="center"
            justifyContent={"space-between"}
            marginBottom="2px"
          >
            <button className={f.n1}>
              <Text as="b" fontSize="13px" color="#121212">
                Feed
              </Text>
            </button>
            <button bg={"#f8f7f3"}>
              <Text fontSize="13px" color="#888888">
                People
              </Text>
            </button>
            <button bg={"#f8f7f3"}>
              <Text fontSize="13px" color="#888888">
                Polls
              </Text>
            </button>
            <button bg={"#f8f7f3"}>
              <Text fontSize="13px" color="#888888">
                Videos
              </Text>
            </button>
            <button bg={"#f8f7f3"}>
              <Text fontSize="13px" color="#888888">
                New
              </Text>
            </button>
            <button bg={"#f8f7f3"}>
              <Text fontSize="13px" color="#888888">
                People
              </Text>
            </button>
            <button bg={"#f8f7f3"}>
              <Text fontSize="13px" color="#888888">
                Following
              </Text>
            </button>
            <button bg={"#f8f7f3"}>
              <Text fontSize="13px" color="#888888">
                Popular
              </Text>
            </button>
          </HStack>
          <FeedCreate />

          {trueCount >= 5 && (
            <>
              <HStack
                p={"20px 10px"}
                alignItems="center"
                justifyContent={"space-between"}
                marginBottom={"2%"}
                marginTop={"-3%"}
              >
                <Text as="b" fontSize="18px" color="#1A202C">
                  People you can follow
                </Text>
                <Link to="/people">
                  <AiOutlineArrowRight size={22} />
                </Link>
              </HStack>

              <HStack marginTop={"-3%"} marginLeft={"2%"} marginBottom={"5%"}>
                {peopleData.map((e) => {
                  let { name, category, img, userFollowState, id } = e;
                  return (
                    <ProfileComp
                      id1={id}
                      name={name}
                      category={category}
                      img={img}
                      userFollowState={userFollowState}
                      setTrueCount={setTrueCount}
                    />
                  );
                })}
              </HStack>
            </>
          )}

          {isAuth === true &&
            userPostData.map((e, idx) => {
              let name = loggedUser.name;
              let username = loggedUser.given_name;
              let img = loggedUser.picture;
              let category = "";
              let userFollowState = false;
              let postsID = idx;
              let days = "Just now";
              let content = {
                textContent: e.data.description,
                imgContent: e.data.myJSON,
              };
              let hastags = "";
              let likes = 0;
              let comments = 0;
              let reKoo = 0;
              let userLike = e.data.userLike;
              let Image1 = loggedUser.picture;
              let user = true;

              return (
                <FeedPost
                  user={user}
                  id1={idx + 1}
                  postsID={postsID}
                  Image1={Image1}
                  name={name}
                  category={category}
                  userLike={userLike}
                  img={img}
                  userFollowState={userFollowState}
                  username={username}
                  days={days}
                  content={content}
                  hastags={hastags}
                  likes={likes}
                  comments={comments}
                  reKoo={reKoo}
                />
              );
            })}

          {isAuth === true &&
            peopleData.map((e) => {
              let {
                name,
                username,
                category,
                img,
                posts,
                userFollowState,
                id,
              } = e;
              return (
                <div>
                  {posts.map((e) => {
                    let Image1 = loggedUser.picture;
                    let {
                      postsID,
                      days,
                      content,
                      hastags,
                      likes,
                      comments,
                      reKoo,
                      userLike,
                    } = e;
                    let user = false;
                    return (
                      <FeedPost
                        user={user}
                        id1={id}
                        postsID={postsID}
                        Image1={Image1}
                        name={name}
                        category={category}
                        userLike={userLike}
                        img={img}
                        userFollowState={userFollowState}
                        username={username}
                        days={days}
                        content={content}
                        hastags={hastags}
                        likes={likes}
                        comments={comments}
                        reKoo={reKoo}
                      />
                    );
                  })}
                </div>
              );
            })}

          {isAuth === false &&
            LoggedOutData.map((e) => {
              let {
                name,
                username,
                category,
                img,
                posts,
                userFollowState,
                id,
              } = e;
              return (
                <div>
                  {posts.map((e) => {
                    let Image1 = loggedUser.picture;
                    let {
                      postsID,
                      days,
                      content,
                      hastags,
                      likes,
                      comments,
                      reKoo,
                      userLike,
                    } = e;
                    let user = false;
                    return (
                      <FeedPost
                        user={user}
                        id1={id}
                        postsID={postsID}
                        Image1={Image1}
                        name={name}
                        category={category}
                        userLike={userLike}
                        img={img}
                        userFollowState={userFollowState}
                        username={username}
                        days={days}
                        content={content}
                        hastags={hastags}
                        likes={likes}
                        comments={comments}
                        reKoo={reKoo}
                      />
                    );
                  })}
                </div>
              );
            })}
        </Box>

        <Box
          w="32%"
          paddingRight={"6%"}
          display={["none", "none", "none", "block"]}
        >
          <Rsidebar />
        </Box>
      </Flex>
    </Box>
  );
}

export default Feed;
