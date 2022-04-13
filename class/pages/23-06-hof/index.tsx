export default function HofPage() {
  const onClickChild = (el) => (event) => {
    el;
  };

  return (
    <div>
      <h1>HOF 연습 페이지입니다!!!</h1>
      {[
        { title: "안녕하세요", writer: "철수", contents: "안녕하세요?!" },
        { title: "영희입니다", writer: "영희", contents: "날씨가 어때요?" },
        { title: "훈이예요", writer: "훈이", contents: "이렇게 흐린날" },
      ].map((el) => (
        <div key={el} onClick={onClickChild(el)}>
          {el}
        </div>
      ))}
    </div>
  );
}
