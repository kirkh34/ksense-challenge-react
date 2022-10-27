import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, loadUsers] = useState([]);
  const [posts, loadPosts] = useState([]);
  const [selected, setUser] = useState(null);
  const [selectedName, setName] = useState("No One");
  const [postHeader, setPostHeader] = useState(null);

  useEffect(() => {
    //get users
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((response) => response.json())
      .then((json) => loadUsers(json));
    //get posts
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then((response) => response.json())
      .then((json) => loadPosts(json));
  }, []);

  useEffect(() => {
    setPostHeader(`Viewing ${selectedName}'s Posts`);
  }, [selectedName]);

  const selectUser = (userId) => {
    setUser(userId);
  };

  const User = ({ id, name, username, email, website, company }) => (
    <tr
      id={id}
      className={id === selected ? "selected" : ""}
      onClick={() => {
        selectUser(id);
        setName(name);
      }}
    >
      <td>{name}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>{website}</td>
      <td>{company}</td>
    </tr>
  );

  const Post = ({ id, title, body }) => (
    <div className="post" id={id}>
      <h3>
        <b>{title}</b>
      </h3>
      <hr />
      <p>{body}</p>
    </div>
  );

  return (
    <div>
      <h2 id="pageHeader">Dummy Users and Their Dummy Posts</h2>

      <table id="userTable">
        <thead>
          <tr id="userTH">
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Website</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
              email={user.email}
              website={user.website}
              company={user.company.name}
            />
          ))}
        </tbody>
      </table>

      <h2 id="postHeader">{postHeader}</h2>
      <div id="postContain">
        {posts.map(
          (post) =>
            post.userId === selected && (
              <Post key={post.id} title={post.title} body={post.body} />
            )
        )}
      </div>
    </div>
  );
}

export default App;
