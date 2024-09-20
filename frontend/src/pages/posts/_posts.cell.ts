import { useState } from "react";
import { EditableCell } from "../../components/basic/tables";

export const PostCell = ({
  index,
  type,
  column,
  postsState,
  setPostsState,
}: any) => {
  let { text, originalText } = postsState[index];
  text = text[column];
  originalText = originalText[column];

  const [currentText, setCurrentText] = useState(text);
  return EditableCell({
    text: currentText,
    originalText,
    onEditClick: () => {
      if (currentText !== originalText)
        setPostsState(
          postsState.map((v: any, i: number) => {
            const newPost = { ...v };
            if (i === index) {
              newPost.text[column] = currentText;
              newPost.changed = true;
            }
            return newPost;
          })
        );
    },
    type: type,
    inputClassName: "w-100 m-1 p-0 h-5",
    onChange: (e: any) => {
      setCurrentText(e.target.value);
    },
  });
};
