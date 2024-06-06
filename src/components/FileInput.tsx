import {MuiFileInput} from "mui-file-input";
import {useState} from "react";
import CloseIcon from '@mui/icons-material/Close';

export const IMAGE_TYPES = ".png, .jpg, .jpeg, .gif, .webp"

type FileInputProps = {
  label: string,
  setFile: (file: File) => void,
  inputProps?: { accept: string }
}

const FileInput = ({label, setFile, inputProps}: FileInputProps) => {
  const [value, setValue] = useState<File>();

  const handleChange = (newFile : File) => {
    setFile(newFile)
    setValue(newFile)
  }

  return (
      <MuiFileInput
          value={value}
          onChange={handleChange}
          label={label}
          clearIconButtonProps={{
            title: "Remove",
            children: <CloseIcon fontSize="small"/>
          }}
          inputProps={inputProps}
      />
  )
}


export default FileInput;
