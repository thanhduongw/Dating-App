// src/types/index.ts
export interface SwipeProfile {
    id: string;
    name: string;
    age: number;
    pronouns: string;
    job: string;
    photos: string[];
    distance?: number;
    bio?: string;
}

export interface SwipeAction {
    type: 'like' | 'pass';
    profileId: string;
    timestamp: Date;
}