export const deepEqual = (arr1, arr2) => {
    if( !arr1 || !arr2 || !arr1[0] || arr1[0].length !== arr2.length ) {
        console.log('edge case');
        return false;
    }

    for(let i = 0; i < arr1.length; i++){
        for(let j = 0 ; j < arr1[i].length; j++){
            console.log('comparing ', arr1[i][j], ' to ', arr2[j]);
            if(arr1[i][j] !== arr2[j]) {
                continue;
            } else if( j === arr1[i].length -1){
                return true;
            }
        }
    }

    return false;
};