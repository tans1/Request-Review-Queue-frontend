import { CircleUserRound, Moon } from "lucide-react";

export default function Navbar() {
  return (
    <header className=" sticky top-0 z-50 w-full bg-white shadow-xs px-4 py-6 ">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-black"
          />
        </div>

        <div className="flex items-center gap-3">
          <button type="button" className="text-sm ">
            <Moon />
          </button>

          <button type="button" className="">
            <CircleUserRound />
          </button>
        </div>
      </div>
    </header>
  );
}
