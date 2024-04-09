import { useState } from "react";
import * as S from "./style";
import NowSelected from "../../components/select/NowSelected";
import SelectAddress from "../../components/select/SelectAddress";
import { useLocation } from "react-router-dom";

function SelectAuto() {
  const location = useLocation();

  const [city, setCity] = useState<string>(location.state.city);
  const [gu, setGu] = useState<string>(location.state.gu);
  const cityOnClick = (item: string) => {
    setCity(item);
    setGu("");
  };
  const guOnClick = (item: string) => {
    setGu(item);
  };

  return (
    <S.SelectWrapper>
      <>
        <NowSelected city={location.state.city} gu={location.state.gu} />
        <S.SubWrapper>
          <SelectAddress
            city={city}
            gu={gu}
            cityOnClick={cityOnClick}
            guOnClick={guOnClick}
          />
          <S.LocationBtn>지역 설정하기</S.LocationBtn>
        </S.SubWrapper>
      </>
    </S.SelectWrapper>
  );
}

export default SelectAuto;
