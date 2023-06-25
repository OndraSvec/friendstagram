import Wrapper from "../components/Wrapper";
import Button from "../components/Button";
import { useState } from "react";

interface FormState {
  file: File | null;
  textarea: string;
}

type handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => void;
type handleDescriptionChange = (
  e: React.ChangeEvent<HTMLTextAreaElement>
) => void;
type SelectedFile = File | null;

const Post = () => {
  const [formData, setFormData] = useState<FormState>({
    file: null,
    textarea: "",
  });
  const [error, setError] = useState<null | string>(null);
  const types: string[] = ["image/png", "image/jpeg"];

  console.log(formData);

  const handleFileChange: handleFileChange = (e) => {
    const selectedFile: SelectedFile = e.target.files[0];

    if (selectedFile && types.includes(selectedFile.type)) {
      setFormData((prevState) => ({
        ...prevState,
        file: selectedFile,
      }));
      setError(null);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        file: null,
      }));
      setError("Select an image of type png or jpeg.");
    }
  };
  const handleDescriptionChange: handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Wrapper className="w-full py-3">
      <form className="flex  w-4/5 flex-grow flex-col items-center gap-2 lg:w-3/5">
        <input
          type="file"
          className="border-1 w-full rounded-s border border-gray-300 p-0 text-gray-400 outline-gray-300 file:rounded file:border-none file:bg-sky-400 file:p-1 file:font-medium file:text-white file:outline-none"
          onChange={handleFileChange}
        />
        {error && <p>{error}</p>}
        <textarea
          name="textarea"
          placeholder="Add description..."
          className="border-1 w-full flex-grow  resize-none rounded-sm border border-gray-300 p-1 text-gray-400 outline-gray-300"
          onChange={handleDescriptionChange}
        />
        <Button
          text="Add post"
          className="w-full rounded-md bg-sky-400 p-1 text-sm font-medium text-white disabled:bg-gray-300 sm:p-2 sm:text-base md:p-3 md:text-lg lg:text-xl"
        />
      </form>
    </Wrapper>
  );
};

export default Post;
