import { ApiNowModel, ApiVilageFuture, positionType } from "../model/apiModel";

export const IsDoldolComent = (
  data: ApiVilageFuture[],
  now: ApiNowModel | undefined
) => {
  let doldolComent;

  // 현재온도
  const nowTemp = now && parseInt(now?.obsrValue);
  let temp = nowTemp || 0;

  if (
    data?.some(
      (filteredData) =>
        filteredData.category === "PTY" && // T1M
        (filteredData.fcstValue === "1" || // 비
          filteredData.fcstValue === "2" || // 비+눈
          filteredData.fcstValue === "4") // 소나기
    )
  ) {
    doldolComent = (
      <p style={{ textAlign: "center" }}>
        비 올 예정이돌🌧️
        <br />
        우산을 챙겨가돌!😎
      </p>
    );
  } else if (
    data?.some(
      (filteredData) =>
        filteredData.category === "PTY" && filteredData.fcstValue === "3"
    )
  ) {
    doldolComent = (
      <p style={{ textAlign: "center" }}>
        눈 올 예정이돌❄️
        <br />
        우산을 챙겨가돌!😎
      </p>
    );
  } else if (
    data?.some(
      (filteredData) =>
        filteredData.category === "PTY" && filteredData.fcstValue === "0"
    ) &&
    temp <= 10
  ) {
    doldolComent = (
      <p style={{ textAlign: "center" }}>
        날씨가 춥돌☀️ <br /> 외투 챙기돌!😎
      </p>
    );
  } else
    doldolComent = (
      <p style={{ textAlign: "center" }}>
        날씨가 맑돌☀️ <br /> 외출하자돌!😎
      </p>
    );

  return doldolComent;
};

const today: Date = new Date();
const year: string = String(today.getFullYear());
const month: string = String(today.getMonth() + 1).padStart(2, "0");
const day: string = String(today.getDate() - 1).padStart(2, "0"); // 전일 날짜
const nowDay: string = String(today.getDate()).padStart(2, "0"); // 현재 날짜

let hours: number = today.getHours();
let minutes: number = today.getMinutes();

if (minutes < 25) {
  hours -= 1;
  minutes = 59;
}

const formattedTime: string = `${String(hours).padStart(2, "0")}${String(
  minutes
).padStart(2, "0")}`;

export const FormattedDate: string = `${year}${month}${day}`;
export const FormattedNowDate: string = `${year}${month}${nowDay}`;
export const FormattedTime: string = formattedTime;

type defaultType = {
  nx: number;
  ny: number;
  city: string;
  gu: string;
};

export const DefaultPosition = () => {
  return new Promise<positionType>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newPosition: positionType = {
          x: Math.round(position.coords.latitude),
          y: Math.round(position.coords.longitude),
        };
        resolve(newPosition);
      },
      (error) => {
        alert(error + "위치 허용이 필요합니다.");
        reject(error);
      }
    );
  });
};

export const DefaultCity = (state: defaultType): string => {
  if (state && typeof state.city === "string") {
    return state.city;
  } else {
    return "서울특별시";
  }
};
export const DefaultGu = (state: defaultType): string => {
  if (state && typeof state.gu === "string") {
    return state.gu;
  } else {
    return "중구";
  }
};
