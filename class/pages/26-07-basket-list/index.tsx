import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { IBoard } from "../../src/commons/types/generated/types";

const MyRow = styled.div`
  display: flex;
`;

const MyColumn = styled.div`
  width: 25%;
`;

export default function BasketPage() {
  const [basketItems, setBasketItems] = useState([]);

  // if (typeof window !== "undefined") {
  useEffect(() => {
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");
    setBasketItems(baskets);
  }, []);

  // }

  return (
    <div>
      {basketItems.map((el: IBoard) => (
        <MyRow key={el._id}>
          <MyColumn>{el.writer}</MyColumn>
          <MyColumn>{el.title}</MyColumn>
        </MyRow>
      ))}
    </div>
  );
}
