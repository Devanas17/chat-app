const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("ChatApp", () => {
  let chatApp;
  let user1, user2, user3;
  beforeEach(async () => {
    let ChatApp = await ethers.getContractFactory("ChatApp");
    chatApp = await ChatApp.deploy();
    [user1, user2, user3] = await ethers.getSigners();
  });

  describe("Account Creation", async () => {
    it("Should Create An Account", async () => {
      let account = await chatApp.connect(user1).createAccount("Aman");
      const result = await chatApp.checkUserExists(await user1.getAddress());
      assert.equal(result, true, "User1 not created");
    });
  });
});
