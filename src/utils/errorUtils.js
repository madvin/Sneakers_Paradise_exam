export const getErrorMessage = (err) => {
    switch (err.name) {
        case 'validationError':
            return Object.values(err.errors).at(0).message;
           
        default:
            return err.message;
    }
}