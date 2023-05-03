import axios from "axios";
import { GET_POST_DATA } from "./actionType";

const userID = "";
const backendURL = `http://localhost:5080/post/${userID}`;

// let getData1 = () => {
//   return (dispatch) => {
//     axios.get(`${process.env.REACT_APP_API_KEY}/userposts`).then((res) => {
//       return dispatch(redData(res.data));
//     });
//   };
// };

let getData1 = () => {
  return (dispatch) => {
    axios.get(backendURL).then((res) => {
      return dispatch(redData(res.data));
    });
  };
};

let redData = (data) => {
  return {
    type: GET_POST_DATA,
    payload: data,
  };
};

let postData = (data) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/userposts`, {
        data,
      })
      .then((res) => {
        return dispatch(getData1());
      });
  };
};

// ---------Backend-[/create/id-route]---------------

// let postData = (data) => {
//   return (dispatch) => {
//     axios
//       .post(`${process.env.REACT_APP_API_KEY}/create/:id`, {
//         data,
//       })
//       .then((res) => {
//         return dispatch(getData1());
//       });
//   };
// };

const putData1 = (send, id1) => {
  console.log(send, id1, "in actionnn");
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_KEY}/userposts/${id1}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(send),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data, "Data updated successfully on server.");
        return dispatch(getData1());
      })
      .catch((error) => {
        console.error("Error updating data on server:", error);
      });
  };
};

export { getData1, redData, postData, putData1 };
