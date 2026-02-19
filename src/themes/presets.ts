import type { QRConfig } from "../types/qrTypes";

export type PresetTheme = {
    name: string;
    config: Partial<QRConfig>;
};

export const PRESET_THEMES: PresetTheme[] = [
    {
        name: "Default",
        config: {
            fgColor: "#000000",
            bgColor: "#ffffff",
            dotType: "square",
            cornerSquareType: "square",
            margin: 10,
            errorCorrection: "M",
        },
    },
    {
        name: "DeshRan Navy Transparent",
        config: {
            fgColor: "#000080",
            bgColor: "transparent",
            errorCorrection: "H",
            dotType: "rounded",
            cornerSquareType: "extra-rounded",
            margin: 16,
            size: 512,
        },
    },
];
