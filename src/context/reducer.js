const generateId = () => (performance.now().toString(36) +
    Math.random().toString(36)).replace(/\./g, '');

const updateWillBeSent = (files, maxSize) => {
    let currentSize = 0;
    let result = [];
    files.forEach(file => {
        const fileSize = file.value.size;
        const enoughSpace = currentSize + fileSize < maxSize;
        result.push({...file, willBeSent: enoughSpace});
        currentSize += enoughSpace ? fileSize : 0;
    });
    return result.sort((x, y) => y.willBeSent - x.willBeSent);
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
            return updateWillBeSent(files, payload.maxSize);
        }
        case 'remove': {
            const files = [...state.filter(file => file.id !== payload.id)];
            return updateWillBeSent(files, payload.maxSize);
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