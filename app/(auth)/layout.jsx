import { ClerkProvider } from "@clerk/nextjs";
import "../(personal)/globals.css";

export const metadata = {
  title: "Authentication | My screen shots",
  description: "A 2-in-1 Application",
};

export default function AuthLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="w-full flex items-center justify-center h-screen">
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
