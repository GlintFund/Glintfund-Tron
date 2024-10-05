// const waitTron = () => {
//   return new Promise((resolve, reject) => {
//     let attempts = 0,
//       maxAttempts = 2;
//     const checkTron = async () => {
//       console.log("Checking for TronLink...", window.tronWeb.ready);

//       if (window.tronWeb && window.tronWeb.ready) {
//         console.log("TronLink detected and ready");
//         resolve(true);
//         return;
//       }
//       attempts++;
//       if (attempts >= maxAttempts && window.tronLink) {
//            // Prompt the user to connect their wallet
//            try {
//             await window.tronLink.request({ method: 'tron_requestAccounts' });
//             const userAddress = window.tronWeb.defaultAddress.base58;
//             console.log('Wallet connected: ' + userAddress);
//             alert('Wallet connected: ' + userAddress);
//         } catch (error) {
//             console.error('Failed to connect wallet:', error);
//             alert('Connection failed: ' + error.message);
//         }

//         reject(true);
//         return;
//       }
//       setTimeout(checkTron, 100);
//     };
//     checkTron();
//   });
// };

async function getTronWeb() {
  let tronWeb;
  console.log(window.tronWeb)
  if (window.tronLink.ready) {
    tronWeb = tronLink.tronWeb;
  } else {
    const res = await tronLink.request({ method: 'tron_requestAccounts' });
    if (res.code === 200) {
      tronWeb = tronLink.tronWeb;
    }
  }
  return tronWeb;
}

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
    await getTronWeb();
    const tronWeb = window.tronWeb; // Use the injected instance
    const contractHEXAddress = "TUZarbS8ZyB1uoyJ78YxzqBUJxDbedCxs5";
    const contract = await tronWeb.contract().at(contractHEXAddress);
    console.log("Contract loaded:", contract);
    return contract;
  } catch (error) {
    console.log("error",error)
    console.log("Please login into TronLink extension");
    return null;
  }
};

function isTronLinkInstalled() {
  return typeof window.tronWeb !== 'undefined';
}


