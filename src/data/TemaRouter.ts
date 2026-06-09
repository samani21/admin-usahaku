import { TemaEight } from "./TemaEight";
import { TemaFive } from "./TemaFive";
import { TemaFour } from "./TemaFour";
import { TemaNine } from "./TemaNine";
import { TemaOne } from "./TemaOne"
import { TemaSevent } from "./TemaSevent";
import { TemaSevenTen } from "./TemaSeventen";
import { TemaThree } from "./TemaThree";
import { TemaTwo } from "./TemaTwo";
import { TemaElevent } from "./TemeElevent";
import { TemeFiveTen } from "./TemeFiveTen";
import { TemeFourTen } from "./TemeFourTen";
import { TemeSixTen } from "./TemeSixten";
import { TemaTen } from "./TemeTen";
import { TemeThirteen } from "./TemeThirteen";
import { TemaTwelve } from "./TemeTwelve";
import { TemaSix } from "./TemSix";

export const ThemePreview = (tema: number) => {
    switch (tema) {
        case 1:
            return TemaOne;
        case 2:
            return TemaTwo;
        case 3:
            return TemaThree;
        case 4:
            return TemaFour;
        case 5:
            return TemaFive;
        case 6:
            return TemaSix;
        case 7:
            return TemaSevent;
        case 8:
            return TemaEight;
        case 9:
            return TemaNine;
        case 10:
            return TemaTen;
        case 11:
            return TemaElevent;
        case 12:
            return TemaTwelve;
        case 13:
            return TemeThirteen;
        case 14:
            return TemeFourTen;
        case 15:
            return TemeFiveTen;
        case 16:
            return TemeSixTen;
        case 17:
            return TemaSevenTen;
        default:
            return null
    }
}