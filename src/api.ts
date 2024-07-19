import axios from "axios";

const api = axios.create({
  baseURL: "https://api.rawg.io/api",
  // key: "221443b1e41c4d63ae899493147a8ee0",
});

function setApiKey(key: string) {
  api.defaults.params = {};
  api.defaults.params["key"] = key;
}

setApiKey("invalid");

let count = 0;

class RefreshToken {
  isProcessing: boolean;
  private currentPromise: Promise<string> | null;

  constructor() {
    this.isProcessing = false;
    this.currentPromise = null;
  }

  handleNewToken = async (): Promise<string> => {
    count += 1;

    // If a token is already being processed, wait for it to finish
    if (this.currentPromise) {
      console.log("we are already processing a token:");
      console.log("isProcessing: ", this.isProcessing);
      console.log("count: ", count);
      console.log("-".repeat(20));
      return this.currentPromise;
    }

    // Set the processing flag and create a promise for the token handling process
    this.isProcessing = true;
    this.currentPromise = this._handleNewToken();

    try {
      // Wait for the token handling process to complete
      const result = await this.currentPromise;
      return result;
    } finally {
      // Reset the processing flag and the current promise when done
      this.isProcessing = false;
      this.currentPromise = null;
      count = 0;
    }
  };

  private _handleNewToken = async (): Promise<string> => {
    // Simulate token handling logic and return a token
    return new Promise((resolve) => {
      setTimeout(() => {
        const token = "221443b1e41c4d63ae899493147a8ee0"; // Simulate generating a new token
        console.log("New token processed:", token);
        resolve(token);
      }, 2000); // Simulate async work with a timeout
    });
  };
}

const refreshToken = new RefreshToken();

api.interceptors.response.use(
  async function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      console.log("token expired for url:", error.config.url);
      const newToken = await refreshToken.handleNewToken();
      if (newToken) {
        setApiKey(newToken);
        error.config.params = error.config.params || {};
        error.config.params["key"] = newToken;
        return await api(error.config);
      }
      console.log("newToken: ", newToken);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export { api };
