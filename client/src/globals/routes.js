import Home from "modules/Home";
import SingleCommittee from "modules/Committees/components/SingleCommitteePage";
import AboutPage from "modules/About/components/page";
import BlogsPage from "./../modules/Blogs";
import Events from "modules/Events";
import Crew from "modules/Crew/Crew";
import Contacts from "modules/Contact";
import RegistrationPage from "modules/Register";
import LoginPage from "modules/Login";
import Verified from "modules/Verified";
import RecruitmentForm from "modules/RecruitmentForm";
import EventDetails from "modules/Events/components/EventDetails";
import authHeader from "./auth-header";
import FormApp from "modules/Forms/components/FormApp";
import Workshops from "./../modules/Workshops/index";
import Competition from "modules/Competition";
import ForgetPassword from "modules/ForgetPassword";
import ResetPassword from "modules/ResetPassword";

export default [
  {
    path: "/",
    component: Home,
    inNavbar: {
      shown: true,
      label: "Home",
    },
  },
  {
    path: "/about-us",
    component: AboutPage,
    inNavbar: {
      shown: true,
      label: "About",
    },
  },
  {
    path: "/blogs",
    component: BlogsPage,
    inNavbar: {
      shown: true,
      label: "Blogs",
    },
  },
  {
    path: "/workshops/details",
    component: Workshops,
    inNavbar: {
      shown: false,
      label: "Workshops",
    },
  },
  {
    path: "/committee/:id",
    component: SingleCommittee,
    inNavbar: {
      shown: false,
      label: "", // generated dynamically
    },
  },
  {
    path: "/events",
    component: Events,
    inNavbar: {
      shown: true,
      label: "Events",
    },
  },
  {
    path: "/events/embedded-systems-competition",
    component: Competition,
    inNavbar: {
      shown: false,
      label: "",
    },
  },
  {
    path: "/crew",
    component: Crew,
    inNavbar: {
      shown: false,
      label: "Crew",
    },
  },
  {
    path: "/events/:id/:name",
    component: EventDetails,
    inNavbar: {
      shown: false,
      label: "",
    },
  },
  {
    path: "/events/recruitment",
    component: RecruitmentForm,
    inNavbar: {
      shown: false,
      label: "",
    },
  },
  {
    path: "/contact-us",
    component: Contacts,
    inNavbar: {
      shown: true,
      label: "Contact us",
    },
  },
  {
    path: "/verified",
    component: Verified,
    inNavbar: {
      shown: false,
      label: "",
    },
  },
  {
    path: "/form/application/:title",
    component: FormApp,
    inNavbar: {
      shown: false,
      label: "",
    },
  },
  {
    path: "/forget-password",
    component: ForgetPassword,
    inNavbar: {
      shown: false,
      label: "",
    },
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    inNavbar: {
      shown: false,
      label: "",
    },
  },
  //make sure that signup and login be the last two here
  {
    path: "/signup",
    component: RegistrationPage,
    inNavbar: {
      shown: Object.keys(authHeader()).length ? true : false,
      label: "Sign Up",
    },
  },
  {
    path: "/login",
    component: LoginPage,
    inNavbar: {
      shown: Object.keys(authHeader()).length ? true : false,
      label: "Log In",
    },
  },
];
