// Import Modules_
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { BsSend, BsPlusCircle, BsBarChart } from "react-icons/bs";
import { AiOutlineHistory } from "react-icons/ai";
import { HiOutlineInboxArrowDown, HiOutlineLink } from "react-icons/hi2";
import { ImImages } from "react-icons/im";
import { RxVideo } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";
import {
  Avatar,
  Box,
  HStack,
  Button,
  Text,
  Spacer,
  CircularProgress,
  CircularProgressLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Progress,
  ModalFooter,
} from "@chakra-ui/react";

// Import Components_
import { postData } from "../Redux/PostDetails/action";
import { getData2 } from "../Redux/userDetails/action";

// Import Styles_
import style from "../Styles/create.module.css";

// Export Component_
function Create() {
  // STATES MANAGEMENT_
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [description, setDescription] = useState(0);
  const [myJSON, setmyJSON] = useState();
  const [file, setFile] = useState([]);
  const fileInputRef = useRef(null);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [progressCount, setProgressCount] = useState(0);

  let loggedUser = useSelector((state) => state.loggedReducer.loggedUser);
  let img_DP = useSelector((state) => state.loginReducer.picture);
  let Image = img_DP || loggedUser;

  // Handler Functions_
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setProgressCount((prevProgressCount) => prevProgressCount + 25);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    dispatch(getData2());
  }, [dispatch]);

  // TEXT INPUT_ FROM /create
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setDescription(event.target.value);
    setCount(inputValue.length);
  };

  // Image Upload Process start_
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const filesArray = Array.from(selectedFiles);
    const filesWithPreview = filesArray.map((file) => ({
      fileData: file,
      previewUrl: URL.createObjectURL(file),
      actualFile: file,
      type: file.type,
      date: file.lastModifiedDate,
    }));

    const filesEncode = filesArray.map((file) =>
      encodeFileAsBase64(file).then((encoded) => {
        // Store the encoded file data in your JSON
        setmyJSON({
          fileData: encoded,
        });
        const x = {
          fileData: encoded,
        };
        // axios.post('${process.env.REACT_APP_API_KEY}/images',x)
        //   .then(response => console.log(response))
        //     .catch(error => console.log(error));
      })
    );

    setFile([...file, ...filesWithPreview]);
  };
  function encodeFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }
  // Image Upload Process end_

  const handleClose = (index) => {
    const newFiles = [...file];
    newFiles.splice(index, 1);
    setFile(newFiles);
  };

  const handleButtonClick = (i) => {
    i === 0 ? fileInputRef.current.click() : fileInputRef1.current.click();
  };

  const handlePost = () => {
    let data = {
      description,
      files: [...file],
      likes: 0,
      comments: [],
      myJSON: myJSON.fileData,
      userLike: false,
    };

    dispatch(postData(data));
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    if (progressCount < 100) {
      setIsOpen(false);
      setProgressCount(0);
    }
  };

  const onClose = () => {
    setIsOpen(false);
    setProgressCount(0);
    navigate("/feed");
  };

  // Return Statement_
  return (
    <div className={style.main}>
      <div className={style.d1}>
        <div className={style.d2}>
          <HStack marginBottom="2%" marginTop="-2%">
            <Box className={style.s1}>
              <HStack>
                <BiLeftArrowAlt style={{ cursor: "pointer" }} size={28} />{" "}
                <Avatar size="md" style={{ cursor: "pointer" }} src={Image} />
              </HStack>
            </Box>
            <Box>
              <HStack gap={"8%"}>
                <AiOutlineHistory
                  size={30}
                  style={{ cursor: "pointer", fill: "#666666" }}
                />{" "}
                <HiOutlineInboxArrowDown
                  size={30}
                  color="#666666"
                  style={{ cursor: "pointer" }}
                />
                {/* FORM INPUTS_ */}
                <form
                  action="http://localhost:5080/uploads"
                  method="post"
                  enctype="multipart/form-data"
                >
                  <input
                    type="file"
                    name="avatars"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  <input
                    type="file"
                    name="avatars"
                    multiple
                    ref={fileInputRef1}
                    onChange={handleFileChange}
                    accept="video/*"
                    style={{ display: "none" }}
                  />
                  <input
                    type="text"
                    name="avatars"
                    value={description}
                    accept="text/*"
                    style={{ display: "none" }}
                  />
                  {/* <button type="submit" onClick={submitFormToBackend}>Submit</button> */}
                  <Button
                    onClick={handlePost}
                    colorScheme="white"
                    disabled={progressCount < 100}
                    bg={count > 500 || count === 0 ? "#b3b2b0" : "#4b4b4b"}
                    height="fit-content"
                    size="md"
                    spacing="10px"
                    gap="8px"
                    type="submit"
                  >
                    {" "}
                    <BsSend size={30} /> Post
                  </Button>
                </form>
              </HStack>
            </Box>
          </HStack>
          <HStack marginBottom="-5%">
            <BsPlusCircle
              style={{ cursor: "pointer" }}
              size={21}
              color="#666666"
            />{" "}
            <Box p={4} borderBottom="1px" style={{ cursor: "pointer" }}>
              <Text as="b" fontSize="14px">
                English
              </Text>
            </Box>
          </HStack>
        </div>
        <div className={style.d3}>
          {/* TextArea_ */}
          <textarea
            onChange={handleInputChange}
            placeholder="What's on your mind?"
          ></textarea>
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              marginTop: "-2.5%",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "1%",
            }}
          >
            {file.map((filee, index) => (
              <div key={index} style={{ position: "relative" }}>
                {filee.fileData.type.startsWith("image/") ? (
                  <img src={filee.previewUrl} alt="preview" />
                ) : (
                  <video width="400" height="120" controls>
                    <source src={filee.previewUrl} type={filee.fileData.type} />
                  </video>
                )}
                <button
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 3,
                    backgroundColor: "#666666",
                    borderRadius: "50%",
                  }}
                  onClick={() => {
                    handleClose(index);
                  }}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className={style.d4}>
          <HStack>
            <Box className={style.s2}>
              <HStack>
                {" "}
                <button
                  onClick={() => {
                    handleButtonClick(0);
                  }}
                >
                  {" "}
                  <ImImages
                    style={{ cursor: "pointer" }}
                    size={21}
                    color="blue"
                  />{" "}
                </button>{" "}
                <Spacer /> <Spacer />
                <Spacer />
                <Spacer />
                <button
                  onClick={() => {
                    handleButtonClick(1);
                  }}
                >
                  <RxVideo
                    style={{ cursor: "pointer" }}
                    size={21}
                    color="#666666"
                  />{" "}
                </button>
                <Spacer /> <Spacer />
                <Spacer />
                <HiOutlineLink
                  style={{ cursor: "pointer" }}
                  size={21}
                  color="#666666"
                />
                <Spacer /> <Spacer />
                <Spacer />
                <BsBarChart
                  style={{ cursor: "pointer" }}
                  size={21}
                  color="#666666"
                />
              </HStack>
            </Box>
            <Box>
              <HStack className={style.s3}>
                {" "}
                <FiSettings
                  style={{ cursor: "pointer" }}
                  size={21}
                  color="#666666"
                />
                <CircularProgress
                  value={count / 5}
                  color={count > 500 ? "red.500" : "#4b4b4b"}
                  thickness="8px"
                >
                  <CircularProgressLabel>{count}</CircularProgressLabel>
                </CircularProgress>
              </HStack>
            </Box>
          </HStack>
        </div>
        <div>
          {/* <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            multiple
            style={{ display: "none" }}
          /> */}
          {/* <form action="/uploads" method="post" enctype="multipart/form-data">
            <input type="file" name="avatars" multiple ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
            <input type="file" name="avatars" multiple ref={fileInputRef1} onChange={handleFileChange} accept="video/*" />
            <button type="submit" onClick={submitFormToBackend}>Submit</button>
          </form> */}
          {/* <input
            ref={fileInputRef1}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            multiple
            style={{ display: "none" }}
          /> */}
          {/* <form action="/uploads" method="post" enctype="multipart/form-data">
            <input type="file" name="avatars" multiple ref={fileInputRef1} onChange={handleFileChange} accept="video/*" />
            <button type="submit">Submit</button>
          </form> */}
        </div>
      </div>

      <Modal onClose={handleCloseModal} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {progressCount <= 100
              ? "Creating Koo..."
              : "Post successfully updated."}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Progress hasStripe value={progressCount} />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              disabled={progressCount < 100}
              bg={progressCount >= 100 ? "green.500" : "red.500"}
            >
              {progressCount <= 100 ? "WAIT" : "DONE"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Create;
