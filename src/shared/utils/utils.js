import { CMS_CODES } from '@/shared/utils/constants'


const delay = ({ ms }) => new Promise(resolve => setTimeout(resolve, ms))

const lastUpdatedMessage = ({ date }) => {
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()
    
    if (isToday) return `Modif. a las ${date.toLocaleTimeString('es-ES', { hour12: false, hour: '2-digit', minute: '2-digit' })}`
    else return `Modif. el ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`
}

const keywords = ({ keys }) => {
    return keys.flatMap((key) => `${key}`.toLowerCase().split(' ').filter((word) => word.length > 0))
}

const formatCount = ({ count }) => {
    return count.toString().padStart(3, '0')
}

const getCMSCode = ({ collectionName }) => {
    return CMS_CODES[collectionName]
}

const getCMSCorrelative = ({ collectionName, count }) => {
    return `${getCMSCode({ collectionName })}-${formatCount({ count })}`
}


export {
    delay,
    lastUpdatedMessage,
    keywords,
    getCMSCorrelative,
}