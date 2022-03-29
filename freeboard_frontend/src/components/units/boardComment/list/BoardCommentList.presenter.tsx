import { Modal } from "antd";
import { getDate } from "../../../../commons/libraries/utils";
import * as S from "./BoardCommentList.styles";
import { IBoardCommentListUIProps } from "./BoardCommentList.types";

export default function BoardCommentListUI(props: IBoardCommentListUIProps) {
  return (
    <div>
      {props.isOpenDeleteModal && (
        <Modal visible={true} onOk={props.onClickDelete}>
          <div>비밀번호 입력: </div>
          <S.PasswordInput
            type="password"
            onChange={props.onChangeDeletePassword}
          />
        </Modal>
      )}
      {props.data?.fetchBoardComments.map((el) => (
        <S.ItemWrapper key={el._id}>
          <S.FlexWrapper>
            <S.Avatar src="/images/avatar.png" />
            <S.MainWrapper>
              <S.WriterWrapper>
                <S.Writer>{el.writer}</S.Writer>
                <S.Star value={el?.rating} disabled />
              </S.WriterWrapper>
              <S.Contents>{el.contents}</S.Contents>
            </S.MainWrapper>
            <S.OptionWrapper>
              <S.UpdateIcon src="/images/boardComment/list/option_update_icon.png/" />
              <S.DeleteIcon
                src="/images/boardComment/list/option_delete_icon.png/"
                id={el._id}
                onClick={props.onClickOpenDeleteModal}
              />
            </S.OptionWrapper>
          </S.FlexWrapper>
          <S.DateString>{getDate(el.createdAt)}</S.DateString>
        </S.ItemWrapper>
      ))}
    </div>
  );
}
