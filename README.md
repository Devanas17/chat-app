# This is a smart contract for a chat application.

It has a Friends struct to store a friend's address and name.

It has a User struct to store a user's name and friend list.

It has a Message struct to store a message's sender, timestamp, and content.

It has an AllUsers struct to store all users' names and account addresses.

It has events for when an account is created, a friend is added, and a message is sent.

It has mappings to store all registered users and their friend lists, and all messages.

Functions:

checkUserExists: checks if a user exists

createAccount: creates a new account with a name

getUserName: returns the username of a given address

addFriend: adds a friend to a user's friend list

getMyFriendList: returns the list of friends of a user

sendMessage: sends a message to a friend

\_getChatCode: generates a unique chat code for two users.

\_addFriend: adds a friend to a user's friend list.
