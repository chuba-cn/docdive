import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  PDFUploader: f({ pdf: { maxFileSize: "4MB" } })
    //Check that the user is authenticated befoe uploading file
    .middleware(async ({ req }) => {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if(!user || !user.id) throw new Error('UNAUTHOURIZED');
      return {userId: user.id};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      //Create file in database after successful upload to uploadthing
      const createdFile = await db.file.create({
        data:{
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: file.url,
          uploadStatus: 'PROCESSING'
        }
      })
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;