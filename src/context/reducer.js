const generateId = () => (performance.now().toString(36) +
    Math.random().toString(36)).replace(/\./g, '');

const updateAddWillBeSent = (files, maxSize) => {
    let currentSize = 0;
    let result = [];
    files.forEach(file => {
        const fileSize = file.value.size;
        const enoughSpace = currentSize + fileSize < maxSize;
        result.push({...file, willBeSent: enoughSpace});
        currentSize += enoughSpace ? fileSize : 0;
    });
    return result;
};

const updateRemoveWillBeSent = (files, maxSize) => {
    let currentSize = 0;
    let result = [];
    let i = 0;
    while (i < files.length) {
        if (currentSize + files[i].value.size < maxSize) {
            result.push({
                ...files[i],
                willBeSent: true
            });
            currentSize += files[i].value.size;
            i++;
        }
        else break;
    }
    return [result, i];
};

export const reducer = (state, action) => {
    const payload = action.payload;

    switch (action.type) {
        case 'add': {
            const files = state.concat({
                id: generateId(),
                value: payload.value,
                canShow: payload.canShow,
                hidden: payload.hidden
            });
            return updateAddWillBeSent(files, payload.maxSize)
                .sort((x, y) => y.willBeSent - x.willBeSent);
        }
        case 'remove': {
            const files = [...state.filter(file => file.id !== payload.id)];
            const [updatedFiles, i] = updateRemoveWillBeSent(files, payload.maxSize);
            return updatedFiles.concat(files.slice(i));
        }
        case 'toggleHidden':
            return state.map(file =>
                file.id === payload.id
                    ? {...file, hidden: !file.hidden}
                    : file);
        case 'changeName':
            return state.map(file =>
                file.id === payload.id
                    ? {...file, value: new File([file.value], payload.name,
                            {type: file.value.type})}
                    : file);
        default:
            return state;
    }
};