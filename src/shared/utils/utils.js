const delay = ({ ms }) => new Promise(resolve => setTimeout(resolve, ms))

const lastUpdatedMessage = ({ date }) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const today = new Date()
    const isToday = dateObj.toDateString() === today.toDateString()
    
    if (isToday) return `Modificado a las ${dateObj.toLocaleTimeString('es-ES', { hour12: false, hour: '2-digit', minute: '2-digit' })}`
    else return `Modificado el ${dateObj.toLocaleDateString()}`
}

const keywords = ({ keys }) => {
    return keys.map((key) => `${key}`.toLowerCase())
}


export {
    delay,
    lastUpdatedMessage,
    keywords,
}