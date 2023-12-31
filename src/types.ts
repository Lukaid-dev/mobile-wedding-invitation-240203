export enum RouterContextEnum {
  Home = 'Home',
  Invitation = 'Invitation',
  Gallery = 'Gallery',
  GuestBook = 'GuestBook',
}

export enum GBReturnCode {
  Success = 'Success',
  NameEmpty = 'NameEmpty',
  PwEmpty = 'PwEmpty',
  PwInvalid = 'PwInvalid',
  TextEmpty = 'TextEmpty',
  NetworkError = 'NetworkError',
  IdEmpty = 'IdEmpty',
  IdNotFound = 'IdNotFound',
}

export interface RouterContextInterface {
  router: RouterContextEnum;
  updateRouter: (router: RouterContextEnum) => void;
}

export interface INavItem {
  url: string;
  title: string;
}

export interface GuestBookEntry {
  name: string;
  pw: string;
  text: string;
  salt: string;
  createdAt: string;
  deletedAt?: string;
}

export type imagesType = {
  [key: string]: {
    thumbnail: string;
    main: string;
  };
};

export type who = 'groom' | 'bride' | 'choi' | 'park' | 'moon';
