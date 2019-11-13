class BookList extends React.Component {
  constructor() {
    super();
    this.state = { booklist: [] };
  }
  btnAddnew = () => {
    var newBook = {
      name: this.refs.name.value,
      author: this.refs.author.value,
      price: parseInt(this.refs.price.value)
    };
    axios.post("http://localhost:6969/books/", newBook).then(respone => {
      if (respone.data == true) {
        this.getAll();
      } else {
        alert("Insert Error");
      }
    });
  };
  linkSelect = e => {
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
  btnDelete = () => {
    if (confirm("Are you Sure ? ")) {
      var id = this.refs._id.value;
      axios.delete("http://localhost:6969/books/" + id).then(respone => {
        if (respone.data == true) {
          this.getAll();
        } else {
          alert("Delete false");
        }
      });
    }
  };

  getAll() {
    axios.get("http://localhost:6969/books/").then(respone => {
      // alert(JSON.stringify(respone.data));
      this.setState({ booklist: respone.data });
    });
  }

  render() {
    var trows = [];
    for (var book of this.state.booklist) {
      trows.push(
        <tr>
          <td>
            <a href="#" onClick={this.linkSelect} data-params={book._id}>
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
        <table border="1">
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
        <input type="text" ref="_id" /> <br />
        Name:
        <input type="name" ref="name" /> <br />
        Author: <input type="author" ref="author" /> <br />
        Price: <input type="price" ref="price" /> <br />
        <button type="button" value="Add new" onClick={this.btnAddnew}>
          Add new
        </button>
        <button>Update</button>
        <button type="button" value="Delete" onClick={this.btnDelete}>
          Delete
        </button>
      </div>
    );
  }
  componentDidMount() {
    this.getAll();
  }
}
ReactDOM.render(<BookList />, document.getElementById("root"));
