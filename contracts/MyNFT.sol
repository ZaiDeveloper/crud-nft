//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "hardhat/console.sol";

contract MyNFT is ERC721URIStorage, Ownable{
    address payable private _owner;
    mapping(uint256 => bool) public sold;
    mapping(uint256 => uint256) public price;
    mapping(uint256 => string) public name;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    //xsure apa benda
    event Purchase(address owner, string name, uint256 price, uint256 id, string uri);

    struct Collection {
        address nftContract;
        uint256 tokenId;
        string name;
        address owner; //owner of the nft
        uint256 price;
        bool sold;
    }
    
    //a way to access values of the MarketItem struct above by passing an integer ID
    mapping(uint256 => Collection) public collections;

    constructor() ERC721("MyNFT", "NFT") {
        _owner = payable(msg.sender);
    }

    /// @notice create a new token
    /// @param tokenURI : token URI
    function createToken(string memory tokenURI, uint256 _price, string memory _name)
        public
        onlyOwner
        returns (uint256)
    {
        //set a new token id for the token to be minted
        _tokenIdCounter.increment();
        uint256 newItemId = _tokenIdCounter.current();

        price[newItemId] = _price;
        name[newItemId] = _name;

        _safeMint(msg.sender, newItemId); //mint the token
        _setTokenURI(newItemId, tokenURI); //generate the URI

        setCollection(newItemId);

        //return token ID
        return newItemId;
    }

    function buy(uint256 _id) public payable {
        _validate(_id);
        _trade(_id);

        emit Purchase(msg.sender, name[_id], price[_id], _id, tokenURI(_id));
    }

    function _validate(uint256 _id) internal {
        require(msg.sender != ownerOf(_id), "Error, You have own it");
        require(_exists(_id), "Error, wrong Token id");
        require(!sold[_id], "Error, Token is sold");
        require(msg.value >= price[_id], "Error, Token costs more");
    }

    function _trade(uint256 _id) internal {
        _transfer(_owner, msg.sender, _id);
        _owner.transfer(msg.value);
        sold[_id] = true;
    }

    function getTotalToken() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function setCollection(uint256 token) public {
        collections[token] = Collection(address(this), token, name[token], ownerOf(token),  price[token],  sold[token]);
    }

    function getCollections(uint256 token) public view returns (Collection memory) {
        return collections[token];
    }
    

    function updateToken(uint256 token, uint256 _price, string memory _name)
        public
        onlyOwner
    {
        if(price[token] != _price) {
            price[token] = _price;
        }

        if(keccak256(bytes(name[token])) != keccak256(bytes(_name))) {
            name[token] = _name;
        }

        setCollection(token);
    }

    function tokenExist(uint256 _id) public view returns(bool) {
        bool exist = false;
        if(_exists(_id)) {
            exist = true;
        }
        return exist;
    }

    function deleteToken(uint256 _id) public {
        require(_exists(_id), "Error, wrong Token id");
        _burn(_id);
        delete sold[_id];
        delete price[_id];
        delete name[_id];
        delete collections[_id];
    }

}
