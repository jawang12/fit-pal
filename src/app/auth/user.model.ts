export class User {
  email: string;
  userId: string;

  constructor(email: string, id: string) {
    this.email = email;
    this.userId = id;
  }
}