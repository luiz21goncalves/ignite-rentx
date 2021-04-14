interface IUserResponse {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  getAvatarUrl(): string;
}

export { IUserResponse };
