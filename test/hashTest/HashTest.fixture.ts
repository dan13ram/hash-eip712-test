import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

import type { HashTest, HashTest__factory } from "../../src/types";

export async function deployHashTestFixture(): Promise<{ hashTest: HashTest }> {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const admin: SignerWithAddress = signers[0];

  const hashTestFactory: HashTest__factory = <HashTest__factory>(
    await ethers.getContractFactory("HashTest")
  );
  const hashTest: HashTest = <HashTest>(
    await hashTestFactory.connect(admin).deploy()
  );
  await hashTest.deployed();

  return { hashTest };
}
