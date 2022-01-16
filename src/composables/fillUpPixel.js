import { ref } from "vue";
import setup from "./setup";

const {account, contract} = setup()

const fillUpPixel = () => {
  const error = ref("");
  const sendFilledUp = async (tkn, msg, clr) => {
    try {
      error.value = "";
      console.log(account.value)
      const sendtx = await contract.methods
        .fillUpPixel(tkn, msg, clr)
        .send({ from: account.value });
      console.log(sendtx);
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
