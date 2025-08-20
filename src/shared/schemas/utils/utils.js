import { z } from 'zod'


const getError = ({ error }) => {
    return error.issues[0].message
}

export {
    getError,
}