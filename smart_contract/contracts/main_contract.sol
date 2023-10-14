pragma solidity >=0.4.22 <0.9.0;

contract main_contract {
    mapping(address => uint256) public balances;
    mapping(uint => User) public user;  //mapping to keep track of user record
    mapping(uint => Transact) public transact;  //mapping to keep track of transactions

    uint private _userID = 0;
    uint private _tradeID = 0;

    struct User {
        uint userID;
        string username;
    }

    event UserCreated(
        uint userID,
        string username
    );

    struct Transact {
        uint tradeID;
        uint price;
        uint amount;
        uint total;
        string tradeType;
    }

    event TransactCreated(
        uint tradeID,
        uint price,
        uint amount,
        uint total,
        string tradeType
    );

    function addUser(string calldata username) external {
        _userID ++;
        user[_userID] = User(_userID, username);
        emit UserCreated(_userID, username);
    }

    function addTransact(uint price, uint amount, string calldata tradeType) external {
        require(price > 0, "Invalid input value");
        require(amount > 0, "Invalid input value");
        _tradeID++;
        transact[_tradeID] = Transact(_tradeID, price, amount, price*amount, tradeType);
        emit TransactCreated(_tradeID, price, amount, price*amount, tradeType);
    }

    //called when user press BUY button
    function buyToken() external payable {
        uint amount = transact[_tradeID].amount;
        balances[msg.sender] += amount;
    }

    //called when user press SELL button
    function sellToken() external payable {
        uint amount = transact[_tradeID].amount;
        require(balances[msg.sender] >= amount, "Insufficient balance to sell");
        balances[msg.sender] -= amount;
    }

    function getBalance() external view returns(uint256){
        return balances[msg.sender];
    }
}