import axios from "axios";
import { API } from "./config";
import store from "./../features/store";
import { selectAuthToken } from "../features/auth/authSelector";

class Api {
  constructor() {
    this.token = null;
  }

  init(isTokenNeeded = true) {
    let headers = {
      Accept: "application/json",
    };
    //TODO : Add Bearer
    if (this.token && isTokenNeeded) {
      headers.Authorization = `${this.token}`;
    }

    const client = axios.create({
      baseURL: API.ENDPOINT,
      headers: headers,
    });

    return client;
  }
  login(data) {
    return this.init(false).post("/auth/login", data);
  }
  register(data) {
    return this.init(false).post("/auth/register", data);
  }
  getProducts() {
    return this.init().get("/products");
  }
  addProduct(barcode) {
    return this.init().post(`/products/${barcode}`);
  }
  updateProduct(barcode, data) {
    return this.init().put(`/products/${barcode}`, data);
  }
  deleteProduct(barcode) {
    return this.init().delete(`/products/${barcode}`);
  }
}

const api = new Api();

store.subscribe(() => {
  api.token = selectAuthToken(store.getState());
});

export default api;
