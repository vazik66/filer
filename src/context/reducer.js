const generateId = () => (performance.now().toString(36) +
    Math.random().toString(36)).replace(/\./g, '');

export const reducer = (state, action) => {
    const payload = action.payload;

    switch (action.type) {
        case 'add':
            return [
                ...state,
                {
                    id: generateId(),
                    value: payload.value,
                    canShow: payload.canShow,
                    hidden: payload.hidden,
                }
            ];
        case 'remove':
            return [...state.filter(file => file.id !== payload.id)];
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