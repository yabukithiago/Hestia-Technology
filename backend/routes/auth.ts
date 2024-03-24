interface User {
  username: string;
  password: string;
}

const users: User[] = [];

export function login(username: string, password: string): boolean {
  const user = users.find((user) =>
    user.username === username && user.password === password
  );
  return !!user;
}

export function register(username: string, password: string): boolean {
  if (users.some((user) => user.username === username)) {
    return false;
  }

  users.push({ username, password });
  return true;
}
