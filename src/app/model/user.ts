export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    institution: string;
    orcid: string;
}

export class User implements IUser {
    firstName: string;
    lastName: string;
    email: string;
    institution: string;
    orcid: string;

    constructor(user?: IUser) {
        this.firstName = user && user.firstName || undefined;
        this.lastName = user && user.lastName || undefined;
        this.email = user && user.email || undefined;
        this.institution = user && user.institution || undefined;
        this.orcid = user && user.orcid || undefined;
    }

    public getDisplayName(): string {
        return (this.firstName + " " + this.lastName);
    }
}
