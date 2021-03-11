class WolrdsRankService {
  _src = "https://restcountries.eu/rest/v2";

  async getData(path = "") {
    const res = await fetch(`${this._src}/${path}`);
    return await res.json();
  }

  async getAllCountries() {
    return await this.getData("all");
  }
}

export default new WolrdsRankService();