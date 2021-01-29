import axios from "axios";
import { API } from "./config";

class Api {
  constructor() {
    // TEMPORARY : JUST FOR DEVELOPMENT PURPOSE
    this.token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvdG9AZ21haWwuY29tIiwiaWQiOiI2MDAxYjBiODIwNjNjNTA0Njg0NDg0ZGUiLCJpYXQiOjE2MTE5MjU5NjAsImV4cCI6MTY0MzQ4MzU2MH0.ayF5W0v4qxTKQkX-dO6JDdEHw6ayTMD_oIei0RC0fRc";
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

  // TODO : Uniformize requests url (also on server side)
  getProducts() {
    return this.init().get("/products");
  }
  addProduct(barcode) {
    return this.init().post("/products", { barcode });
  }
  updateProduct(barcode, data) {
    return this.init().put(`/products/${barcode}`, data);
  }
  deleteProduct(barcode) {
    return this.init().delete(`/products/${barcode}`);
  }
}

export default new Api();
