import { ChangeEvent } from "react";
import { IQuery } from "../../../../commons/types/generated/types";

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: any;
}

export interface IUpdateBoardInput {
  title?: string;
  contents?: string;
  youtubeUrl?: string;
  boardAddress?: {
    zipcode?: string;
    address?: string;
    addressDetail?: string;
  };
}

export interface ISubmitButtonProps {
  isActive: boolean;
}

export interface IBoardWriteUIProps {
  isActive: boolean;
  inputErrors: {
    writer: string;
    password: string;
    title: string;
    contents: string;
  };
  onChangeInput: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChangeYoutubeUrl: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeAddressDetail: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickAddressSearch: () => void;
  onCompleteAddressSearch: (data: any) => void;
  onClickSubmit: () => void;
  onClickUpdate: () => void;
  isEdit: boolean;
  data?: Pick<IQuery, "fetchBoard">;
  isOpen: boolean;
  zipcode: string;
  address: string;
  addressDetail: string;
}
