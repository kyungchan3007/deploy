import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { IBoard } from "../../src/commons/types/generated/types";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
    }
  }
`;

const MyRow = styled.div`
  display: flex;
`;

const MyColumn = styled.div`
  width: 25%;
`;

export default function BasketPage() {
  const { data } = useQuery(FETCH_BOARDS);

  const onClickBasket = (el) => () => {
    console.log(el);

    // 1. 기존 장바구니 가져오기
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");

    // 2. 이미 담겼는지 확인하기
    const temp = baskets.filter((basketEl: IBoard) => basketEl._id === el._id);
    if (temp.length === 1) {
      alert("이미 담으신 물품입니다!!!");
      return;
    }

    // const newBaskets = baskets.filter((basketEl: IBoard) => basketEl._id !== el._id);

    // 3. 장바구니에 담기
    const { __typename, ...newEl } = el;
    baskets.push(newEl);
    localStorage.setItem("baskets", JSON.stringify(baskets));
  };

  return (
    <div>
      {data?.fetchBoards.map((el: IBoard) => (
        <MyRow key={el._id}>
          <MyColumn>{el.writer}</MyColumn>
          <MyColumn>{el.title}</MyColumn>
          <button onClick={onClickBasket(el)}>장바구니담기</button>
        </MyRow>
      ))}
    </div>
  );
}
