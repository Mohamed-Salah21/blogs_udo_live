import { useEffect, useState } from "react";
import { decodeSession } from "../decode";
import axios from "axios";
import AddBlog from "../AddBlog";
import { baseUrl, imageBaseUrl } from "../baseUrl";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const sessionDecrypted = decodeSession();
  useEffect(() => {
    const getData = async () => {
      const reponse = await axios.get(`${baseUrl}/blogs`, {
        headers: {
          Authorization: `Bearer ${sessionDecrypted?.payload?.token}`,
        },
      });

      setItems(reponse?.data?.data);
      // return data;
    };
    getData();
  }, []);
  const deleteBlog = async (id) => {
    const resDelete = await axios.delete(
      `${baseUrl}/blogs/${id}`,

      {
        headers: {
          Authorization: `Bearer ${sessionDecrypted?.payload?.token}`,
        },
      }
    );
    if (resDelete?.data?.status === "success") {
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  return (
    <div>
      <AddBlog token={`Bearer ${sessionDecrypted?.payload?.token}`} />
      <h1 style={{ textAlign: "center" }}>Blogs</h1>
      <div className="blogs-container">
        {items.map((blog) => (
          <div key={blog._id}>
            <img
              height={200}
              width={200}
              src={`${imageBaseUrl}/${blog.image}`}
              alt={blog.title}
            />
            <h1>{blog.title}</h1>
            <button onClick={() => deleteBlog(blog._id)}>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
