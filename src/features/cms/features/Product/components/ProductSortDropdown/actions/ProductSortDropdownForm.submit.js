import { getUrlBySortForm } from '@/shared/services/DatabaseService'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    location.href = getUrlBySortForm({
        form,
        sortKey: 'sort',
        url: new URL(location.href),
    })
}

export {
    submit,
}