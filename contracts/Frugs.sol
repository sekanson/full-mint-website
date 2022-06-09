// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract Frugs is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721('Frugs', 'U') {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 10000;
        maxPerWallet = 20;
        withdrawWallet = payable(0x910FC465B777e8cc76B5686e7a58fFc9e5FCc26C) ;
    } 
     
    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_;
    }
 
    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }


    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), 'Token does not exisit!');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId), ".json"));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance } ('');
        require(success, 'withdraw failed');
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, 'can not mint yet frug');
        require(msg.value == quantity_ * mintPrice, 'nice try frugger');
        require(totalSupply + quantity_ <= maxSupply, 'no frugs left');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'exceeds max frugs');

        for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}