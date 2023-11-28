export enum RouterContextEnum {
  Home = 'Home',
  Invitation = 'Invitation',
  Gallery = 'Gallery',
  GuestBook = 'GuestBook',
}

export interface RouterContextInterface {
  router: RouterContextEnum;
  updateRouter: (router: RouterContextEnum) => void;
}

export interface INavItem {
  url: string;
  title: string;
}
