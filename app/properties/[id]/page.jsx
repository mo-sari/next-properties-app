"use client";
import {
  useParams,
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";

const PropertyPage = () => {
  const router = useRouter();
  console.log(router);

  const params = useParams();
  console.log(params);

  const searchParams = useSearchParams();
  console.log(searchParams);
  console.log(searchParams.get("name"));
  // http://localhost:3000/properties/14?name=ali

  const pathName = usePathname();
  console.log(pathName);

  return (
    <div>
      <button onClick={() => router.replace("/")}> go to home</button>
    </div>
  );
};

export default PropertyPage;
