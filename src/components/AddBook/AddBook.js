import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddBookMutation } from "../../features/apiSlice";
import Navbar from "../Navbar/Navbar";

const AddBook = () => {
  const [addBook] = useAddBookMutation();
  const [bookData, setBookData] = useState({ featured: false });
  const navigate = useNavigate();

  const handleChangeData = (e) => {
    const updatedData = {
      ...bookData,
    };

    if (e.target.name !== "featured") {
      updatedData[e.target.name] = e.target.value;
    }

    if (e.target.name === "featured") {
      updatedData[e.target.name] = e.target.checked;
    }

    setBookData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(bookData).length === 6) addBook(bookData);
    navigate("/");
  };

  return (
    <>
      <Navbar childFunction={() => {}} />
      <main className="py-6 2xl:px-6">
        <div className="container">
          <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
            <h4 className="mb-8 text-xl font-bold text-center">Add New Book</h4>
            <form className="book-form" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label for="lws-bookName">Book Name</label>
                <input
                  required
                  className="text-input"
                  type="text"
                  id="lws-bookName"
                  name="name"
                  onChange={handleChangeData}
                />
              </div>

              <div className="space-y-2">
                <label for="lws-author">Author</label>
                <input
                  required
                  className="text-input"
                  type="text"
                  id="lws-author"
                  name="author"
                  onChange={handleChangeData}
                />
              </div>

              <div className="space-y-2">
                <label for="lws-thumbnail">Image Url</label>
                <input
                  required
                  className="text-input"
                  type="text"
                  id="lws-thumbnail"
                  name="thumbnail"
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
                    onChange={handleChangeData}
                  />
                </div>

                <div className="space-y-2">
                  <label for="lws-rating">Rating</label>
                  <input
                    required
                    className="text-input"
                    type="number"
                    id="lws-rating"
                    name="rating"
                    min="1"
                    max="5"
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
                  onChange={handleChangeData}
                />
                <label for="lws-featured" className="ml-2 text-sm">
                  This is a featured book
                </label>
              </div>

              <button type="submit" className="submit" id="lws-submit">
                Add Book
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddBook;
