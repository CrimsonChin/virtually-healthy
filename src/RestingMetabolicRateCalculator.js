import Gender from './Gender';
import AgeRange from './AgeRange';

export function CalcuateRMR(ageRange, gender, weight) {
    if (gender === Gender.male){
        return calcMaleRMR(ageRange, weight)
    }
    return calcFemaleRMR(ageRange, weight)
}

function calcMaleRMR(ageRange, weight) {
    let rmr;
    switch (ageRange) {
        case AgeRange.tenToEighteen:
            rmr = (weight * 17.5) + 651;
            break
        case AgeRange.nineteenToThirty:
            rmr = (weight * 15.3) + 679;
            break;
        case AgeRange.thirtyOneToSixty:
            rmr = (weight * 11.6) + 879;
            break;
        default:
            alert("Error: Unexpected Age Range", ageRange);
    }
    return rmr;
}

function calcFemaleRMR(ageRange, weight){
    let rmr;
    switch (ageRange) {
        case AgeRange.tenToEighteen:
            rmr = (weight * 12.2) + 746;
            break
        case AgeRange.nineteenToThirty:
            rmr = (weight * 14.7) + 496;
            break;
        case AgeRange.thirtyOneToSixty:
            rmr = (weight * 8.7) + 829;
            break;
        default:
            alert("Error: Unexpected Age Range", ageRange);
    }
    return rmr;
}