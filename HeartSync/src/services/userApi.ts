// src/services/fakeSwipeService.ts
import { faker } from '@faker-js/faker';
import { SwipeProfile } from '../types';

export const fakeSwipeService = {
    generateSwipeProfiles: (count: number = 20): SwipeProfile[] => {
        const pronounsOptions = [
            'She/her/hers',
            'He/him/his',
            'They/them/theirs',
            'She/her/hors'
        ];

        const jobTitles = [
            'Business Analyst at Tech',
            'Software Engineer',
            'Product Designer',
            'Marketing Manager',
            'Data Scientist',
            'UX Researcher',
            'Project Manager',
            'Content Creator'
        ];

        return Array.from({ length: count }, (_, index) => ({
            id: `profile-${index}`,
            name: faker.person.firstName() + ' ' + faker.person.lastName(),
            age: faker.number.int({ min: 22, max: 35 }),
            pronouns: faker.helpers.arrayElement(pronounsOptions),
            job: faker.helpers.arrayElement(jobTitles),
            photos: Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () =>
                faker.image.avatar()
            ),
            distance: faker.number.int({ min: 1, max: 25 }),
            bio: faker.lorem.sentences(2),
        }));
    },

    getSwipeProfiles: async (): Promise<SwipeProfile[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(fakeSwipeService.generateSwipeProfiles(15));
            }, 1000);
        });
    },
};