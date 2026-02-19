import React, { useState } from "react";
import classNames from "classnames";
import QRCodeStyling from "qr-code-styling";
import { downloadQR } from "../utils/download";

interface ExportControlsProps {
    qrCode: QRCodeStyling | null;
    size: number;
}

export const ExportControls: React.FC<ExportControlsProps> = ({ qrCode, size }) => {
    const [resolution, setResolution] = useState(1024);

    const handleDownload = () => {
        downloadQR(qrCode, "aroviq-qr-code", resolution, size);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-sm ml-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                <h3 className="font-bold text-gray-800 text-lg">Export Settings</h3>

                {/* Resolution Selector */}
                <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Resolution (px)</label>
                    <div className="grid grid-cols-3 gap-2">
                        {[512, 1024, 2048].map((res) => (
                            <button
                                key={res}
                                onClick={() => setResolution(res)}
                                className={classNames(
                                    "px-2 py-2 text-sm font-semibold rounded-lg border transition-all",
                                    resolution === res
                                        ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                                        : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300"
                                )}
                            >
                                {res}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Download Button */}
                <button
                    onClick={handleDownload}
                    disabled={!qrCode}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
                >
                    <DownloadIcon />
                    Download PNG
                </button>
            </div>
        </div>
    );
};

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);
