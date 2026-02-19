import QRCodeStyling from "qr-code-styling";

export const downloadQR = async (
    qrCode: QRCodeStyling | null,
    name: string,
    resolution: number,
    previewSize: number
) => {
    if (!qrCode) return;

    try {
        // Update size for high-res export
        await qrCode.update({ width: resolution, height: resolution });

        // Download
        await qrCode.download({ name: name || "aroviq-qr", extension: "png" });
    } catch (err) {
        console.error("Failed to download QR code", err);
    } finally {
        // Revert to preview size to keep UI consistent
        try {
            await qrCode.update({ width: previewSize, height: previewSize });
        } catch (revertErr) {
            console.error("Failed to revert QR code size", revertErr);
        }
    }
};
