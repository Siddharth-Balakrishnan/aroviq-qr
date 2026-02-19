import { useState } from "react";
import { ControlPanel } from "./components/ControlPanel";
import { ExportControls } from "./components/ExportControls";
import { QRPreview } from "./components/QRPreview";
import { useQRCode } from "./hooks/useQRCode";
import type { QRConfig } from "./types/qrTypes";

function App() {
  const [config, setConfig] = useState<QRConfig>({
    data: "https://aroviq.com",
    size: 512, // Default to DeshRan preset size
    margin: 16,
    dotType: "rounded",
    cornerSquareType: "extra-rounded",
    fgColor: "#000080", // DeshRan Navy
    bgColor: "transparent",
    errorCorrection: "H",
    logoSize: 20,
    logo: undefined,
  });

  const { ref, qrCode } = useQRCode(config);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-50 font-sans text-gray-900 overflow-hidden">
      {/* Sidebar Control Panel */}
      <div className="w-full md:w-[400px] flex-shrink-0 border-r border-gray-200 bg-white h-full overflow-y-auto relative z-20 shadow-xl shadow-gray-200/50">
        <ControlPanel config={config} setConfig={setConfig} />
      </div>

      {/* Main Preview Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-12 relative overflow-y-auto">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}>
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-center gap-12 z-10 w-full max-w-6xl">

          {/* QR Code Container */}
          <QRPreview qrRef={ref} config={config} />

          {/* Export Controls */}
          <div className="w-full max-w-sm">
            <ExportControls qrCode={qrCode} size={config.size} />

            <div className="mt-8 p-6 bg-blue-50/50 rounded-xl border border-blue-100 text-sm text-blue-800">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <span className="text-lg">💡</span> Pro Tip
              </h4>
              <p className="leading-relaxed opacity-80">
                Transparency mode is great for overlays. Ensure your error correction is set to 'H' (High) when using logos to maintain scanability.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
