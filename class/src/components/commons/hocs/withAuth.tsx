import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { getAccessToken } from "../../../commons/libraries/getAccessToken";
import {
  accessTokenState,
  isLoadedState,
  restoreAccessTokenLoadable,
} from "../../../commons/store";

// @ts-ignore
export const withAuth = (Component) => (props) => {
  const router = useRouter();
  const [accessToken] = useRecoilState(accessTokenState);
  const [isLoaded] = useRecoilState(isLoadedState);
  const restoreAccessToken = useRecoilValueLoadable(restoreAccessTokenLoadable);

  // 권한분기 로직 추가하기
  useEffect(() => {
    // 1. 옛날방식
    // if (!localStorage.getItem("accessToken")) {
    //   alert("로그인 후 이용 가능합니다!!!");
    //     router.push("/22-01-login");
    // }

    // 2. 로딩방식
    // if (!isLoaded && !accessToken) {
    //   getAccessToken().then((newAccessToken) => {
    //     if (!newAccessToken) {
    //       alert("로그인 후 이용 가능합니다!!!");
    //       router.push("/22-01-login");
    //     }
    //   });
    // }

    // 3. 글로벌 프로미스 방식(비회원 접근시 토큰 재발급 요청 방지를 위해 로딩과 함께 사용할 것)
    if (!accessToken) {
      restoreAccessToken.toPromise().then((newAccessToken) => {
        if (!newAccessToken) {
          alert("로그인 후 이용 가능합니다!!!");
          router.push("/22-01-login");
        }
      });
    }
  }, []);

  return <Component {...props} />;
};
