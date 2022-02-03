import { ref } from "vue";
import setup from "./setup";

const {account, checkChain, contract} = setup()
const error = ref("");

const fillUpPixel = () => {
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
