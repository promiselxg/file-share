import "../globals.css";
import Header from "../_components/header";
import SideBar from "../_components/sidebar";
import { DialogProvider } from "@/context/Dialog.context";
import { ImageProvider } from "@/context/imageUpload.context";
import { Toaster } from "@/components/ui/toaster";
import { ScreenRecordProvider } from "@/context/screenRecord.context";
import { FolderCRUDProvider } from "@/context/folder.context";
import ViewSelectedDocument from "../_components/modal/_components/view-document";

export const metadata = {
  title: "Create Next Appss",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ScreenRecordProvider>
        <DialogProvider>
          <FolderCRUDProvider>
            <ImageProvider>
              <body className="flex bg-[--body-bg] w-full flex-col overflow-hidden relative">
                <div className="w-full flex">
                  <Header />
                </div>
                <div className="flex w-full gap-4">
                  <SideBar />
                  <div className="h-screen relative overflow-y-scroll w-full">
                    {children}
                  </div>
                </div>
                <ViewSelectedDocument />
                <Toaster />
              </body>
            </ImageProvider>
          </FolderCRUDProvider>
        </DialogProvider>
      </ScreenRecordProvider>
    </html>
  );
}
