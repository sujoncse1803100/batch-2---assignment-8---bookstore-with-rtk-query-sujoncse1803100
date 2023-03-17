import { useGetBooksQuery } from "../../features/apiSlice";
import Book from "../Book/Book";
import { useEffect, useState } from "react";
import Navbar from "./../Navbar/Navbar";

const Home = () => {
  const { data: books } = useGetBooksQuery();
  const [myBooks, setMyBooks] = useState([]);
  const [featuredSelected, setFeaturedSelected] = useState(false);

  useEffect(() => {
    setMyBooks(books);
  }, [books]);

  useEffect(() => {
    if (featuredSelected) {
      const filteredBooks = books?.filter((book) => book.featured);
      setMyBooks(filteredBooks);
    } else {
      setMyBooks(books);
    }
  }, [featuredSelected, books]);

  const handleSearch = (searchText) => {
    const text = searchText.toLowerCase();

    if (searchText !== "") {
      const filteredBooks = books?.filter((book) => {
        const bookName = book.name.toLowerCase();
        return bookName.includes(text);
      });
      setMyBooks(filteredBooks);
    }
  };

  return (
    <>
      <Navbar childFunction={handleSearch} />
      <main className="py-12 px-6 2xl:px-6 container">
        <div className="order-2 xl:-order-1">
          <div className="flex items-center justify-between mb-12">
            <h4 className="mt-2 text-xl font-bold">Book List</h4>

            <div className="flex items-center space-x-4">
              <button
                className={`lws-filter-btn ${
                  !featuredSelected && "active-filter"
                }`}
                onClick={() => {
                  setFeaturedSelected(false);
                }}
              >
                All
              </button>
              <button
                className={`lws-filter-btn ${
                  featuredSelected && "active-filter"
                }`}
                onClick={() => {
                  setFeaturedSelected(true);
                }}
              >
                Featured
              </button>
            </div>
          </div>
          <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
            {myBooks?.length > 0 ? (
              myBooks.map((book) => <Book book={book} />)
            ) : (
              <div>NO BOOKS FOUND !!!</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
