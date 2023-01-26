// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

contract ChatApp {
    struct Friends {
        address pubkey;
        string name;
    }

    struct User {
        string name;
        Friends[] friendList;
    }

    struct message {
        address sender;
        uint256 timestamp;
        string message;
    }

    mapping(address => User) public userLists;
    mapping(bytes32 => message[]) public allMessages;

    function checkUserExists(address _pubkey) public view returns (bool) {
        return bytes(userLists[_pubkey].name).length > 0;
    }
}
