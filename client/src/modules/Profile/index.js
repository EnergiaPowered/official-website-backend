import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Layout from "shared/Layout";
import ProfileContent from "./Components/Content";
import IdentityCard from "./Components/IdentityCard";
import img from "assets/placeholder.png";
import "./style.css";

const Profile = (props) => {
  //const id = props.match.params.id;
  const [User, setUser] = useState({});

  const user = {
    name: "Mahmoud Hafez",
    bio: "قصة قصيرة حزينة ☺",
    email: "quadm@gmail.com",
    univ: "Ainshams",
    faculty: "Engineering",
    department: "Data Science",
    committee: "Web Development",
    role: "Frontend Member",
    events: [
      {
        title: "Going to hell",
        img: { img },
        description: "Simply going to hell",
        redirectLink: "#",
      },
      {
        title: "Going beneath hell",
        img: { img },
        description: "Simply going beneath hell",
        redirectLink: "#",
      },
      {
        title: "back from hell",
        img: { img },
        description: "Simply coming back from hell",
        redirectLink: "#",
      },
      {
        title: "Going back to hell",
        img: { img },
        description: "Simply going back to hell",
        redirectLink: "#",
      },
    ],
    tasks: [
      {
        title: "Going to hell",
        description: "Simply going to hell",
        redirectLink: "#",
      },
      {
        title: "Going beneath hell",
        description: "Simply going beneath hell",
        redirectLink: "#",
      },
      {
        title: "back from hell",
        description: "Simply coming back from hell",
        redirectLink: "#",
      },
      {
        title: "Going back to hell",
        description: "Simply going back to hell",
        redirectLink: "#",
      },
    ],
  };
  const {
    name,
    bio,
    email,
    univ,
    faculty,
    department,
    events,
    tasks,
    committee,
    role,
  } = user;
  useEffect(() => {
    axios
      .get("./fakeusers.service.json")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Layout>
        <div className="container-fluid profile-container">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-3">
              <IdentityCard
                name={name}
                bio={bio}
                email={email}
                univ={univ}
                faculty={faculty}
                department={department}
              />
            </div>
            <div className=" col-7">
              <ProfileContent
                events={events}
                tasks={tasks}
                committee={committee}
                role={role}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
