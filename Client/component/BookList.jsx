class BookList extends React.Component {
  constructor() {
    super();
    this.state = { booklist: [] };
  }
  render() {
    var trows = [];
    for (var book of this.state.booklist) {
      trows.push(
        <tr>
          <td>
            <a href='#' onClick={this.linkSelect} data-params={book._id}>
              {book._id}
            </a>
          </td>
          <td>{book.name}</td>
          <td>{book.author}</td>
          <td>{book.price}</td>
        </tr>
      );
    }
    return (
      <div>
        <h1>Book list</h1>
        <table border='1'>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>author</th>
            <th>price</th>
          </tr>
          {trows}
        </table>
        <br />
        <h1>Book details</h1>
        ID:
        <input type='text' ref='_id' /> <br />
        Name:
        <input type='name' ref='name' /> <br />
        Author: <input type='author' ref='author' /> <br />
        Price: <input type='price' ref='price' /> <br />
        <button>Add new</button>
        <button>Update</button>
        <button>Delete</button>
      </div>
    );
  }
  componentDidMount() {
    axios.get("http://localhost:6969/books/").then(respone => {
      // alert(JSON.stringify(respone.data));
      this.setState({ booklist: respone.data });
    });
    this.linkSelect = e => {
      var id = e.target.getAttribute("data-params");

      axios.get("http://localhost:6969/books/" + id).then(respone => {
        // alert(JSON.stringify(respone.data));
        var book = respone.data;
        this.refs._id.value = book._id;
        this.refs.name.value = book.name;
        this.refs.author.value = book.author;
        this.refs.price.value = book.price;
      });
    };
  }
}
ReactDOM.render(<BookList />, document.getElementById("root"));
