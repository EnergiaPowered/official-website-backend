const configs = {
  API_BASE_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/api/"
      : "https://ep-api.onrender.com/api/",
  HOST:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/"
      : "https://ep-api.onrender.com/",
};

export default configs;
