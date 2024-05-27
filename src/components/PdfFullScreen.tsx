import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Expand, Loader2 } from "lucide-react";
import SimpleBar from "simplebar-react";
import { Document, Page, pdfjs } from 'react-pdf';
import { useToast } from './ui/use-toast';
import { useResizeDetector } from 'react-resize-detector';

interface PdfFullScreenProps {
    fileUrl: string
}

const PdfFullScreen = ({ fileUrl }: PdfFullScreenProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number>();

  const { toast } = useToast();
  const { width, ref} = useResizeDetector();


  return (
    <Dialog
      open={isOpen}
      onOpenChange={(visibility) => {
        if (!visibility) {
          setIsOpen(visibility);
        }
      }}
    >
      <DialogTrigger
          asChild
          onClick={() => setIsOpen(true)}
        >
        <Button
           aria-label="fullscreen"
           variant={"ghost"}
           className="gap-1.5"
        >
          <Expand className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-full">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
          <div ref={ref}>
            <Document
              loading={
                //Loading UI to display befor pdf is rendered
                <div className="flex justify-center">
                  <Loader2 className="h-6 w-6 my-24 animate-spin" />
                </div>
              }
              onLoadError={() => {
                //UI to show if there's an error when rendering PDF
                toast({
                  title: "Error loading PDF",
                  description: "Please try again later",
                  variant: "destructive",
                });
              }}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)} //Save the PDF number of pages in state
              file={fileUrl}
              className="max-h-full"
            >
              {new Array (numPages).fill(0).map((_, index) => (
                <Page
                  key={index}
                  width={width ? width : 1}
                  pageNumber={index + 1}
                />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default PdfFullScreen;