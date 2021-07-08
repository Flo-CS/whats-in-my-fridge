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

export {truncateString, asyncThunkErrorWrapper};