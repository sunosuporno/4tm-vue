import { ref } from "vue";
import setup from "./setup";

const { account, checkChain, cntrct } = setup();
const error = ref("");

let contract;

setTimeout(() => {
  console.log(cntrct.value);
  contract = cntrct.value;
  console.log(contract);
}, 1000);

const sendFilledUp = async (tkn, msg, clr) => {
  try {
    error.value = "";
    if (await checkChain()) {
      console.log(account.value);
      const sendtx = await contract.methods
        .fillUpPixel(tkn, msg, clr)
        .send({ from: account.value });
      console.log(sendtx);
    }
  } catch (err) {
    console.log(err);
    error.value = err.message;
  }
};

const fillUpPixel = () => {
  return {
    error,
    sendFilledUp,
  };
};

export default fillUpPixel;
