export type GoogleProfile = {
  displayName: string;
  emails?: { value: string }[];
};

export type GithubProfile = {
  displayName: string;
  username: string;
};
