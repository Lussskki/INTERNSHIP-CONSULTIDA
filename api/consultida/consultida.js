import consultida from "./clients/consultida";
const axios = require("axios");
export default class Etsi {
  clientIp = null;

  async getUser() {
    return consultida.get(`/me`, {}, {}, { withToken: true });
  }

  async logout() {
    return consultida.post(`/logout`, {}, {}, { withToken: true });
  }

  async headersPhp() {
    const data = await axios.get(
      "https://dev-dashboard.consultida.com/header.php",
      {
        headers: {
          "x-real-ip": this.clientIp,
          "X-Real-IP": this.clientIp,
          "Custom-Header": this.clientIp,
        },
      }
    );
  }

  async getNewConsultants({ region, filters }) {
    return consultida.get(
      `/consultants`,
      { sort: "created_at", ...filters },
      {},
      { withToken: true, region }
    );
  }

  async getConsultants({ region, filters }) {
    return consultida.get(
      `/consultants`,
      filters,
      {},
      { withToken: true, region }
    );
  }

  async getConsultant(id) {
    return consultida.get(`/consultants/${id}`, {}, {}, { withToken: true });
  }
  async getCategories() {
    return consultida.get(`/categories`, {}, {}, { withToken: true });
  }

  async updateProfile(data) {
    return consultida.put(`/me/update`, {}, data, { withToken: true });
  }

  async getConsultations(id) {
    return consultida.get(`/consultations/${id}`, {}, {}, { withToken: true });
  }

  async rateAppointment(id, rate) {
    return consultida.post(
      `/appointments/${id}/rate`,
      { rate: rate },
      {},
      { withToken: true }
    );
  }

  async rateWebinars(id, rate) {
    return consultida.post(
      `/registered-webinars/${id}/rate`,
      { rate: rate },
      {},
      { withToken: true }
    );
  }

  async createAppointment(data) {
    return consultida.post(`/order/appointment/create`, {}, data, {
      withToken: true,
    });
  }

  async captureAppointment(data) {
    return consultida.post(`/order/appointment/capture`, {}, data, {
      withToken: true,
    });
  }

  async getAppointments() {
    return consultida.get(`/appointments`, {}, {}, { withToken: true });
  }

  async getRegisteredWebinars() {
    return consultida.get(`/registered-webinars`, {}, {}, { withToken: true });
  }

  async getCurrencies() {
    return consultida.get(`/currencies`, {}, {}, { withToken: true });
  }

  async createWebinar(data) {
    return consultida.post(`/order/webinar/create`, {}, data, {
      withToken: true,
    });
  }

  async captureWebinar(data) {
    return consultida.post(`/order/webinar/capture`, {}, data, {
      withToken: true,
    });
  }

  async createDispute(text, id) {
    return consultida.post(
      `/disputes/${id}/create`,
      {},
      { text },
      { withToken: true }
    );
  }

  async getDisputes() {
    return consultida.get(`/disputes`, {}, {}, { withToken: true });
  }

  async getWebinars() {
    return consultida.get(`/webinars`, {}, {}, { withToken: true });
  }

  async getSliders({ region }) {
    return consultida.get(
      `/sliders`,
      {},
      {},
      { withToken: true, region, clientIp: this.clientIp }
    );
  }
  async getPages({ region }) {
    return consultida.get(
      `/pages`,
      {},
      {},
      { region, clientIp: this.clientIp }
    );
  }
  async getPolicies(id) {
    return consultida.get(`/policies/${id}`, {}, { withToken: true });
  }
  async getTimezones() {
    return consultida.get(`/timezones`, {}, {}, { withToken: true });
  }
  async getWebinar(id) {
    return consultida.get(`/webinars/${id}`, {}, {}, { withToken: true });
  }
  async getFee() {
    return consultida.get(`/fee`, {}, {}, { withToken: true });
  }
  async getTopRatedConsultants({ region }) {
    return consultida.get(
      `/consultants`,
      { sort: "rate" },
      {},
      { withToken: true, region, clientIp: this.clientIp }
    );
  }
  async getNewWebinars({ region, perPage }) {
    return consultida.get(
      `/webinars`,
      { sort: "created_at", per_page: perPage },
      {},
      { withToken: true, region, clientIp: this.clientIp }
    );
  }
  async getConsultantNewWebinars(id, { region }) {
    return consultida.get(
      `/webinars`,
      { sort: "created_at", consultant_id: id },
      {},
      { withToken: true, region, clientIp: this.clientIp }
    );
  }
  async about() {
    return consultida.get(`/about`, {}, { withToken: true });
  }
  async contact() {
    return consultida.get(`/contact`, {}, { withToken: true });
  }

  async getCountries() {
    return consultida.get(`/countries`, {}, { withToken: true });
  }
  async intent(currency, serviceId, amount) {
    return consultida.post(
      `/order/stripe/intent`,
      {},
      { items: [{ id: serviceId, currency_id: currency, amount }] },
      { withToken: true }
    );
  }
}
