pragma solidity 0.4.24;

contract Storage {
    string ipfsHash = "hello world !";
    event ValueChanged(string,address);

    function set(string x) public {
        emit ValueChanged(x, msg.sender);
        ipfsHash = x;
    }

    function get() public view returns (string) {
        return ipfsHash;
    }
}