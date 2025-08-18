const delay = ({ ms }) => new Promise(resolve => setTimeout(resolve, ms))

const lastUpdatedMessage = ({ date }) => {
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()
    
    if (isToday) return `Modificado a las ${date.toLocaleTimeString('es-ES', { hour12: false, hour: '2-digit', minute: '2-digit' })}`
    else return `Modificado el ${date.toLocaleDateString()}`
}


export {
    delay,
    lastUpdatedMessage,
}