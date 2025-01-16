import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section>
      <div className="container flex items-center justify-center">
        <SignIn />
      </div>
    </section>
  );
}
