export class User {
  firstName: string;
  lastName: string;
  email: string;
  institution: string;

  constructor(user?: User) {
    this.firstName = user?.firstName;
    this.lastName = user?.lastName;
    this.email = user?.email;
    this.institution = user?.institution;
  }
}
