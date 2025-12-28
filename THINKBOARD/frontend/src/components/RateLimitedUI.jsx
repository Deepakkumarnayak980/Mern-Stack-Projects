import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div
        className="
          bg-green-900
          border border-emerald-700/40
          rounded-lg
          shadow-md
          transition
          hover:border-emerald-400
        "
      >
        <div className="flex flex-col md:flex-row items-center p-6">
          
          {/* Icon */}
          <div
            className="
              group
              bg-emerald-400/10
              p-4
              rounded-full
              mb-4 md:mb-0 md:mr-6
              transition
              hover:bg-emerald-400
            "
          >
            <ZapIcon className="size-10 stroke-[2.5] text-emerald-400 group-hover:text-green-900 transition" />
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2 text-emerald-400">
              Rate Limit Reached
            </h3>

            <p className="text-emerald-400 mb-1">
              You've made too many requests in a short period. Please wait a moment.
            </p>

            <p className="text-sm text-emerald-400/70">
              Try again in a few seconds for the best experience.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
