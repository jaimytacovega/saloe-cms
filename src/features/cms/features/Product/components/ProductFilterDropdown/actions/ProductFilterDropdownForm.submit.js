import { getUrlByFilterForm } from '@/shared/services/DatabaseService'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    location.href = getUrlByFilterForm({
        form,
        filterKeys: ['brandIds', 'subCategoryIds'],
        url: new URL(location.href),
    })
}

export {
    submit,
}