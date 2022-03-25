import React, { useRef, CSSProperties } from "react";

import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const inputUploadFile: CSSProperties = {
  display: "none",
};


// component own props
interface UploadFileOwnProps { }
interface uploadFilesFunction {
  (uploadedFiles:File[]):any
}

// component props
interface UploadFilesProps  {
  uploadFileAction: uploadFilesFunction
}


const UploadFilesComponent = (props: UploadFilesProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // function to read file as binary and return
  function getFileFromInput(file: File): Promise<any> {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function (this: FileReader, ev: ProgressEvent<FileReader>) {
        resolve(reader.result);
      };
      reader.readAsArrayBuffer(file); // here the file can be read in different way Text, DataUrl, ArrayBuffer
    });
  }

  function handleFilesChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.persist();
    const fileLoadBuffer: Promise<any>[] = [];
    const uploadedFiles: File[] = [];
    if (event.target.files != null) {
      Array.from(event.target.files).forEach((file) => {
        const fileWillUpload = getFileFromInput(file)
          .then((binary) => { 
            uploadedFiles.push(binary);
          })
          .catch(function (reason) {
            console.log(`Error during upload ${reason}`);
            event.target.value = ""; // to allow upload of same file if error occurs
          });
        fileLoadBuffer.push(fileWillUpload);
      });
      Promise.all(fileLoadBuffer).then(() =>
        props.uploadFileAction(uploadedFiles)
        
      );
    }
  }
  const handleUploadButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    inputRef.current?.click();
  };

  return (
    <div>
      <input
        accept=".xls,.xlsx"
        style={inputUploadFile}
        id="file"
        ref={inputRef}
        multiple={false}
        type="file"
        onChange={handleFilesChange}
      />

      <Button
        variant="outlined"
        startIcon={<AttachFileIcon />}
        onClick={handleUploadButton}></Button>
    </div>
  );
};
export default UploadFilesComponent;
