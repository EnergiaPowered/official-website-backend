import { lazy } from "react";
import authHeader from "./auth-header";

const Home = lazy(() => import("modules/Home"));
const PartnersPage = lazy(() =>
  import("modules/Partners/components/PartnersPage")
);
const SingleCommittee = lazy(() =>
  import("modules/Committees/components/SingleCommitteePage")
);
const AboutPage = lazy(() => import("modules/About/components/page"));
const BlogsPage = lazy(() => import("./../modules/Blogs"));
const Events = lazy(() => import("modules/Events"));
const Crew = lazy(() => import("modules/Crew/Crew"));
const Contacts = lazy(() => import("modules/Contact"));
const RegistrationPage = lazy(() => import("modules/Register"));
const LoginPage = lazy(() => import("modules/Login"));
const Verified = lazy(() => import("modules/Verified"));
const RecruitmentForm = lazy(() => import("modules/RecruitmentForm"));
const EventDetails = lazy(() =>
  import("modules/Events/components/EventDetails")
);
const FormApp = lazy(() => import("modules/Forms/components/FormApp"));
const Workshops = lazy(() => import("./../modules/Workshops"));
const Gates = lazy(() => import("modules/Gates"));
const ForgetPassword = lazy(() => import("modules/ForgetPassword"));
const ResetPassword = lazy(() => import("modules/ResetPassword"));
const SingleBlog = lazy(() => import("modules/Blogs/components/SingleBlog"));
const Profile = lazy(() => import("modules/Profile"));

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
    path: "/sponsors",
    component: PartnersPage,
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
    path: "/events/gates",
    component: Gates,
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
  {
    path: "/blogs/:id",
    component: SingleBlog,
    inNavbar: {
      shown: false,
      label: "",
    },
  },
  {
    path: "/profile/:id",
    component: Profile,
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
