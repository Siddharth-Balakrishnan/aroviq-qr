import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import type {
    CornerSquareType,
    DotType,
    ErrorCorrectionLevel,
} from "qr-code-styling";
import type { QRConfig } from "../types/qrTypes";

export const useQRCode = (config: QRConfig) => {
    const ref = useRef<HTMLDivElement>(null);
    const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);

    useEffect(() => {
        const qr = new QRCodeStyling({
            width: config.size,
            height: config.size,
            type: "svg", // Render as SVG ideally for sharp scaling, or canvas. Default is canvas. 
            // Prompt says "Large QR preview", "Download PNG".
            // Canvas is easier for PNG download.
            // Let's stick to default (canvas).
        });
        setQrCode(qr);
    }, []);

    useEffect(() => {
        if (!qrCode || !ref.current) return;
        ref.current.innerHTML = "";
        qrCode.append(ref.current);
    }, [qrCode, ref]);

    useEffect(() => {
        if (!qrCode) return;

        qrCode.update({
            width: config.size,
            height: config.size,
            data: config.data,
            margin: config.margin,
            image: config.logo || undefined,
            dotsOptions: {
                color: config.fgColor,
                type: config.dotType as DotType,
            },
            cornersSquareOptions: {
                color: config.fgColor,
                type: config.cornerSquareType as CornerSquareType,
            },
            cornersDotOptions: {
                color: config.fgColor,
            },
            backgroundOptions: {
                color: config.bgColor === "transparent" ? undefined : config.bgColor,
            },
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: config.logoSize / 100, // assuming slider is 20-50, etc.
                margin: 0,
            },
            qrOptions: {
                errorCorrectionLevel: config.logo
                    ? "H"
                    : (config.errorCorrection as ErrorCorrectionLevel),
            },
        });
    }, [qrCode, config]);

    return { ref, qrCode };
};
