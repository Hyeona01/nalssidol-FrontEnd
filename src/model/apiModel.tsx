export interface ApiModel {
  baseDate: string;
  baseTime: string;
  category: string;
  nx: number;
  ny: number;
}
export interface ApiNowModel extends ApiModel {
  obsrValue: string;
}
export const DefaultNowModel = {
  baseDate: "20231111",
  baseTime: "1400",
  category: "T1H",
  nx: 60,
  ny: 127,
  obsrValue: "12",
};
export interface ApiVilageFuture extends ApiModel {
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
}
export interface ApiAirModel {
  dataTime: string;
  stationName: string;
  pm10Grade: string;
  [key: string]: string;
}
export type DataType = {
  [key: number]: string;
};
export type skyFilterType = {
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  type: string;
};
export type positionType = {
  x: number;
  y: number;
};
