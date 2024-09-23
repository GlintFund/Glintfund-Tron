// Import the axios library to make HTTP requests (you can also use fetch)

// Function to get the price of a token
export async function getTokenPrice(tokenId: any) {
  try {
    // console.log("was called");
    // Make a GET request to the CoinGecko API
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`
    );

    // Parse the JSON data from the response
    const data = await response.json();

    // Extract the price from the parsed data
    const price: number = data[tokenId].usd;
    // console.log(data);

    console.log(`The current price of ${tokenId} is $${price}`);
    return price;
  } catch (error) {
    console.error("Error fetching token price:", error);
    return 0;
  }
}

//returns in dollars
export async function getTokenConversion(zeta: number) {
  if (zeta === 0) return 0;
  var ans = zeta / (await getTokenPrice("zetachain"));
  console.log("converstion", ans);
  return ans;
}
