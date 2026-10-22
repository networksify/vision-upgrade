import type { HeroVisual } from '@/types/types';

type HeroPreviewProps = {
  visual: HeroVisual;
};

export const HeroPreview = ({ visual }: HeroPreviewProps) => (
  <div className="relative">
    <div
      aria-hidden="true"
      className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-blue-600/20 via-indigo-500/10 to-transparent blur-2xl"
    />
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          {visual.status}
        </span>
      </div>

      <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        {visual.detections.map((detection) => (
          <div
            key={detection.id}
            className={`absolute rounded-md border-2 ${detection.borderClass}`}
            style={{
              left: detection.box.left,
              top: detection.box.top,
              width: detection.box.width,
              height: detection.box.height,
            }}
          >
            <span
              className={`absolute -top-6 left-0 rounded px-2 py-0.5 text-[10px] font-bold text-white ${detection.labelClass}`}
            >
              {detection.label}
            </span>
          </div>
        ))}
        <div className="absolute inset-x-0 top-1/2 h-px bg-blue-300/60" />
        <div className="absolute bottom-4 left-4 rounded-lg bg-black/40 px-3 py-2 text-[11px] font-medium text-white backdrop-blur">
          {visual.caption}
        </div>
      </div>

      <div className="space-y-4 p-5">
        {visual.metrics.map((metric) => (
          <div key={metric.id}>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>{metric.label}</span>
              <span>{metric.value}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
              <div
                className={`h-1.5 rounded-full ${metric.barClass}`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
