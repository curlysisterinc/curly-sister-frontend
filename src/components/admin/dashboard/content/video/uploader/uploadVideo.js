import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function UploadVideo() {
  const onDrop = useCallback((acceptedFiles) => {
    // do something withe files
  }, []);
  return <div></div>;
}

export default UploadVideo;
