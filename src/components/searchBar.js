function SearchBar() {
    return (
        <form action="/home" method="get">
            <label htmlFor="header-search">
                <span className="visually-hidden">Search Posts</span>
            </label>
            <input
                type="text"
                id="header-search"
                placeholder="Search Posts"
                name="s"
                style={{ border: "none" }}
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;