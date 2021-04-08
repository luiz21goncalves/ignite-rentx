interface IAddress {
  name: string;
  email: string;
}

interface IVariables {
  [key: string]: string | number | boolean;
}

interface ISendMailDTO {
  to: IAddress;
  from?: IAddress;
  subject: string;
  variables: IVariables;
  path: string;
}

export { ISendMailDTO };
