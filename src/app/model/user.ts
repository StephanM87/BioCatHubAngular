export class User {
    firstName: string;
    lastName: string;
    email: string;
    institution: string;
    orcid: string;

    constructor(user?: User) {
        this.firstName = user && user.firstName || undefined;
        this.lastName = user && user.lastName || undefined;
        this.email = user && user.email || undefined;
        this.institution = user && user.institution || undefined;
        this.orcid = user && user.orcid || undefined;
    }

    public getDisplayName(): string {
        var name = "";
        if(this.firstName != undefined && this.firstName != "") {
            name += this.firstName;
        }
        if(this.lastName != undefined && this.lastName != "") {
            name += (" " + this.lastName);
        }
        if(name.length == 0) {
            name = "login"
        }
        return name;
    }
}
