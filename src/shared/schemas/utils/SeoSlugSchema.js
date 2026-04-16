import { z } from 'zod'

import { slugifySeoSlug } from '@/shared/schemas/utils/utils'


const SeoSlugSchema = z.preprocess(
    (val) => slugifySeoSlug(val),
    z.union([
        z.undefined(),
        z.string().regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            'El slug solo puede contener letras minúsculas, números y guiones',
        ),
    ]),
)

export {
    SeoSlugSchema,
}