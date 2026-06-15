import { Dimensions } from "react-native";

{/* grab how big the phone screen is */}
const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

{/* hp = height percent, give it a number and get that % of the screen height */}
{/* handy so things scale on big and small phones instead of hard pixels */}
export const hp = percentage =>{
    return(percentage*deviceHeight) / 100;
}
{/* wp = width percent, same idea but for the width */}
export const wp = percentage =>{
    return(percentage*deviceWidth) / 100;
}
