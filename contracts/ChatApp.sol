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

    struct Message {
        address sender;
        uint256 timestamp;
        string message;
    }

    struct AllUsers {
        string name;
        address accountAddress;
    }

    event AccountCreated(address indexed accountAddress, string name);
    event FriendAdded(address indexed friendAddress, string friendName);
    event MessageSent(address indexed friendAddress, string message);

    AllUsers[] private getAllUsers;
    mapping(address => User) public userLists;
    mapping(bytes32 => Message[]) public allMessages;

    function checkUserExists(address _pubkey) public view returns (bool) {
        return bytes(userLists[_pubkey].name).length > 0;
    }

    function createAccount(string calldata _name) external {
        require(checkUserExists(msg.sender) == false, "User already exists");
        require(bytes(_name).length > 0, "username cannot be empty");
        userLists[msg.sender].name = _name;
        getAllUsers.push(AllUsers(_name, msg.sender));
        emit AccountCreated(msg.sender, _name);
    }

    // Get Username
    function getUserName(
        address _pubkey
    ) external view returns (string memory) {
        require(checkUserExists(_pubkey), "User is not registered");
        return userLists[_pubkey].name;
    }

    // Add friends
    function addFriend(address _friend_key, string calldata _name) external {
        require(checkUserExists(msg.sender), "Create an account!");
        require(checkUserExists(_friend_key), "User is not registered");
        require(
            msg.sender != _friend_key,
            "User cannot add themselves as friends."
        );

        require(
            checkAlreadyFriends(msg.sender, _friend_key) == false,
            "These users are already friends."
        );

        _addFriend(msg.sender, _friend_key, _name);
        _addFriend(_friend_key, msg.sender, userLists[msg.sender].name);
        emit FriendAdded(_friend_key, _name);
    }

    // function

    function checkAlreadyFriends(
        address _pubkey1,
        address _pubkey2
    ) internal view returns (bool) {
        if (
            userLists[_pubkey1].friendList.length >
            userLists[_pubkey2].friendList.length
        ) {
            address tmp = _pubkey1;
            _pubkey1 = _pubkey2;
            _pubkey2 = tmp;
        }

        for (uint256 i = 0; i < userLists[_pubkey1].friendList.length; i++) {
            if (userLists[_pubkey1].friendList[i].pubkey == _pubkey2)
                return true;
        }
        return false;
    }

    function _addFriend(
        address _me,
        address _friend_key,
        string memory _name
    ) internal {
        Friends memory _newFriend = Friends(_friend_key, _name);
        userLists[_me].friendList.push(_newFriend);
    }

    // Get My friends
    function getMyFriendList() external view returns (Friends[] memory) {
        return userLists[msg.sender].friendList;
    }

    // Get chat code
    function _getChatCode(
        address _pubkey1,
        address _pubkey2
    ) internal pure returns (bytes32) {
        if (_pubkey1 < _pubkey2) {
            return keccak256(abi.encodePacked(_pubkey1, _pubkey2));
        } else return keccak256(abi.encodePacked(_pubkey1, _pubkey2));
    }

    // Send messages
    function sendMessage(address _friendKey, string memory _message) external {
        require(checkUserExists(msg.sender), "Create an account!");
        require(checkUserExists(_friendKey), "User is not registered");
        require(
            checkAlreadyFriends(msg.sender, _friendKey),
            "You are not friend wit the given user"
        );
        bytes32 chatCode = _getChatCode(msg.sender, _friendKey);
        Message memory newMsg = Message(msg.sender, block.timestamp, _message);
        allMessages[chatCode].push(newMsg);
        emit MessageSent(_friendKey, _message);
    }

    // Read Message
    function readMessage(
        address _friendKey
    ) external view returns (Message[] memory) {
        bytes32 chatcode = _getChatCode(msg.sender, _friendKey);
        return allMessages[chatcode];
    }

    function getAllTheUser() public view returns (AllUsers[] memory) {
        return getAllUsers;
    }
}
