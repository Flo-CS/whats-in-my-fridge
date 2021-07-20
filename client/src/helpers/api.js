import axios from "axios";

class Api {
    init() {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        return axios.create({
            baseURL: process.env.REACT_APP_ENVIRONMENT === "PRODUCTION" ? process.env.REACT_APP_API_URL : "/api",
            headers: headers,
            withCredentials: true
        });
    }

    login(data) {
        return this.init().post("/auth/login", data);
    }

    register(data) {
        return this.init().post("/auth/register", data);
    }

    checkToken() {
        return this.init().post("/auth/checkToken");
    }

    logout() {
        return this.init().post("/auth/logout");
    }

    getProducts() {
        return this.init().get("/products");
    }

    getProduct(barcode) {
        return this.init().get(`/products/${barcode}`);
    }

    addProduct(barcode) {
        return this.init().post(`/products/${barcode}`);
    }

    updateProductQuantity(barcode, quantity) {
        return this.init().put(`/products/quantity/${barcode}`, {quantity});
    }

    deleteProduct(barcode) {
        return this.init().delete(`/products/${barcode}`);
    }

    getProductsStats(startDate, endDate, timeUnit) {
        return this.init().get(`/products/stats?startDate=${startDate}&endDate=${endDate}&timeUnit=${timeUnit}`);
    }
}

const api = new Api();


export default api;
