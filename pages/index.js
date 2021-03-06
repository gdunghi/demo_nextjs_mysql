import Knex from "knex";
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

export async function getServerSideProps(context) {
  //Connect to Database
  const db = Knex({
    client: "mysql",
    connection: process.env.DB_CONNECTION_URL,
  });

  //Query table
  const postListQuery = await db("posts").select();

  //Convert result to object
  let postList = [];
  postListQuery.map((item) => {
    postList.push(JSON.parse(JSON.stringify(item)));
  });

  // Send to Props
  return { props: { postList, hello: process.env.HELLO } };
}

function HomePage({ postList, hello }) {
  return (
    <div>
      <h1>Demo Post from MySQL {hello}</h1>
      {postList &&
        postList.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
    </div>
  );
}

export default HomePage;
