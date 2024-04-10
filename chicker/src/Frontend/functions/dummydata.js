import profile1 from "../Pictures/dummyPictures/profile (1).jpg";
import profile2 from "../Pictures/dummyPictures/profile (2).jpg";
import profile3 from "../Pictures/dummyPictures/profile (3).jpg";
import profile4 from "../Pictures/dummyPictures/profile (4).jpg";
import profile5 from "../Pictures/dummyPictures/profile (5).jpg";

export var userData = [
  {
    _id: "6613961f06197f0460a66274",
    username: "john",
    email: "john@example.com",
    icon_id: profile5,
    bio: "I love 3100",
    is_admin: false,
    date: "2024-04-08T15:00:04.762Z",
    followee: ["66140cc1ee3cc9c12f4f2aae", "661381bdd592d13919c70046"],
    follower: ["66140cc1ee3cc9c12f4f2aae", "66139165f830ad39d8e420a1"],
  },
  {
    _id: "66140cc1ee3cc9c12f4f2aae",
    username: "Yuden",
    email: "yuden@example.com",
    icon_id: profile4,
    bio: "",
    is_admin: true,
    date: "2024-04-08T20:07:27.241Z",
    followee: [],
    follower: [],
  },
  {
    _id: "661381bdd592d13919c70046",
    username: "vt",
    email: "vtis.tsangvincent15@gmail.com",
    icon_id: profile3,
    bio: "I wanna die.",
    is_admin: true,
    date: "2024-04-08T13:33:16.556Z",
    followee: [],
    follower: [],
  },
  {
    _id: "66139165f830ad39d8e420a1",
    username: "jack",
    email: "jack@example.com",
    icon_id: profile2,
    bio: "",
    is_admin: false,
    date: "2024-04-08T14:33:45.943Z",
    followee: [],
    follower: [],
  },
  {
    _id: "66156d02cdec89ffb16576a8",
    username: "JC",
    email: "JC@gmail.com",
    icon_id: profile1,
    bio: "",
    is_admin: false,
    date: "2024-04-10T00:28:40.252Z",
    followee: ["66140cc1ee3cc9c12f4f2aae", "661381bdd592d13919c70046"],
    follower: ["66139165f830ad39d8e420a1"],
  },
];
