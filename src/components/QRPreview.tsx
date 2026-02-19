import React from "react";
import type { QRConfig } from "../types/qrTypes";

interface QRPreviewProps {
    qrRef: React.RefObject<HTMLDivElement | null>;
    config: QRConfig;
}

export const QRPreview: React.FC<QRPreviewProps> = ({ qrRef, config }) => {
    return (
        <div className="relative group shrink-0">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative bg-white p-8 rounded-2xl shadow-2xl shadow-indigo-100 border border-gray-100 flex flex-col items-center">
                {/* The actual QR code div */}
                <div
                    ref={qrRef}
                    className="qr-container [&>canvas]:max-w-full [&>canvas]:h-auto [&>svg]:max-w-full [&>svg]:h-auto rounded-lg overflow-hidden"
                />

                <div className="text-center mt-6 text-xs text-gray-400 font-mono">
                    {config.size}px • {config.errorCorrection} • {config.dotType}
                </div>
            </div>
        </div>
    );
};
