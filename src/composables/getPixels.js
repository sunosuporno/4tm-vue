import setup from "./setup";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { contract, account } = setup();
let tokens = [];
let pixels = ref([]);
let runningPixelation = ref(false);
let error = ref("");
const router = useRouter();

const fetchTokens = () => {
  error.value = "";
  contract.methods
    .getTokensByOwner(account.value)
    .call()
    .then((res) => {
      if (res.length !== tokens.length && res.length > 0) {
        tokens = res;
        pixelation();
      } else {
        for (let i = 0; i < res.length; i++) {
          if (res[i] !== tokens[i]) {
            tokens = res;
            pixelation();
            break;
          } else {
            continue;
          }
        }
      }
    })
    .catch(() => {
      error.value =
        "There was a problem fetching your data. Please sign in again after refreshing.";
    });
};

const pixelation = () => {
  error.value = "";
  runningPixelation.value = true;
  pixels.value = [];
  tokens.forEach((token) => {
    contract.methods
      .pixels(token)
      .call()
      .then((res) => {
        pixels.value.push(res);
        runningPixelation.value = false;
      })
      .catch(() => {
        error.value =
          "There was a problem fetching your data. Please sign in again after refreshing.";
        runningPixelation.value = false;
      });
  });
  console.log(pixels.value);
};
