import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import DropzonePreview from "./DropzonePreview";

const getColor = ({
  isDragAccept,
  isDragReject,
  isDragActive,
}: TGetColorProps) => {
  if (isDragAccept) {
    return "#00e676";
  }
  if (isDragReject) {
    return "#ff1744";
  }
  if (isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${({
    isDragAccept,
    isDragReject,
    isDragActive,
  }: TGetColorProps) => getColor({ isDragAccept, isDragReject, isDragActive })};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const Dropzone: React.FC<IDropzoneProps> = ({
  name,
  placeholder,
  accept,
  mode = "update",
  maxFiles,
  maxSize,
  ...rest
}) => {
  const { register, setValue, watch } = useFormContext();
  const files: File[] = watch(name);

  const onDrop = useCallback(
    (droppedFiles) => {
      /*
         This is where the magic is happening.
         Depending upon the mode we are replacing old files with new one,
         or appending new files into the old ones, and also filtering out the duplicate files. 
      */
      let newFiles =
        mode === "update" ? droppedFiles : [...(files || []), ...droppedFiles];
      if (mode === "append") {
        newFiles = newFiles.reduce((prev: File[], file: File) => {
          const fo = Object.entries(file);
          if (
            prev.find((e: File) => {
              const eo = Object.entries(e);
              return eo.every(
                ([key, value], index) =>
                  key === fo[index][0] && value === fo[index][1]
              );
            })
          ) {
            return prev;
          } else {
            return [...prev, file];
          }
        }, []);
      }
      // End Magic.
      setValue(name, newFiles, { shouldValidate: true });
    },
    [setValue, name, mode, files]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
  });

  return (
    <>
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...register(name)} id={name} {...getInputProps()} {...rest} />
        <p>
          {placeholder
            ? placeholder
            : "Drag 'n' drop some files here, or click to select files"}
        </p>
      </Container>

      {/* Optionally you may display a preview of the file(s) */}
      {!!files?.length && (
        <div>
          {files.map((file, idx) => {
            return (
              <DropzonePreview src={URL.createObjectURL(file)} key={idx} />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Dropzone;

interface IDropzoneProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  placeholder?: string;
  mode?: "update" | "append";
  maxFiles?: number;
  maxSize?: number;
}

type TGetColorProps = {
  isDragAccept?: boolean;
  isDragReject?: boolean;
  isDragActive?: boolean;
};
