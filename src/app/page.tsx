// import createApolloClient from "@/lib/client";
// import { gql } from "@apollo/client";
// import { headers } from "next/headers";

export default async function Page() {
  // const client = createApolloClient();

  // const grapqlData = await client.query({
  //   query: gql`
  //     query Countries {
  //       countries {
  //         code
  //         name
  //         emoji
  //       }
  //     }
  //   `,
  // });
  // console.log("grapqlData", data);

  // const posts = await data.json();
  return (
    <ul>
      <h1>hello</h1>
      {/* {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))} */}
    </ul>
  );
}
