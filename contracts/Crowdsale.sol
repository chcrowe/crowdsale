//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Token.sol";

contract Crowdsale {
    string public name = "Crowdsale";
    Token public token;
    uint256 public price;
    uint256 public tokensSold;
    uint256 public maxTokens;

    event Buy(uint256 amount, address buyer);
    // event Finalize(uint256 tokensSold, uint256 ethRaised);


    constructor(Token _token, uint256 _price, uint256 _maxTokens) {
        token = _token;
        price = _price;
        maxTokens = _maxTokens;
    }

    function buyTokens(uint256 _amount) public payable {
        require(msg.value == (_amount / 1000000000000000000) * price);
        require(token.balanceOf(address(this)) >= _amount);
        require(token.transfer(msg.sender, _amount));

        tokensSold += _amount;

        emit Buy(_amount, msg.sender);
    }
}
