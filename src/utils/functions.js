export const getPathDetails = (URLstring) => {
    const splitArray = URLstring.split("/");
    const lastTwoElements = splitArray[splitArray.length-2]+"/"+splitArray[splitArray.length-1];
    return lastTwoElements;
};

export const getGroupDetails = (URLstring) => {
    const splitArray = URLstring.split("/");
    const lastElement = splitArray[splitArray.length-2];
    return lastElement;
};

export const arrayContainsObjectWithGivenNameProperty = (arr, givenNameToSearch) => {

    if(!givenNameToSearch) return false;
    for (let i=0; i<arr.length ; i++) {
        if (arr[i].name === givenNameToSearch) return true;
    };
    return false;
};

export const getArrayOfSinglePropertyArrays = async (obj)=> {
    if (Object.keys(obj).length === 0) return; 
    const myArray = [];
    for (const key in obj) {
        const myArr =[key, obj[key]];
        myArray.push(myArr);
    }
    
    return myArray;
}