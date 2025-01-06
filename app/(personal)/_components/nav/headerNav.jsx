import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NavigationBar = ({ Icon, url, label, color }) => {
  return (
    <>
      <ul className="flex items-center">
        <li>
          <Link
            href={url}
            className={cn(
              `cursor-pointer flex gap-2 items-center w-fit transition-all delay-100 ${
                Icon && "rounded-[5px]"
              }`
            )}
          >
            {Icon && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  `hover:bg-[--body-bg] hover:text-[white] ${
                    color && `bg-[#f8a365] hover:bg-[#f8a365] text-white`
                  }`
                )}
              >
                {Icon}
              </Button>
            )}
            <span className="text-sm">{label && label}</span>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default NavigationBar;
