import { CircleUserRound, Moon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { authClient } from "../lib/auth-client";
import { Link, useNavigate } from "react-router-dom";

type Payload = {
  searchValue?: string;
  handleSearchValueChange?: (value: string) => void;
};
export default function Navbar({
  searchValue,
  handleSearchValueChange,
}: Payload) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/", { replace: true });
        },
      },
    });
  };
  return (
    <header className=" sticky top-0 z-50 w-full bg-white shadow-xs px-4 py-6 ">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-xl">
          <div className="w-full flex">
            <div className="max-w-24 mr-5 text-xl font-bold italic">
              <Link to={"/"}>Home</Link>
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-black"
                value={searchValue}
                onChange={(event) => {
                  if (handleSearchValueChange) {
                    handleSearchValueChange(event.target.value);
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" className="text-sm ">
            <Moon />
          </button>

          <Popover>
            <PopoverTrigger asChild>
              <button type="button" className="">
                <CircleUserRound />
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="max-w-32">
              <PopoverHeader>
                <PopoverTitle>
                  <button className="cursor-pointer" onClick={handleLogout}>
                    Logout
                  </button>
                </PopoverTitle>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
