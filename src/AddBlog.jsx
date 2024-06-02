import axios from "axios";
import { useState } from "react";
import { baseUrl } from "./baseUrl";

export default function AddBlog({ token }) {
  const uploadFileFunc = async () => {
    const formData = new FormData();
    formData.append("image", file);

    let resImg = await axios.post(`${baseUrl}/upload/image`, formData, {
      headers: {
        Authorization: token,
      },
    });
    return resImg;
  };

  const [file, setFile] = useState();
  const [state, setState] = useState({
    title: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const resImage = await uploadFileFunc();
    const resAdd = await axios.post(
      `${baseUrl}/blogs`,
      {
        image: resImage?.data?.image || "test.png",
        title: state.title,
        description: state.description,
        tags: ["test1", "test2"],
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (resAdd?.data?.status === "success") {
      setFile();
      setState({
        title: "",
        description: "",
      });
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        margin: "0 auto",
        gap: "30px",
        padding: "100px 0",
      }}
    >
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        onChange={handleChange}
        name="title"
        type="text"
        placeholder="title"
      />
      <textarea name="description" onChange={handleChange}></textarea>
      <button>Submit</button>
    </form>
  );
}
