import Link from "next/link";
const HomePage = () => {
  return (
    <div className="text-2xl">
      <h1 className="text-2xl">welcome</h1>
      <Link href="properties">Go to properties</Link>
      {/* <Link href="properties?name=felanProperty">Go to properties</Link>
      <Link
        href={{
          pathname: "properties",
          query: { name: "felanProperty" },
        }}
      >
        Go to properties
      </Link> */}
    </div>
  );
};

export default HomePage;
