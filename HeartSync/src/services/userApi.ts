// src/services/userApi.ts
import { faker } from '@faker-js/faker';
import { SwipeProfile } from '../types';

export const fakeSwipeService = {
    generateSwipeProfiles: (count: number = 20): SwipeProfile[] => {
        const pronounsOptions = [
            'She/her/hers',
            'He/him/his',
            'They/them/theirs',
        ];

        const genders = ['Female', 'Male', 'Non-binary', 'Other'];

        const jobTitles = [
            'Business Analyst at Tech',
            'Software Engineer',
            'Product Designer',
            'Marketing Manager',
            'Data Scientist',
            'UX Researcher',
            'Project Manager',
            'Content Creator',
            'Freelancer',
            'Teacher',
            'Photographer',
        ];

        const educationLevels = [
            'High School',
            'Bachelor’s Degree',
            'Master’s Degree',
            'PhD',
            'College Graduate',
        ];

        const smokingHabits = ['No', 'Occasionally', 'Yes'];
        const drinkingHabits = ['No', 'Socially', 'Often'];
        const childrenOptions = ['No', 'Yes', 'Someday'];

        return Array.from({ length: count }, (_, index) => ({
            id: `profile-${index}`,
            name: faker.person.firstName() + ' ' + faker.person.lastName(),
            age: faker.number.int({ min: 22, max: 35 }),
            pronouns: faker.helpers.arrayElement(pronounsOptions),
            gender: faker.helpers.arrayElement(genders),
            occupation: faker.helpers.arrayElement(jobTitles),
            education: faker.helpers.arrayElement(educationLevels),
            height: faker.number.int({ min: 155, max: 190 }) + ' cm',
            smoking: faker.helpers.arrayElement(smokingHabits),
            job: faker.helpers.arrayElement(jobTitles),
            drinking: faker.helpers.arrayElement(drinkingHabits),
            children: faker.helpers.arrayElement(childrenOptions),
            photos: Array.from(
                { length: faker.number.int({ min: 3, max: 6 }) },
                () => faker.image.avatar()
            ),
            distance: faker.number.int({ min: 1, max: 25 }),
            bio: faker.lorem.sentences(2),
            aboutMe: faker.lorem.paragraph(),
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
