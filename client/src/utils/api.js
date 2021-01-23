import axios from "axios";
import { API } from "./config";

export default class Api {
  constructor() {
    // TEMPORARY : JUST FOR DEVELOPMENT PURPOSE
    this.token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvdG9AZ21haWwuY29tIiwiaWQiOiI2MDAxYjBiODIwNjNjNTA0Njg0NDg0ZGUiLCJpYXQiOjE2MTE0MDQ1MTgsImV4cCI6MTYxMTQ0MDUxOH0.LXZKRj53mZWkfnbXF8Ha0UB4rmsHYUKMIp6zx-mx7w0";
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

  // TODO : Uniformize requests url
  getProducts() {
    return this.init().get("/products");
  }
  addProduct(data) {
    return this.init().post("/products", data);
  }
  updateProduct(data, barcode) {
    return this.init().put(`/products/${barcode}`, data);
  }
  deleteProduct(barcode) {
    return this.init().delete(`/products/${barcode}`);
  }
}
