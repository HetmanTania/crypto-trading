export default function sortData(data, key, isReverse) {
    console.log("sortData");
    if(!isReverse) {
        const sortArray = [...data];
        sortArray.sort((firstValue, secondValue) => {
            if (firstValue[key] < secondValue[key]) {
                return -1;
            }
            if (firstValue.name > secondValue.name) {
                return 1;
            }
            return 0;
        });
        return sortArray;
    }
    else {
        const sortArray = [...data];
        sortArray.sort((firstValue, secondValue) => {
            if (firstValue[key] > secondValue[key]) {
                return -1;
            }
            if (firstValue[key] < secondValue[key]) {
                return 1;
            }
            return 0;
        });
        return sortArray;
    }
}