import { useEffect, useState } from "react";
import * as S from "./style";
import "../../style/styles.css";
import { ApiNowModel } from "../../model/apiModel";
import Loading from "../../pages/loading/Loading";
import clothes_data from "../../data/clothes_data.json";

type Props = {
  nowData: ApiNowModel;
};

const ClothesBoxs = ({ nowData }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let [outerList, setOuterList] = useState<string[]>([]);
  let [topList, setTopList] = useState<string[]>([]);
  let [pantsList, setPantsList] = useState<string[]>([]);

  useEffect(() => {
    handleDataSet();
  }, []);

  const handleDataSet = () => {
    setIsLoading(true);
    const temperature = parseInt(nowData.obsrValue); // 현재 온도 값을 숫자로 변환

    clothes_data.forEach((clothes) => {
      const startTem = clothes.startTem;
      const endTem = clothes.endTem;

      if (temperature >= startTem && temperature <= endTem) {
        setOuterList(clothes.outer);
        setTopList(clothes.top);
        setPantsList(clothes.pants);
        setIsLoading(false);
        return; // 범위를 찾았으므로 반복문 종료
      }
    });

    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <S.ClothesBoxsWrapper>
          <S.ClothesBox>
            <img src="/Jacket.png" alt="외투" />
            <S.ClothesTitle>추천 외투</S.ClothesTitle>
            <S.ClothesTextLabel>
              {outerList.slice(0, 2).map((data, index) => (
                <S.ClothesText key={index}>{data}</S.ClothesText>
              ))}
            </S.ClothesTextLabel>
          </S.ClothesBox>
          <S.ClothesBox>
            <img src="/Top.png" alt="상의" />
            <S.ClothesTitle>추천 상의</S.ClothesTitle>
            <S.ClothesTextLabel>
              {topList.slice(0, 2).map((data, index) => (
                <S.ClothesText key={index}>{data}</S.ClothesText>
              ))}
            </S.ClothesTextLabel>
          </S.ClothesBox>
          <S.ClothesBox>
            <img src="/Bottom.png" alt="하의" />
            <S.ClothesTitle>추천 하의</S.ClothesTitle>
            <S.ClothesTextLabel>
              {pantsList.slice(0, 2).map((data, index) => (
                <S.ClothesText key={index}>{data}</S.ClothesText>
              ))}
            </S.ClothesTextLabel>
          </S.ClothesBox>
        </S.ClothesBoxsWrapper>
      )}
    </>
  );
};

export default ClothesBoxs;
