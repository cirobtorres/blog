"use client";

import { useAuth } from "../../providers/AuthProvider";
import { AvatarName } from "../Avatar";
import CommentEditor from "./CommentEditor";

export default function CommentTopEditor({ articleId }: { articleId: string }) {
  const { user } = useAuth();
  return (
    <div className="w-full max-w-comments mx-auto px-6 my-6">
      <AvatarName
        key={user?.data?.id}
        authorName={user?.data?.name}
        authorPicUrl={user?.data?.pictureUrl}
      />
      <CommentEditor id="root-editor" articleId={articleId} />
    </div>
  );
}
