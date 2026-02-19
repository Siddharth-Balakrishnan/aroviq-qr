export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export type DotType =
  | "square"
  | "rounded"
  | "extra-rounded"
  | "dots";

export type CornerSquareType =
  | "square"
  | "extra-rounded"
  | "dot";

export type QRConfig = {
  data: string;
  size: number;
  margin: number;
  dotType: DotType;
  cornerSquareType: CornerSquareType;
  fgColor: string;
  bgColor: string | "transparent";
  errorCorrection: ErrorCorrectionLevel;
  logo?: string;
  logoSize: number;
};
