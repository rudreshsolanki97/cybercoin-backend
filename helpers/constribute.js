const Xdc3 = require("xdc3");
const utils = require("xdc3-utils");
const {
  RPC,
  CONTRIBUTE_ADDRESS,
  OPERATOR_ADDRESS,
  OPERATOR_PRIVATE_KEY,
} = require("./config");

const CONTRIBUTE_ABI = require("../ABI/contribute.json");

exports.AddMalware = ({ ipfshash, address }) => {
  return new Promise(async (resolve, reject) => {
    const xdc3 = new Xdc3(RPC);
    const contract = new xdc3.eth.Contract(CONTRIBUTE_ABI, CONTRIBUTE_ADDRESS);
    const data = contract.methods
      .addMalware(utils.fromXdcAddress(address), ipfshash, Date.now())
      .encodeABI();
    contract.methods.ONE_DAY().call().then(console.log).catch(console.trace);
    const tx = {
      to: CONTRIBUTE_ADDRESS,
      from: OPERATOR_ADDRESS,
      data,
    };
    const gas = await xdc3.eth.estimateGas(tx);
    tx.gasLimit = gas;
    const signed = await xdc3.eth.accounts.signTransaction(
      tx,
      OPERATOR_PRIVATE_KEY
    );
    xdc3.eth
      .sendSignedTransaction(signed.rawTransaction)
      .once("receipt", (receipt) => resolve(receipt))
      .catch((e) => {
        console.trace(e);
        reject(e);
      });
  });
};
