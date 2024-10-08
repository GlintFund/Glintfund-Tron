const contractAddress = "TUZarbS8ZyB1uoyJ78YxzqBUJxDbedCxs5";

const utils = {
  tronWeb: false,
  contract: false,

  async setTronWeb(tronWeb) {
    this.tronWeb = tronWeb;
    this.contract = await tronWeb.contract().at(contractAddress);
  },
};

export default utils;
