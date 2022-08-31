// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import "hardhat/console.sol";
import {
    EIP712
} from "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

contract HashTest is EIP712 {
    struct HashData {
        uint256 number;
        address signer;
        bytes[] hashList;
        // uint256[] numberList;
    }

    // bytes32 constant HASH_DATA_HASH = keccak256("HashData(uint256 number,address signer)");
    bytes32 constant HASH_DATA_HASH =
        keccak256("HashData(uint256 number,address signer,bytes[] hashList)");

    constructor() EIP712("HashTest", "0.1") {
        console.log("constructor");
    }

    function getHash(HashData calldata _data)
        external
        view
        returns (bytes32 hash)
    {
        uint256 length = _data.hashList.length;
        bytes32[] memory bytesHash = new bytes32[](length);
        for (uint256 i = 0; i < length; ) {
            bytesHash[i] = keccak256(_data.hashList[i]);
            unchecked {
                ++i;
            }
        }
        // Compute hash from data
        hash = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    HASH_DATA_HASH,
                    _data.number,
                    _data.signer,
                    keccak256(abi.encodePacked(bytesHash))
                )
            )
            // keccak256(abi.encode(HASH_DATA_HASH, _data.number, _data.signer))
            // keccak256(abi.encode(HASH_DATA_HASH, _data.number, _data.signer, keccak256(abi.encodePacked(_data.numberList))))
        );
    }
}
