import fallback from "./assets/fallback/logo.png";
import navbar from "./assets/navbar/logo.png";
import Loader from "./assets/loader/loader.gif";
import favIcon from "./assets/favicon/favicon.png";
import fonts from "./theme/fonts";
import theme from "./theme/theme";

//Added by Trupti-Wits (brandname, download form values)
export default {
  brandName: "Coca-Cola",
  brandId: 1,
  assets: {
    navbar,
    fallback,
    favIcon,
    Loader,
  },
  theme: theme,
  modules: {
    showLoginPage: true,
    showQuestionnaire: true,
  },
  fonts: fonts,
};
