import TronWeb from "tronweb";

const waitTron = () => {
  return new Promise((resolve, reject) => {
    let attempts = 0,
      maxAttempts = 100;
    const checkTron = () => {
      console.log("Checking for TronLink...", window.tronWeb);
      if (window.tronWeb && window.tronWeb.ready) {
        console.log("TronLink detected and ready");
        resolve(true);
        return;
      }
      attempts++;
      if (attempts >= maxAttempts) {
        reject(false);
        return;
      }
      setTimeout(checkTron, 100);
    };
    checkTron();
  });
};

const loadWallet = () => {
  if (window.tronWeb && window.tronWeb.ready) {
    console.log("TronLink is connected");
    const userAddress = window.tronWeb.defaultAddress.base58;
    console.log("Connected wallet address:", userAddress);
  } else {
    console.log("TronLink is not installed or not ready");
  }
};

export const initContract = async () => {
  try {
    await waitTron();
    const tronWeb = window.tronWeb; // Use the injected instance
    const contractHEXAddress = "41babe7050d3593a9ece4b00b4a8157f0983b3d929";
    const contract = await tronWeb.contract().at(contractHEXAddress);
    console.log("Contract loaded:", contract);
    return contract;
  } catch (error) {
    alert("Please login into TronLink extension");
    return null;
  }
};
