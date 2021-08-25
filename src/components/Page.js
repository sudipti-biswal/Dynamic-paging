import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const getPage = async () => {
    try {
      const res = await axios.get(
        `https://reqres.in/api/users?page=${pageCount}`
      );
      setData(res.data.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPage();
  }, [pageCount]);

  return (
    <Fragment>
      <main>
        <section className="container">
          <h2>Users list</h2>
          <h3>{data.length} in this page</h3>
          {loading &&
            data.map((users, i) => {
              return (
                <article key={i} className="person">
                  <img url={users.avatar} alt="" />
                  <div>
                    <span>Id no - {users.id}</span>
                    <h4>
                      Name: {users.first_name} {users.last_name}
                    </h4>
                    <p>Email: {users.email} </p>
                  </div>
                </article>
              );
            })}

          <button onClick={() => setPageCount(pageCount + 1)}> next </button>
        </section>
      </main>
    </Fragment>
  );
};

export default Page;
