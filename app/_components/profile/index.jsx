import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileAvatar = () => {
  return (
    <>
      <Avatar className="w-[30px] h-[30px] overflow-hidden cursor-pointer">
        <AvatarImage src="https://github.com/promiselxg.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </>
  );
};

export default ProfileAvatar;
