import { Table } from "../../components/basic/tables";
import { usePostsProps } from "./_posts.hook";

const Books = () => {
  const { postsProps, error } = usePostsProps();

  return (
    <div>
      {postsProps?.data ? <Table {...postsProps} /> : <h3>{error?.message}</h3>}
    </div>
  );
};

export default Books;
