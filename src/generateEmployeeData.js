import {faker} from "@faker-js/faker";
import {useMemo} from "react";

// faker.seed(300);

export function createRandomUser() {
    return {
        userId: faker.helpers.fromRegExp(/[1-9]{2}-[1-9]{5}/),
        name: faker.person.fullName(),
        avatarColor: faker.helpers.fromRegExp(/#[0-9A-F]{6}/),
    };
}

console.log(faker.helpers.multiple(createRandomUser, {
    count: 20,
}))

export function useCreateRandomUsers(count, rerenders) {
    return useMemo(
        () =>
            faker.helpers.multiple(createRandomUser, {
                count: count,
            }),
        [count, rerenders]
    );
}

