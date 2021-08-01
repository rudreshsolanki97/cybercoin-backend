const express = require("express");
const bodyParse = require("body-parser");
const { AddMalware } = require("./helpers/constribute");
const { UploadFile } = require("./helpers/ipfs");

const app = express();

app.use(bodyParse.json());
app.listen(3000, () => console.log("listening on port 3000"));

app.post("/add_malware", async (req, res) => {
  try {
    const { malware, address } = req.body;
    const buffer = Buffer.from(JSON.stringify(malware), "utf-8");
    const hash = await UploadFile(buffer);
    const receipt = await AddMalware({ ipfshash: hash, address });
    res.send(receipt);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "internal server error" });
  }
});
