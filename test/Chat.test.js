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
    let account1, account2, account3;
    beforeEach(async () => {
      account1 = await chatApp.connect(user1).createAccount("Oggy");
      account2 = await chatApp.connect(user2).createAccount("Jack");
      account3 = await chatApp.connect(user3).createAccount("Nobita");
    });
    it("Should Check User Exists", async () => {
      const result = await chatApp.checkUserExists(await user1.getAddress());
      assert.equal(result, true, "User1 not created");
    });
    it("Shoul get the Username", async () => {
      const result = await chatApp.getUserName(await user1.getAddress());
      expect(result).to.equal("Oggy");
    });

    it("Should return UserData", async () => {
      const result = await chatApp.userLists(await user1.getAddress());
      expect(result).to.equal("Oggy");
    });
  });

  describe("Add Friend", async () => {
    let account1, account2, account3;
    beforeEach(async () => {
      account1 = await chatApp.connect(user1).createAccount("Oggy");
      account2 = await chatApp.connect(user2).createAccount("Jack");
      account3 = await chatApp.connect(user3).createAccount("Nobita");
    });

    it("Should Add Friend", async () => {
      let addFriend = await chatApp
        .connect(user1)
        .addFriend(await user2.getAddress(), "Jack");
    });

    it("Should get all the users", async () => {
      const result = await chatApp.getAllTheUser();
      expect(result[0].name).to.equal("Oggy");
      expect(result[1].name).to.equal("Jack");
      expect(result[2].name).to.equal("Nobita");
      expect(result[0].accountAddress).to.equal(await user1.getAddress());
      expect(result[1].accountAddress).to.equal(await user2.getAddress());
      expect(result[2].accountAddress).to.equal(await user3.getAddress());
    });
  });

  describe("Send Message", async () => {});
});
