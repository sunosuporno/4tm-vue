require('dotenv').config();
const ALCHEMY_URI = process.env.ALCHEMY_URI;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(ALCHEMY_URI);

