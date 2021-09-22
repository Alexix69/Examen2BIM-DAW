import api from "./index";

const Advice = {
  random: () => {
    return api.get("/advice");
  },

  search: (data) => {
    return api.get(`/advice/search/${data}`);
  },
};

export default Advice;
