import { TypedDataField } from "@ethersproject/abstract-signer";
import { expect } from "chai";

import type { HashTest } from "../../src/types";

const EMPTY_BYTES32 =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

export function shouldBehaveLikeHashTest(): void {
  it("should return hash of struct", async function () {
    const data: HashTest.HashDataStruct = {
      number: 1,
      signer: this.signers.admin.address,
      hashList: ["0x11", "0x22"],
      // numberList: [1, 2],
    };

    const types: Record<string, TypedDataField[]> = {
      HashData: [
        { name: "number", type: "uint256" },
        { name: "signer", type: "address" },
        { name: "hashList", type: "bytes[]" },
        // { name: "numberList", type: "uint256[]" },
      ],
    };

    const encodedMsgHash = this.encoder.hash(this.domain, types, data);

    const hash = await this.hashTest.getHash(data);

    expect(encodedMsgHash).to.equal(hash);
  });
}
