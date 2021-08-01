const IPFS = require("ipfs-http-client");

const clientIPFS = new IPFS("/ip4/127.0.0.1/tcp/5001");

exports.UploadFile = (data) => {
  return new Promise((resolve, reject) => {
    clientIPFS.add(data, async (err, ipfsHash) => {
      if (err != null) {
        reject(err);
      }
      resolve(ipfsHash[0].hash);
    });
  });
};
