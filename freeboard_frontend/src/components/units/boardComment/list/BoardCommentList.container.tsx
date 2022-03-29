import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, useState } from "react";
import {
  IMutation,
  IMutationDeleteBoardCommentArgs,
  IQuery,
  IQueryFetchBoardCommentsArgs,
} from "../../../../commons/types/generated/types";
import BoardCommentListUI from "./BoardCommentList.presenter";
import {
  FETCH_BOARD_COMMENTS,
  DELETE_BOARD_COMMENT,
} from "./BoardCommentList.queries";

export default function BoardCommentList() {
  const router = useRouter();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [myPassword, setMyPassword] = useState("");

  const { data } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: { boardId: String(router.query.boardId) },
  });

  const [deleteBoardComment] =
    useMutation<
      Pick<IMutation, "deleteBoardComment">,
      IMutationDeleteBoardCommentArgs
    >(DELETE_BOARD_COMMENT);

  async function onClickDelete() {
    try {
      await deleteBoardComment({
        variables: {
          password: myPassword,
          boardCommentId: deleteId,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      setIsOpenDeleteModal(false);
      setDeleteId("");
    } catch (error) {
      Modal.error({ content: error.message });
    }
  }

  function onClickOpenDeleteModal(event: MouseEvent<HTMLImageElement>) {
    setIsOpenDeleteModal(true);
    if (event.target instanceof Element) setDeleteId(event.target.id);
  }

  function onChangeDeletePassword(event: ChangeEvent<HTMLInputElement>) {
    setMyPassword(event.target.value);
  }

  return (
    <BoardCommentListUI
      data={data}
      onClickOpenDeleteModal={onClickOpenDeleteModal}
      isOpenDeleteModal={isOpenDeleteModal}
      onClickDelete={onClickDelete}
      onChangeDeletePassword={onChangeDeletePassword}
    />
  );
}
