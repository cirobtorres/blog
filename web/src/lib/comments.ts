"use server";

import graphqlClient, { graphqlCommentClient } from "./graphQlClient";
import { revalidatePath } from "next/cache";
import {
  COUNT_COMMENTS,
  GET_COMMENTS,
  POST_COMMENT,
  POST_REPLY,
} from "./queries/comments";
import sanitizer from "../utils/sanitizer";

const saveComment = async (
  prevState: { message: string | null },
  formData: FormData
): Promise<{ message: string | null }> => {
  try {
    const content = formData.get("editor-content") as string;
    const articleId = formData.get("article-id");
    const userId = formData.get("user-id");
    if (articleId && articleId !== "" && userId && userId !== "") {
      const sanitizedBody = sanitizer(content);
      await graphqlCommentClient.request(POST_COMMENT, {
        data: {
          body: sanitizedBody,
          article: articleId,
          users_permissions_user: userId,
        },
      });
      revalidatePath("/");
      return { message: "success" };
    }
  } catch (error) {
    console.error("Failed to save comment", error);
    // return { message: "error" };
  }
  return { message: "error" };
};

const saveReply = async (
  prevState: { message: string | null },
  formData: FormData
): Promise<{ message: string | null }> => {
  try {
    const content = formData.get("tiptap-editor-content") as string;
    const articleId = formData.get("article-id");
    const userId = formData.get("user-id");
    const userParentId = formData.get("replied-user-id");
    if (
      articleId &&
      articleId !== "" &&
      userId &&
      userId !== "" &&
      userParentId &&
      userParentId !== ""
    ) {
      const sanitizedBody = sanitizer(content);
      await graphqlCommentClient.request(POST_REPLY, {
        data: {
          article: articleId,
          body: sanitizedBody,
          parent_id: userParentId,
          users_permissions_user: userId,
        },
      });
      revalidatePath("/");
      return { message: "success" };
    }
  } catch (error) {
    console.error("Failed to save comment", error);
    // return { message: "error" };
  }
  return { message: "error" };
};

const getComments = async (documentId: string) => {
  try {
    const { article }: { article: { comments: CommentProps[] } } =
      await graphqlClient.request(GET_COMMENTS, {
        documentId,
      });
    return { data: article };
  } catch (error) {
    console.error("Failed to fetch get comments:", error);
    // throw new Error("Failed to fetch get comments");
  }
  return { data: { comments: [] } };
};

const countComments = async (documentId: string) => {
  try {
    const {
      comments_connection,
    }: { comments_connection: { pageInfo: { total: number } } } =
      await graphqlClient.request(COUNT_COMMENTS, {
        filters: {
          article: {
            documentId: {
              eq: documentId,
            },
          },
        },
      });
    return { data: comments_connection.pageInfo.total };
  } catch (error) {
    console.error("Failed to fetch count comments:", error);
    // throw new Error("Failed to fetch get comments");
  }
  return { data: null };
};

const likeComment = async () => {
  try {
    // const
  } catch (error) {
    console.error("Failed to fetch like comments:", error);
    // throw new Error("Failed to fetch like comments");
  }
};

export { saveComment, saveReply, getComments, likeComment, countComments };
