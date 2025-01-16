import "./globals.css";

import { DialogProvider } from "@/context/Dialog.context";
import { ImageProvider } from "@/context/imageUpload.context";
import { Toaster } from "@/components/ui/toaster";
import { ScreenRecordProvider } from "@/context/screenRecord.context";
import { FolderCRUDProvider } from "@/context/folder.context";
import ViewSelectedDocument from "./_components/modal/_components/view-document/selectedDocumentModal";
import ClientLayout from "./clientLayout";
import ViewSelectedDocumentFullScreen from "./_components/modal/_components/view-document/viewSelectedDocumentFullScreen";
import { ClerkProvider } from "@clerk/nextjs";
import { DocumentCRUDProvider } from "@/context/document.context";

export const metadata = {
  title: "My screen shots",
  description: "A 2-in-1 Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <ScreenRecordProvider>
          <DialogProvider>
            <FolderCRUDProvider>
              <DocumentCRUDProvider>
                <ImageProvider>
                  <body className="flex bg-[--body-bg] w-full flex-col overflow-hidden relative">
                    <ClientLayout>{children}</ClientLayout>
                    <ViewSelectedDocument />
                    <ViewSelectedDocumentFullScreen />
                    <Toaster />
                  </body>
                </ImageProvider>
              </DocumentCRUDProvider>
            </FolderCRUDProvider>
          </DialogProvider>
        </ScreenRecordProvider>
      </ClerkProvider>
    </html>
  );
}
