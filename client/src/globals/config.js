const configs = {
  API_BASE_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/api/"
      : "https://handsome-worm-woolens.cyclic.app",
  HOST:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/"
      : "https://handsome-worm-woolens.cyclic.app",
};

export default configs;
