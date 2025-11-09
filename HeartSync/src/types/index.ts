export interface SwipeProfile {
    id: string;
    name: string;
    age: number;
    pronouns: string;
    gender: string;
    occupation: string;
    education: string;
    height: string;
    smoking: string;
    drinking: string;
    children: string;
    job: string;
    photos: string[];
    distance?: number;
    bio?: string;
    aboutMe?: string;
}

export interface SwipeAction {
    type: 'like' | 'pass';
    profileId: string;
    timestamp: Date;
}

export interface Match {
    profile: SwipeProfile;
    timestamp: Date;
}
