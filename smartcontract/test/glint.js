const Glint = artifacts.require("Glint");
const {TronWeb} = require("tronweb");

contract("Glint", (accounts) => {
  let glintInstance;
  const [admin, user1] = accounts;

  before(async () => {
    // Deploy the contract
    glintInstance = await Glint.new();
  });

  describe("Deployment", () => {
    it("should deploy the contract and initialize campaignCounter", async () => {
      const campaignCounter = await glintInstance.campaignCounter();
      assert.equal(campaignCounter.toNumber(), 0, "Initial campaign counter is not 0");
    });
  });

  describe("Creating Campaign", () => {
    it("should allow a user to create a new campaign", async () => {
      const campaignTitle = "Gimme my money";
      const campaignDescription = "This is a description for my campaign";
      const campaignAmountRequired = 1000;
      const campaignTags = ["education", "charity", "cruise"];
      const endTime = Math.floor(Date.now() / 1000) + 86400; // 24 hours from now
      const refundable = false;
      const donationType = "casual";

      // Call the `create` function
      const receipt = await glintInstance.create(
        campaignTitle,
        campaignDescription,
        campaignAmountRequired,
        campaignTags,
        endTime,
        refundable,
        donationType,
        { from: admin }
      );

      console.log("receipt", receipt);

      // Verify the campaignCounter was incremented
      const campaignCounter = await glintInstance.campaignCounter();
      assert.equal(campaignCounter.toNumber(), 1, "Campaign counter should be 1 after creation");

      // Verify that the campaign was stored correctly
      const campaign = await glintInstance.campaigns(1);
      assert.equal(campaign.title, campaignTitle, "Campaign title mismatch");
      assert.equal(campaign.description, campaignDescription, "Campaign description mismatch");
      assert.equal(campaign.amount_required.toNumber(), campaignAmountRequired, "Campaign amount mismatch");
      assert.equal(campaign.endTime.toNumber(), endTime, "Campaign end time mismatch");
      assert.equal(campaign.refundable, refundable, "Campaign refundable status mismatch");

      // Check if logs exist before asserting them
      // assert.isTrue(receipt.logs.length > 0, "An event should have been emitted");
      
      // Check if the event logs exist
  // assert(receipt.logs, "No event logs found in the transaction receipt");
  // assert(receipt.logs.length > 0, "No events were emitted");

      // Verify event was emitted
      // const event = receipt.logs[0].event;
      // assert.equal(event, "Launch", "Launch event should have been emitted");
    });
  });

  describe("Campaign Details", () => {
    it("should return the correct campaign details", async () => {
      const campaign = await glintInstance.campaigns(1);

      console.log("Campaign", campaign);

      const campaignAdminHex = campaign.admin; // Get the address in hex format
      console.log("This si the admin: ", campaignAdminHex);

      const campaignAdminBase58 = TronWeb.address.fromHex(campaignAdminHex); // Convert to Base58

      assert.equal(campaign.id.toNumber(), 1, "Campaign ID should be 1");
      assert.equal(campaignAdminBase58, admin, "Campaign admin should be the correct address");
    });
  });

  describe("Get All Campaigns", () => {
    it("should return all created campaigns", async () => {
      // Create another campaign
      const campaignTitle = "Campaign 2";
      const campaignDescription = "This is a description for campaign 2";
      const campaignAmountRequired = 2000;
      const campaignTags = ["health", "charity"];
      const endTime = Math.floor(Date.now() / 1000) + 86400; // 24 hours from now
      const refundable = false;
      const donationType = "recurring";

      await glintInstance.create(
        campaignTitle,
        campaignDescription,
        campaignAmountRequired,
        campaignTags,
        endTime,
        refundable,
        donationType,
        { from: user1 }
      );

      // Get all campaigns
      const allCampaigns = await glintInstance.getAllCampaigns();

      console.log("All campaigns Are: ", allCampaigns);

      // // Check if two campaigns are returned
      // assert.equal(allCampaigns.length, 2, "All campaigns were not returned correctly");

      // // Verify details of the first campaign
      // assert.equal(allCampaigns[0].title, "Gimme my money", "Campaign 1 title mismatch");
      // assert.equal(allCampaigns[0].admin, admin, "Campaign 1 admin mismatch");

      // // Verify details of the second campaign
      // assert.equal(allCampaigns[1].title, "Campaign 2", "Campaign 2 title mismatch");
      // assert.equal(allCampaigns[1].admin, user1, "Campaign 2 admin mismatch");
    });

  });

  // it("should return all campaigns with the correct data", async () => {
  //   const campaignTitle = "Campaign 2";
  //     const campaignDescription = "This is a description for campaign 2";
  //     const campaignAmountRequired = 2000;
  //     const campaignTags = ["health", "charity"];
  //     const endTime = Math.floor(Date.now() / 1000) + 86400; // 24 hours from now
  //     const refundable = false;
  //     const donationType = "recurring";

  
  //     await glintInstance.create(
  //       campaignTitle,
  //       campaignDescription,
  //       campaignAmountRequired,
  //       campaignTags,
  //       endTime,
  //       refundable,
  //       donationType,
  //       { from: user2 }
  //     );
  
  //   const allCampaigns = await glintInstance.getAllCampaigns1();

  //   console.log("All campaigns 3 Are: ", allCampaigns);
    
  //   assert.equal(allCampaigns.length, 1, "There should be one campaign");
  
  //   const campaign = allCampaigns[0];
  
  //   assert.equal(campaign.title, title, "Campaign title should match");
  //   assert.equal(campaign.description, description, "Campaign description should match");
  //   assert.equal(campaign.amount_required.toString(), amountRequired.toString(), "Required amount should match");
  //   assert.equal(campaign.tags[0], "education", "First tag should be education");
  // });

  describe("Get Specific Campaign", () => {
    it("should return the correct campaign details for a given campaign ID", async () => {
      const campaignId = 1; // Assuming the first campaign was created
      const campaign = await glintInstance.getCampaign(campaignId);

      assert.equal(campaign.id.toNumber(), campaignId, "Campaign ID mismatch");
      assert.equal(campaign.title, "Gimme my money", "Campaign title mismatch");
      assert.equal(campaign.description, "This is a description for my campaign", "Campaign description mismatch");

      // Check if the TronWeb is properly initialized and used
      const campaignAdminHex = campaign.admin; // Get the address in hex format
      const campaignAdminBase58 = TronWeb.address.fromHex(campaignAdminHex); // Convert to Base58

      assert.equal(campaignAdminBase58, admin, "Campaign admin should be the correct address");
    });

    it("should revert if the campaign ID does not exist", async () => {
      const invalidCampaignId = 999; // A non-existent campaign ID
      try {
        await glintInstance.getCampaign(invalidCampaignId);
        assert.fail("Expected revert not received");
      } catch (error) {
        assert(
          error.message.includes("Campaign does not exist"),
          `Unexpected error message: ${error.message}`
        );
      }
    });
  });

});
