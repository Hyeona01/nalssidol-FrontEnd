import * as S from "./style";
import { ApiNowModel, ApiVilageFuture } from "../../model/apiModel";
import { IsDoldolComent } from "../../utils/weatherInfo";
import "../../style/styles.css";
import { useEffect, useState } from "react";
import clothes_data from "../../data/clothes_data.json";

type Props = {
  vilageData: ApiVilageFuture[];
  nowData: ApiNowModel;
};

const NalaldolBox = (props: Props) => {
  const [doldolImg, setDoldolImg] = useState("doldol.png");
  const [seasonImg, setSeasonImg] = useState("/여름 아래.png");

  const today: Date = new Date();
  const month: number = today.getMonth() + 1;

  interface MonthToSeasonMap {
    [key: number]: string;
  }

  const MonthToSeason: MonthToSeasonMap = {
    1: "/겨울 아래.png",
    2: "/겨울 아래.png",
    3: "/봄 아래.png",
    4: "/봄 아래.png",
    5: "/봄 아래.png",
    6: "/여름 아래.png",
    7: "/여름 아래.png",
    8: "/여름 아래.png",
    9: "/가을 아래.png",
    10: "/가을 아래.png",
    11: "/가을 아래.png",
    12: "/겨울 아래.png",
  };

  const fetchSeasonImg = () => {
    setSeasonImg(MonthToSeason[month]);
  };
  const fetchDoldolImg = () => {
    const temperature = parseInt(props.nowData.obsrValue); // 현재 온도 값을 숫자로 변환

    clothes_data.forEach((clothes) => {
      const startTem = clothes.startTem;
      const endTem = clothes.endTem;

      if (temperature >= startTem && temperature <= endTem) {
        setDoldolImg(clothes.doldol);
        return; // 범위를 찾았으므로 반복문 종료
      }
    });
  };

  useEffect(() => {
    fetchDoldolImg();
    fetchSeasonImg();
  }, []);

  return (
    <>
      <S.NalaldolBoxWrapper>
        <S.Comment>{IsDoldolComent(props.vilageData, props.nowData)}</S.Comment>
        <S.Nalaldol src={doldolImg || "/doldol.png"} alt="날알돌" />
        <S.SeasonBottom src={seasonImg} alt="계절 아래" />
      </S.NalaldolBoxWrapper>
    </>
  );
};

export default NalaldolBox;
