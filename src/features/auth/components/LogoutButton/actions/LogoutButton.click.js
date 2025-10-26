import * as AuthManager from '@/shared/managers/AuthManager'
import { Source } from '@/shared/utils/constants'


const click = async ({
    e,
    srcElement,
}) => {
    e.preventDefault()
    
    await AuthManager.signOut({ source: Source.FIREBASE })
    await AuthManager.removeCredentialsFromCookies()
    location.reload()
}

export{
    click,
}