import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

const DATE_METADATA_KEY = 'date-metadata';

export const DateType = (): PropertyDecorator => {
    return (target, property) => {
        const classConstructor = target.constructor;
        const metadata =
            Reflect.getMetadata(DATE_METADATA_KEY, classConstructor) ?? [];
        Reflect.defineMetadata(
            DATE_METADATA_KEY,
            [...metadata, property],
            classConstructor
        );
    };
};

@Injectable()
export class DateTransformPipe implements PipeTransform<unknown, unknown> {
    transform(body: unknown, args: ArgumentMetadata) {
        if (args.type != 'body') {
            return body;
        }

        const dateFields = Reflect.getMetadata(
            DATE_METADATA_KEY,
            args.metatype
        );
        return Object.entries(body).reduce((retObj, [key, value]) => {
            if (!dateFields?.includes(key) || typeof value != 'string') {
                return {
                    ...retObj,
                    [key]: value,
                };
            }

            return {
                ...retObj,
                [key]: new Date(value),
            };
        }, {});
    }
}
