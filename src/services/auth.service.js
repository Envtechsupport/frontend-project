import axios from "axios";

class AuthService {
  constructor() {
    this.url = "/api";
  }

  getToken = async (credentials) => {
    try {
      const reqUrl = this.url + "/login/auth";
      const response = await axios.post(reqUrl, credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };
}

export default new AuthService();
