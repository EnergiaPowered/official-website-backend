const configs = {
  API_BASE_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/api/"
      : "https://energia21.herokuapp.com/api/",
  HOST:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/"
      : "https://energia21.herokuapp.com/",
};

export default configs;
