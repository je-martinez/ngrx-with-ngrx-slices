interface IMenuItem {
  name: string;
  path: string;
}

export const items: IMenuItem[] = [
  { name: 'Home', path: '/home' },
  { name: 'Counter', path: '/counter' },
];
