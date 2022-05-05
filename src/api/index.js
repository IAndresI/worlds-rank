class WolrdsRankService {
  _src = "https://restcountries.com/v3.1/";

  async getData(path = "") {
    const res = await fetch(`${this._src}/${path}`);
    return await res.json();
  }

  async getAllCountries() {
    return await this.getData("all");
  }

  async getCountry(id) {
    return await this.getData(`alpha/${id}`);
  }
}

export default new WolrdsRankService();