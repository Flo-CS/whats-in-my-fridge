function truncateString(str, size) {
    if (str.length <= size) return str;

    return str.slice(0, size) + "...";
}

const asyncThunkErrorWrapper = async (asyncApiCallFunc, rejectWithValue) => {
    try {
        const response = await asyncApiCallFunc();
        return response.data;
    } catch (error) {
        if (!error.response)
            throw error;

        return rejectWithValue(error.response.data);
    }
};

function mapValueToRange(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
}


const gradeScoreColors = ["#2d7e43", "#97ba38", "#f0ca0d", "#d57b1a", "#c53319"];

export {truncateString, asyncThunkErrorWrapper, gradeScoreColors, mapValueToRange};