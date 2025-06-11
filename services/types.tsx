export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: { user: { username?: string; email?: string; createdAt?: string } };
};