import { useState } from "react";
import styled from "styled-components/native";
import { GenericText } from "src/components/text/GenericText";
import { appTheme } from "src/assets/styles/theme";
import { Octicons } from "@expo/vector-icons";
import { GenericInput } from "src/components/inputs/GenericInput";
import SecondaryButton from "../buttons/SecondaryButton";
import Spinner from "src/components/loaders/Spinner";

interface IComment {
  id: string;
  username: string;
  content: string;
  likes: number;
  date: string;
  replies: Array<IComment>;
}

interface ICommentsProps {
  comments: IComment[];
}

interface ICommentProps {
  comment: IComment;
}

export const Comments = ({ comments }: ICommentsProps) => {
  const [newComment, setNewComment] = useState<string>("");

  if (!comments.length) {
    return (
      <S.Comments>
        <Spinner />
      </S.Comments>
    );
  }

  return (
    <S.Comments>
      <S.CommentsRows>
        {comments.map((comment) => {
          return <CommentsRow key={comment.id} comment={comment} />;
        })}
      </S.CommentsRows>
      <S.CommentsAddContainer>
        <S.CommentsAdd>
          <S.CommentsRowAvatarAdd></S.CommentsRowAvatarAdd>
          <GenericInput
            value={newComment}
            maxLength={500}
            textContentType="none"
            placeholder="Add a comment"
            handleChangeText={(value) => setNewComment(value)}
            height={40}
            width="85%"
            autoCapitalize="none"
            isBottomSheet={true}
          />
          {newComment && (
            <S.CommnentsAddPost>
              <SecondaryButton text="Post" bold={true} icon={false} />
            </S.CommnentsAddPost>
          )}
        </S.CommentsAdd>
      </S.CommentsAddContainer>
    </S.Comments>
  );
};

const CommentsRow = ({ comment }: ICommentProps) => {
  return (
    <S.CommentsRow>
      <S.CommentsRowLeft>
        <S.CommentsRowAvatar></S.CommentsRowAvatar>
        <S.CommentsRowText>
          <S.CommentsRowTextTop>
            <GenericText size={14} weight="bold" content={comment.username} />
            <GenericText size={14} weight="light" content={comment.date} />
          </S.CommentsRowTextTop>
          <S.CommentsRowTextMiddle>
            <GenericText
              size={14}
              weight="book"
              content={comment.content}
              numberOfLines={100}
            />
          </S.CommentsRowTextMiddle>
          <S.CommentsRowTextBottom>
            <GenericText
              size={12}
              weight="bold"
              content={`${comment.likes} likes`}
            />
            <GenericText size={12} weight="light" content="Reply" />
          </S.CommentsRowTextBottom>
        </S.CommentsRowText>
      </S.CommentsRowLeft>
      <S.CommentsRowActions>
        <S.CommentRowActionsIcon>
          <Octicons name="heart" size={14} color={appTheme.secondary} />
        </S.CommentRowActionsIcon>
      </S.CommentsRowActions>
    </S.CommentsRow>
  );
};

const S = {
  Comments: styled.View`
    padding-bottom: 150px;
  `,
  CommentsTitle: styled.View`
    width: 100%;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-bottom-width: 0.25px;
    border-bottom-color: ${appTheme.shades500};
    margin-bottom: 20px;
  `,
  CommentsRows: styled.ScrollView``,
  CommentsRow: styled.View`
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 10px;
  `,
  CommentsRowLeft: styled.View`
    flex-direction: row;
    gap: 10px;
  `,
  CommentsRowAvatar: styled.View`
    width: 20px;
    height: 20px;
    border-width: 0.5px;
    border-color: ${appTheme.highlight};
    border-radius: 50%;
  `,
  CommentsRowAvatarAdd: styled.View`
    width: 40px;
    height: 40px;
    border-width: 0.5px;
    border-color: ${appTheme.highlight};
    border-radius: 50%;
  `,
  CommentsRowText: styled.View`
    alifn-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
  `,
  CommentsRowTextTop: styled.View`
    flex-direction: row;
    gap: 5px;
  `,
  CommentsRowTextMiddle: styled.View`
    max-width: 300px;
    flex-direction: row;
    gap: 5px;
  `,
  CommentsRowTextBottom: styled.View`
    flex-direction: row;
    gap: 5px;
  `,
  CommentsRowActions: styled.View``,
  CommentsAddContainer: styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 150px;
    width: 100%;
    align-items: center;
    border-width: 0.5px;
    border-color: ${appTheme.shades700};
  `,
  CommentsAdd: styled.View`
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 15px;
  `,
  CommnentsAddPost: styled.View`
    position: absolute;
    bottom: 15px;
    right: 25px;
  `,
  CommentRowActionsIcon: styled.Pressable`
    padding-left: 10px;
  `,
};
