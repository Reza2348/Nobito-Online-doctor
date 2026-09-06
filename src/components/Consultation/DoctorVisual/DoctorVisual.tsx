import { FiClock, FiPlay, FiStar } from "react-icons/fi";

interface DoctorVisualProps {
  responseTime: string;
}

const DOCTOR_IMAGE = "/Photo-Doctor.avif";

const DOCTOR_THUMBNAIL = "/Photo-Doctor.avif";

const DoctorVisual = ({ responseTime }: DoctorVisualProps) => {
  return (
    <div className="relative min-h-130 overflow-hidden bg-linear-to-br from-cyan-50 via-white to-blue-50">
      {/* Decorative circles */}
      <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-cyan-200/30 blur-2xl" />

      <div className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-blue-200/30 blur-2xl" />

      {/* Doctor */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="relative w-full max-w-md">
          <div className="overflow-hidden rounded-4xl border-8 border-white shadow-2xl">
            <img
              src={DOCTOR_IMAGE}
              alt="پزشک برای مشاوره آنلاین"
              className="h-107.5 w-full object-cover"
            />
          </div>

          {/* Online Badge */}
          <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-sm font-bold text-slate-700 shadow-xl backdrop-blur">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
            آنلاین
          </div>

          {/* Doctor Card */}
          <div className="absolute -bottom-6 left-5 right-5 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-xl bg-cyan-100">
                <img
                  src={DOCTOR_THUMBNAIL}
                  alt="پروفایل پزشک"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h4 className="font-black text-slate-900">دکتر امیر رضایی</h4>

                <p className="text-xs text-slate-500">متخصص داخلی</p>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1">
                  <FiStar
                    size={14}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-sm font-black">4.9</span>
                </div>

                <p className="mt-1 text-[10px] text-slate-400">۳۸۲ نظر</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Waiting Time */}
      <div className="absolute left-5 top-16 hidden rounded-2xl border border-white bg-white/95 p-4 shadow-xl backdrop-blur sm:block">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <FiClock size={19} />
          </div>

          <div>
            <p className="text-[11px] text-slate-400">زمان انتظار</p>

            <p className="text-sm font-black text-slate-800">{responseTime}</p>
          </div>
        </div>
      </div>

      {/* Video Button */}
      <button
        type="button"
        aria-label="شروع مشاوره تصویری"
        className="absolute bottom-24 left-6 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-600 text-white shadow-xl shadow-cyan-600/30 transition hover:scale-105 hover:bg-cyan-700"
      >
        <FiPlay size={20} className="mr-0.5 fill-white" />
      </button>
    </div>
  );
};

export default DoctorVisual;
