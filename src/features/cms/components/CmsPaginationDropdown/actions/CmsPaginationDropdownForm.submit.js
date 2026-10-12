import { getUrlByPageForm } from '@/shared/services/DatabaseService'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    location.href = getUrlByPageForm({
        form,
        pageKey: 'page',
        url: new URL(location.href),
    })
}

export {
    submit,
}
