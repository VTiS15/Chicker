import dummy1 from "../Pictures/dummyPictures/dummy (1).png";
import dummy2 from "../Pictures/dummyPictures/dummy (2).png";
import dummy3 from "../Pictures/dummyPictures/dummy (3).png";
import dummy4 from "../Pictures/dummyPictures/dummy (4).png";
import dummy5 from "../Pictures/dummyPictures/dummy (5).png";
import dummy6 from "../Pictures/dummyPictures/dummy (6).png";
import video1 from "../Pictures/dummyPictures/video.mp4";

import profile1 from "../Pictures/dummyPictures/profile (1).jpg";
import profile2 from "../Pictures/dummyPictures/profile (2).jpg";
import profile3 from "../Pictures/dummyPictures/profile (3).jpg";
import profile4 from "../Pictures/dummyPictures/profile (4).jpg";
import profile5 from "../Pictures/dummyPictures/profile (5).jpg";

export const post = [
  {
    postID: 1,
    user: {
      username: "JohnDoe",
      profilePicture: profile1,
    },
    timestamp: "11:12:34 AM",
    text: "This is the first post. Lorem ipsum dolor sit amet, adipiscing elit. In this example, the component maintains a state variable isTextColored using the useState hook. It starts with an initial value of false. The handleButtonClick function is responsible for toggling the value of isTextColored when the button is clicked. It uses the setIsTextColored function to update the state. The button's className is conditionally set based on the value of isTextColored. If isTextColored is true, the button will have the additional class colored. You can define CSS styles for the colored class to change the text color. When the button is clicked, the handleButtonClick function is invoked, triggering the state update and causing a re-render of the component. As a result, the button's text color will toggle based on the value of isTextColored. This is the first post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In this example, the ButtonTextColorToggle component maintains a state variable isTextColored using the useState hook. It starts with an initial value of false. The handleButtonClick function is responsible for toggling the value of isTextColored when the button is clicked. It uses the setIsTextColored function to update the state. The button's className is conditionally set based on the value of isTextColored. If isTextColored is true, the button will have the additional class colored. You can define CSS styles for the colored class to change the text color. When the button is clicked, the handleButtonClick function is invoked, triggering the state update and causing a re-render of the component. As a result, the button's text color will toggle based on the value of isTextColored. This is the first post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In this example, the ButtonTextColorToggle component maintains a state variable isTextColored using the useState hook. It starts with an initial value of false. The handleButtonClick function is responsible for toggling the value of isTextColored when the button is clicked. It uses the setIsTextColored function to update the state. The button's className is conditionally set based on the value of isTextColored. If isTextColored is true, the button will have the additional class colored. You can define CSS styles for the colored class to change the text color. When the button is clicked, the handleButtonClick function is invoked, triggering the state update and causing a re-render of the component. As a result, the button's text color will toggle based on the value of isTextColored. This is the first post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In this example, the ButtonTextColorToggle component maintains a state variable isTextColored using the useState hook. It starts with an initial value of false. The handleButtonClick function is responsible for toggling the value of isTextColored when the button is clicked. It uses the setIsTextColored function to update the state. The button's className is conditionally set based on the value of isTextColored. If isTextColored is true, the button will have the additional class colored. You can define CSS styles for the colored class to change the text color. When the button is clicked, the handleButtonClick function is invoked, triggering the state update and causing a re-render of the component. As a result, the button's text color will toggle based on the value of isTextColored.",
    image: dummy1,
    video: null,
    likes: 1,
    comments: 5,
    commentContent: [
      { image: profile1, commenter: "John", comment: "On 1st post" },
      {
        image: profile2,
        commenter: "Jack",
        comment:
          "1st post. post. dolor sit amet, adipiscing elit. In this example, the component maintains a state variable. Lorem ipsum dolor sit amet, adipiscing elit. In this example, the component maintains a state variable.",
      },
      { image: profile3, commenter: "Jason", comment: "1st post, fantastic" },
      { image: profile3, commenter: "Jason", comment: "1st post, fantastic" },
      { image: profile3, commenter: "Jason", comment: "1st post, fantastic" },
      { image: profile3, commenter: "Jason", comment: "1st post, fantastic" },
      { image: profile3, commenter: "Jason", comment: "1st post, fantastic" },
      { image: profile3, commenter: "Jason", comment: "1st post, fantastic" },
      { image: profile3, commenter: "Jason", comment: "1st post, fantastic" },
      { image: profile3, commenter: "Jason", comment: "1st post, fantastic" },
    ],
    shares: 3,
  },
  {
    postID: 2,
    user: {
      username: "JaneSmith",
      profilePicture: profile2,
    },
    timestamp: "1 day ago",
    text: "Check out this beautiful view!",
    image: null,
    video: video1,
    likes: 3,
    comments: 2,
    commentContent: [
      {
        image: profile1,
        commenter: "John",
        comment:
          "2nd post, Lorem ipsum dolor sit amet, adipiscing elit. In this example, the component maintains a state variable. Lorem ipsum dolor sit amet, adipiscing elit. In this example, the component maintains a state variable.",
      },
      { image: profile2, commenter: "Jack", comment: "2nd post, Nice" },
    ],
    shares: 1,
  },
  {
    postID: 3,
    user: {
      username: "MikeJohnson",
      profilePicture: profile3,
    },
    timestamp: "3 days ago",
    text: "Just had an amazing meal at the new restaurant!",
    image: null,
    video: null,
    likes: 2,
    comments: 8,
    commentContent: [
      {
        image: profile1,
        commenter: "John",
        comment:
          "3rd post, Lorem ipsum dolor sit amet, adipiscing elit. In this example, the component maintains a state variable. Lorem ipsum dolor sit amet, adipiscing elit. In this example, the component maintains a state variable.",
      },
      { image: profile2, commenter: "Jack", comment: "3d post, Nice" },
      { image: profile3, commenter: "John", comment: "3rd post, Nice" },
      { image: profile4, commenter: "Jack", comment: "3rd post, Nice" },
      { image: profile2, commenter: "Jack", comment: "3d post, Nice" },
      { image: profile3, commenter: "John", comment: "3rd post, Nice" },
      { image: profile4, commenter: "Jack", comment: "3rd post, Nice" },
      { image: profile2, commenter: "Jack", comment: "3d post, Nice" },
      { image: profile3, commenter: "John", comment: "3rd post, Nice" },
      { image: profile4, commenter: "Jack", comment: "3rd post, Nice" },
      { image: profile2, commenter: "Jack", comment: "3d post, Nice" },
      { image: profile3, commenter: "John", comment: "3rd post, Nice" },
      { image: profile4, commenter: "Jack", comment: "3rd post, Nice" },
      { image: profile2, commenter: "Jack", comment: "3d post, Nice" },
      { image: profile3, commenter: "John", comment: "3rd post, Nice" },
      { image: profile4, commenter: "Jack", comment: "3rd post, Nice" },
      { image: profile2, commenter: "Jack", comment: "3d post, Nice" },
      { image: profile3, commenter: "John", comment: "3rd post, Nice" },
      { image: profile4, commenter: "Jack", comment: "3rd post, Nice" },
      { image: profile2, commenter: "Jack", comment: "3d post, Nice" },
      { image: profile3, commenter: "John", comment: "3rd post, Nice" },
      { image: profile4, commenter: "Jack", comment: "3rd post, Nice" },
      { image: profile2, commenter: "Jack", comment: "3d post, Nice" },
      { image: profile3, commenter: "John", comment: "3rd post, Nice" },
      { image: profile4, commenter: "Jack", comment: "3rd post, Nice" },
      { image: profile2, commenter: "Jack", comment: "3d post, Nice" },
      { image: profile3, commenter: "John", comment: "3rd post, Nice" },
      { image: profile4, commenter: "Jack", comment: "3rd post, Nice" },
      { image: profile2, commenter: "Jack", comment: "3d post, Nice" },
      { image: profile3, commenter: "John", comment: "3rd post, Nice" },
      { image: profile4, commenter: "Jack", comment: "3rd post, Nice" },
    ],
    shares: 2,
  },
  {
    postID: 4,
    user: {
      username: "Johnny",
      profilePicture: profile4,
    },
    timestamp: "4 day ago",
    text: "Check out this beautiful view!",
    image: dummy4,
    video: null,
    likes: 4,
    comments: 2,
    commentContent: [],
    shares: 1,
  },
  {
    postID: 5,
    user: {
      username: "JamesMcGill",
      profilePicture: profile5,
    },
    timestamp: "8 day ago",
    text: "Check out this beautiful view!",
    image: dummy5,
    video: null,
    likes: 2,
    comments: 2,
    commentContent: [
      { image: profile1, commenter: "Jack", comment: "5th post, Nice" },
    ],
    shares: 1,
  },
];
