import { ref } from "vue";
import setup from "./setup";

const {init, account, checkChain, cntrct} = setup()
const error = ref("");

console.log(cntrct)
const contract = cntrct.value;
console.log(contract)

init()

const fillUpPixel = () => {
  console.log(contract);
  const sendFilledUp = async (tkn, msg, clr) => {
    try {
      error.value = "";
      if(await checkChain()){
        console.log(account.value)
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
  return {
    error,
    sendFilledUp,
  };
};

export default fillUpPixel;
