import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditBookMutation, useGetBooksQuery } from "../../features/apiSlice";
import Navbar from "../Navbar/Navbar";

const EditBook = () => {
  const { data: books } = useGetBooksQuery();
  const [editBook] = useEditBookMutation();
  const navigate = useNavigate();

  const { bookId } = useParams();
  const id = parseInt(bookId);
  const book = books?.find((book) => book.id === id);

  const [bookData, setBookData] = useState({
    name: "",
    author: "",
    thumbnail: "",
    price: "",
    rating: "",
    featured: "",
    id: "",
  });

  useEffect(() => {
    setBookData({ ...book });
  }, [bookId, book]);

  const handleChangeData = (e) => {
    const updatedData = {
      ...bookData,
    };

    if (e.target.name !== "featured") {
      updatedData[e.target.name] = e.target.value;
    }

    if (e.target.name === "featured") {
      updatedData["featured"] = e.target.checked;
    }

    setBookData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedData = {
      name: bookData.name,
      author: bookData.author,
      thumbnail: bookData.thumbnail,
      price: bookData.price,
      rating: bookData.rating,
      featured: bookData.featured,
    };

    editBook({ id, data: submittedData });
    navigate("/");
  };

  return (
    <>
      <Navbar childFunction={() => {}} />
      <main className="py-6 2xl:px-6">
        <div className="container">
          <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
            <h4 className="mb-8 text-xl font-bold text-center">Edit Book</h4>
            <form className="book-form" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label>Book Name</label>
                <input
                  required
                  className="text-input"
                  type="text"
                  id="lws-bookName"
                  name="name"
                  value={bookData.name}
                  onChange={handleChangeData}
                />
              </div>

              <div className="space-y-2">
                <label>Author</label>
                <input
                  required
                  className="text-input"
                  type="text"
                  id="lws-author"
                  name="author"
                  value={bookData.author}
                  onChange={handleChangeData}
                />
              </div>

              <div className="space-y-2">
                <label>Image Url</label>
                <input
                  required
                  className="text-input"
                  type="text"
                  id="lws-thumbnail"
                  name="thumbnail"
                  value={bookData.thumbnail}
                  onChange={handleChangeData}
                />
              </div>

              <div className="grid grid-cols-2 gap-8 pb-4">
                <div className="space-y-2">
                  <label for="lws-price">Price</label>
                  <input
                    required
                    className="text-input"
                    type="number"
                    id="lws-price"
                    name="price"
                    value={bookData.price}
                    onChange={handleChangeData}
                  />
                </div>

                <div className="space-y-2">
                  <label>Rating</label>
                  <input
                    required
                    className="text-input"
                    type="number"
                    id="lws-rating"
                    name="rating"
                    min="1"
                    max="5"
                    value={bookData.rating}
                    onChange={handleChangeData}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="lws-featured"
                  type="checkbox"
                  name="featured"
                  className="w-4 h-4"
                  checked={bookData.featured}
                  onChange={handleChangeData}
                />
                <label className="ml-2 text-sm">This is a featured book</label>
              </div>

              <button type="submit" className="submit" id="lws-submit">
                Edit Book
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default EditBook;
