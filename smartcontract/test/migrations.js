const { assert } = require("chai");

contract("Migrations", (accounts) => {
  let migrations;
  const owner = accounts[0];
  const otherAccount = accounts[1];

  beforeEach(async () => {
    migrations = await Migrations.new({ from: owner });
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const contractOwner = await migrations.owner();
      assert.equal(contractOwner, owner, "The contract owner should be the deployer");
    });

    it("Should start with last_completed_migration as 0", async function () {
      const lastCompletedMigration = await migrations.last_completed_migration();
      assert.equal(lastCompletedMigration, 0, "The last completed migration should start at 0");
    });
  });

  describe("setCompleted", function () {
    it("Should update last_completed_migration when called by the owner", async function () {
      await migrations.setCompleted(1, { from: owner });
      const lastCompletedMigration = await migrations.last_completed_migration();
      assert.equal(lastCompletedMigration, 1, "The last completed migration should be updated");
    });

    it("Should revert if setCompleted is called by a non-owner", async function () {
      try {
        await migrations.setCompleted(1, { from: otherAccount });
        assert.fail("The transaction should have reverted");
      } catch (error) {
        assert.include(error.message, "This function is restricted to the contract's owner", "Only owner can call setCompleted");
      }
    });
  });
});
