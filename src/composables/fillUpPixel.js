import { ref } from "vue";
import { useLink } from "vue-router";
import setup from "./setup";

const { account, checkChain, cntrct } = setup();
const error = ref("");

let contract;

setTimeout(() => {
  console.log(cntrct.value);
  contract = cntrct.value;
  console.log(contract);
}, 1000);

const sendFilledUp = async (tkn, msg, clr, ttl, lnk) => {
  try {
    error.value = "";
    let ipfsHash
    if (await checkChain()) {
      const pixel = await contract.methods.pixels(tkn).call();
      if(account.value.toLowerCase() == pixel.owner.toLowerCase()){
        const url = "http://localhost:8080/editPixel"
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pixelNum: tkn,
            message: msg,
            color: clr,
            title: ttl,
            link: lnk
          })
        })

        const jsonRes = await response.json();
        ipfsHash = jsonRes.ipfsHash;
        const sendtx = await contract.methods
        .fillUpPixel(tkn, ipfsHash)
        .send({ from: account.value });
      } else {
        error.value = "You are not the owner of this pixel. You can't edit this pixel."
      }
    } else {
      error.value = "You are not on the right network. Please connect to Polygon Mainnet and try again."
    }
  } catch (err) {
    console.log(err);
    error.value = err.message;
  }
};

const editPixel = async (tkn, msg, ttl, clr, lnk) => {
  try {
    error.value = "";
    let ipfsHash
    if (await checkChain()) {
      const pixel = await contract.methods.pixels(tkn).call();
      if(account.value.toLowerCase() == pixel.owner.toLowerCase()){
        const url1 = "http://localhost:8080/delete"
        const response1 = await fetch(url1, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ipfsHash: pixel.ifpsHash
          })
        })
        const url = "http://localhost:8080/editPixel"
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pixelNum: tkn,
            message: msg,
            color: clr,
            title: ttl,
            link: lnk
          })
        })

        const jsonRes = await response.json();
        ipfsHash = jsonRes.ipfsHash;
        const sendtx = await contract.methods
        .editPixel(pixel.tokenId, pixel.number, ipfsHash)
        .send({ from: account.value });
      } else {
        error.value = "You are not the owner of this pixel. You can't edit this pixel."
      }
    } else {
      error.value = "You are not on the right network. Please connect to Polygon Mainnet and try again."
    }
  } catch (err) {
    console.log(err);
    error.value = err.message;
  }
}

const fillUpPixel = () => {
  return {
    error,
    sendFilledUp,
    editPixel
  };
};

export default fillUpPixel;
