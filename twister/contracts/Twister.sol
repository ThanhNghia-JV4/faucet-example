pragma solidity >=0.7.0 <0.9.0;

contract Twister{

    //addfunds, withdraw, addressIndex, getFunfers

    uint256 public numOfFunders;
    mapping(uint256 => address) public lutFunders;
    mapping(address => bool) public funders;

    receive() external payable{}


    function addFunds() external payable{
        //khi nhap vo 1 dia chi vi, thif funder se dc rao ra boi nguoi tao ra no 
        address funder = msg.sender;
        if (!funders[funder]) {
            uint256 index = numOfFunders++;
            funders[funder] = true;
            lutFunders[index] = funder;
        }
    }

    function getFundersIndex(uint256 index) external view returns(address) {
        return lutFunders[index];
    }

    function getAllFunders() external view returns(address[] memory) { //ra tat ca cac dia chi vi da donation
        address[] memory _funders = new address[](numOfFunders);

        for (uint256 i = 0; i < numOfFunders; i++) {
            _funders[i] = lutFunders[i];
        }

        return _funders;
    }

    function withdraw(uint256 withdrawAmount) external limitWithdraw(withdrawAmount) {
        payable(msg.sender).transfer(withdrawAmount);
    }

    modifier limitWithdraw(uint256 withdrawAmount) { //dung de gioi han luong rut lai
        require(withdrawAmount <= 1*(10**18), "Cannot withdraw more than 1ETH");
        _;
    }
}