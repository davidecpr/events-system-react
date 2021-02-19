import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {DropzoneArea} from "material-ui-dropzone";

const MyDropzone = ({ input }) => {
  const onDrop = useCallback(acceptedFiles => {
    input.onChange(acceptedFiles);
  }, []);

  return (
    <DropzoneArea
      onDrop={onDrop}
      filesLimit={1}
      acceptedFiles={['image/*']}
      dropzoneText={"Drag and drop an image here or click"}

    />
  );
};

export default MyDropzone;
