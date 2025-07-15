import { Layout } from "../layout/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="flex">
        <div className="w-3/4 p-4">
          <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
          {/* Add more content here */}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
