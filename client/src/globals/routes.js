import Home from "modules/Home";
import SingleCommittee from "modules/Committees/components/SingleCommitteePage";
import AboutPage from "modules/About/components/page";
import BlogsPage from "./../modules/Blogs";
import Events from "modules/Events";
import Crew from "modules/Crew/Crew";
import Contacts from "modules/Contact";
import RegisterationPage from "modules/Register";
import LoginPage from "modules/Login";
import Verfied from "modules/Verfied";
import RecruitmentForm from "modules/RecruitmentForm";
import EventDetails from "modules/Events/components/EventDetails";
import authHeader from "./auth-header";
import FormGen from "modules/Forms/components/FormGen";
import FormApp from "modules/Forms/components/FormApp";
import Workshops from "./../modules/Workshops/index";
import ForgetPassword from "modules/ForgotPassword";
import ResetPassword from "modules/ResetPassword";

export default [
  {
    path: "/",
    component: Home,
    inNavbar: {
      shown: false,
      label: "",
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
      shown: true,
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
    path: "/crew",
    component: Crew,
    inNavbar: {
      shown: false,
      label: "Crew"
    }
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
    path: "/verfied",
    component: Verfied,
    inNavbar: {
      shown: false,
      label: "",
    },
  },
  {
    path: "/form/creation",
    component: FormGen,
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
    component: RegisterationPage,
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
