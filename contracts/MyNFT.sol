//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "hardhat/console.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // struc - similar with column in table
    struct Collection {
        uint256 tokenId;
        string name;
        address owner; //owner of the nft
        uint256 price;
    }
    
    //mapping - similar like table
    mapping(uint256 => Collection) private collections;
    mapping(uint256 => bool) public deleteKey;

    constructor() ERC721("MyNFT", "NFT") {}

    //mint - add object to smart contract
    function createToken(string memory tokenURI, uint256 price, string memory name)
        public
        returns (uint256)
    {
        //set a new token id for the token to be minted
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();

        _safeMint(msg.sender, newTokenId); //mint the token
        _setTokenURI(newTokenId, tokenURI); //generate the URI

        //mapping data into collections
        setCollection(newTokenId, price, name);

        //return token ID
        return newTokenId;
    }

    function getTotalToken() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    // mapping collection
    function setCollection(uint256 token, uint256 price, string memory name) private {
        collections[token] = Collection(token, name, ownerOf(token), price);
    }

    // get the collection by token
    function getCollections(uint256 token) public view returns (Collection memory) {
        return collections[token];
    }

    //update and mapping collections with new data
    function updateToken(uint256 token, uint256 price, string memory name)
        external
    {
        // checking diff
        if(collections[token].price != price) {
            collections[token].price = price;
        }

        // checking diff
        if(keccak256(bytes(collections[token].name)) != keccak256(bytes(name))) {
            collections[token].name = name;
        }

        // update collections
        setCollection(token, price, name);
    }

    function tokenExist(uint256 _id) public view returns(bool) {
        return _exists(_id);
    }

    // delete token and collections by token
    function deleteToken(uint256 token) public {
        require(_exists(token), "Error, wrong Token id");

        //delete collection by index token
        delete collections[token];

        // delete token
        _burn(token);
    }

}
