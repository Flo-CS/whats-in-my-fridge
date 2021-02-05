import axios from "axios";
import { API } from "./config";

class Api {
  constructor() {
    // TEMPORARY : JUST FOR DEVELOPMENT PURPOSE
    this.token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvdG9AZ21haWwuY29tIiwiaWQiOiI2MDFkNTdhNjAxNWM2NjNhODgxMWYxMmIiLCJpYXQiOjE2MTI1MzU4NTUsImV4cCI6MTY0NDA5MzQ1NX0.6pNP2uaZxGfmVp_bqtiGSSrVyJwND9Dbcq75uGmYQmA";
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

export default new Api();
