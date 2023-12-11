
export class User {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string
    birthdate: string
    friends: number[] | undefined
    friendsRequests: number[] | undefined
    role: string
    status: string
    image: string

    constructor(userData: any) {
        this.id = userData.id;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.middleName = userData.middleName;
        this.birthdate = userData.birthdate;
        this.friends = userData.friends;
        this.friendsRequests = userData.friendsRequests
        this.role = userData.role;
        this.status = userData.status
        this.image = 'data:image/jpeg;base64,' + userData.image;
    }
}
