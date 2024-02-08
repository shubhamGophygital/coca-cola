import fontLight from "../assets/fonts/Montserrat/Montserrat-Light.ttf";
import fontRegular from "../assets/fonts/Montserrat/Montserrat-Regular.ttf";
import fontMedium from "../assets/fonts/Montserrat/Montserrat-Medium.ttf";
import fontBold from "../assets/fonts/Montserrat/Montserrat-Bold.ttf";

export default `
@font-face {
    font-family: "MC-Light";
    src: local("MarkForMC-Light"), url('${fontLight}');
}
@font-face {
    font-family: "MC-Regular";
    src: local("MarkForMC-Regular"), url('${fontRegular}');
}
@font-face {
    font-family: "MC-Medium";
    src: local("MarkForMC-Medium"), url('${fontMedium}');
}
@font-face {
    font-family: "MC-Bold";
    src: local("MarkForMC-Bold"), url('${fontBold}');
}
`;
