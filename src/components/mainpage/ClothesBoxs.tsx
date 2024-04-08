import { useEffect, useState } from "react";
import * as S from "./style";
import "../../style/styles.css";
import { API } from "../../api/axios";
import { ApiNowModel } from "../../model/apiModel";
import Loading from "../../pages/loading/Loading";

type Props = {
  nowData: ApiNowModel;
  setDoldol(img: string): void;
};

// const ClothesBoxs = () => {
const ClothesBoxs = ({ nowData, setDoldol }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let [outerList, setOuterList] = useState<string[]>([]);
  let [topList, setTopList] = useState<string[]>([]);
  let [pantsList, setPantsList] = useState<string[]>([]);

  useEffect(() => {
    handleDataSet();
  }, []);

  const handleDataSet = async () => {
    setIsLoading(true);
    API.get(`/api/temperature/${nowData.obsrValue}`)
      .then((response) => {
        setOuterList(response.data.outer.split(", "));
        setTopList(response.data.top.split(", "));
        setPantsList(response.data.pants.split(", "));
        // console.log(outerList);
        setDoldol(response.data.dol);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("API 요청 실패:", error);
        setIsLoading(false);
      });
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
