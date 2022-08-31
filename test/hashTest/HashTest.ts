import { TypedDataDomain } from "@ethersproject/abstract-signer";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

import type { Signers } from "../types";
import { shouldBehaveLikeHashTest } from "./HashTest.behavior";
import { deployHashTestFixture } from "./HashTest.fixture";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];

    this.loadFixture = loadFixture;
  });

  describe("HashTest", function () {
    beforeEach(async function () {
      const { hashTest } = await this.loadFixture(deployHashTestFixture);
      this.hashTest = hashTest;

      const domain: TypedDataDomain = {
        name: "HashTest",
        version: "0.1",
        chainId: (await ethers.provider.getNetwork()).chainId,
        verifyingContract: this.hashTest.address,
      };

      this.domain = domain;

      const encoder = ethers.utils._TypedDataEncoder;

      this.encoder = encoder;
    });

    shouldBehaveLikeHashTest();
  });
});
