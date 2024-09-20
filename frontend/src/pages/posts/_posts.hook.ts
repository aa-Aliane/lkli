import { createColumnHelper } from "@tanstack/react-table";
import { ITableProps, EditableCell } from "../../components/basic/tables";
import { useGetBooksQuery } from "./_posts.queries";
import { usePostsStore } from "./_posts.context";
import { Button } from "../../components/basic/buttons";
import { PostCell } from "./_posts.cell";

const columnsHelper = createColumnHelper();

export const usePostsProps = () => {
  const { data: posts, error } = useGetBooksQuery();

  const { postsState, setPostsState } = usePostsStore();

  // columns setting
  const columns = [
    columnsHelper.accessor("id", {
      header: "id",
      cell: (props: any) => props.getValue(),
    }),
    columnsHelper.accessor("title", {
      header: "Title",
      cell: (props: any) =>
        PostCell({
          index: props.row.index,
          type: "text",
          column: "title",
          postsState,
          setPostsState,
        }),
    }),
    columnsHelper.accessor("body", {
      header: "Content",
      cell: (props: any) =>
        PostCell({
          index: props.row.index,
          type: "textarea",
          column: "body",
          postsState,
          setPostsState,
        }),
    }),
    columnsHelper.accessor("changed", {
      header: "",
      cell: (props: any) => {
        let i = props.row.index;
        return postsState[i].changed
          ? Button({
              text: "save",
              onClick: () =>
                setPostsState(
                  postsState.map((v, i) =>
                    i === props.row.index
                      ? {
                          ...v,
                          originalText: { ...v.text },
                        }
                      : v
                  )
                ),
            })
          : null;
      },
    }),
  ];

  // props setting
  const postsProps: ITableProps = {
    className: "table",
    data: posts,
    columns,
    setData: () => [],
  };

  return { postsProps, error };
};
