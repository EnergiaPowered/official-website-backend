const configs = {
  HOST:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/api/"
      : "https://energia21.herokuapp.com/api/",
};

export default configs;
