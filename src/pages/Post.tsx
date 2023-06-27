import Wrapper from "../components/Wrapper";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import { useState, useEffect, FormEvent, useContext } from "react";
import addFileToStorage from "../firebase/functions";
import { addFileToFirestore } from "../firebase/functions";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState<null | string>(null);
  const types: string[] = ["image/png", "image/jpeg"];
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.file) {
      setLoading(true);
      await addFileToStorage(formData.file, setProgress, setError, setUrl);
    }
  };

  useEffect(() => {
    if (url) {
      addFileToFirestore("posts", url, user.uid, formData.textarea, [], []);
      setUrl(null);
      setLoading(false);
      navigate("/feed");
    }
  }, [formData.textarea, url, user.uid, navigate]);

  return (
    <Wrapper className="w-4/5 gap-2 py-3 lg:w-3/5">
      <ProgressBar progress={progress} />
      <form
        onSubmit={handleSubmit}
        className="flex  w-full flex-grow flex-col items-center gap-2"
      >
        <input
          type="file"
          className="border-1 w-full rounded-s border border-gray-300 p-0 text-sm text-gray-400 outline-gray-300 file:rounded file:border-none file:bg-sky-400 file:p-1 file:font-medium file:text-white file:outline-none sm:text-base md:text-lg lg:text-xl"
          onChange={handleFileChange}
        />
        {error && (
          <div className="w-full bg-rose-500 p-2 text-justify text-sm font-medium text-white sm:text-lg md:text-2xl">
            <p>{error}</p>
          </div>
        )}
        <textarea
          name="textarea"
          placeholder="Add description..."
          className="border-1 w-full flex-grow resize-none rounded-sm border border-gray-300 p-1 text-sm text-gray-400 outline-gray-300 sm:text-base md:text-lg lg:text-xl"
          onChange={handleDescriptionChange}
          value={formData.textarea}
        />
        <Button
          text="Add post"
          className="w-full rounded-md bg-sky-400 p-1 text-sm font-medium text-white disabled:bg-gray-300 sm:p-2 sm:text-base md:p-3 md:text-lg lg:text-xl"
          disabled={!formData.file || loading}
        />
      </form>
    </Wrapper>
  );
};

export default Post;
