"use client";

import React from "react";
import NextLink from "next/link";
import CommentEditor, { characterLimit } from "./CommentEditor";
import { buttonVariants, cn, focusRing } from "../../utils/variants";
import { UserSignedOffIcon } from "../Header/UserSignedOff";
import { useAuth } from "../../providers/AuthProvider";
import { AvatarName } from "../Avatar";
import { Link } from "../Links";
import { usePathname, useSearchParams } from "next/navigation";
import { publicWebUrls } from "../../routing/routes";

export default function CommentHere({ articleId }: { articleId: string }) {
  const { user } = useAuth();
  const isSignedIn = user?.ok;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnParams = new URLSearchParams(searchParams.toString());
  returnParams.delete("redirect_url");
  returnParams.delete("login");
  returnParams.delete("callbackUrl");
  returnParams.delete("callback");
  returnParams.delete("replyTo");
  const search = returnParams.toString();
  const fullPath =
    (search ? `${pathname}?${search}` : pathname) + "#comment-root";
  const loginUrl = `${publicWebUrls.signIn}?redirect_url=${encodeURIComponent(fullPath)}&login=comment`;

  if (isSignedIn) {
    return (
      <MainWrapper>
        <AvatarName
          key={user?.data?.id}
          authorName={user?.data?.name}
          authorPicUrl={user?.data?.pictureUrl}
        />
        <CommentEditor articleId={articleId} />
      </MainWrapper>
    );
  }

  return (
    <MainWrapper>
      <InnerWrapper>
        <LinkToSignInHeader loginUrl={loginUrl}>
          <UserSignedOffIcon />
          Anônimo
        </LinkToSignInHeader>
        <FakeEditorBody>
          <LinkToSignInBody loginUrl={loginUrl}>Login...</LinkToSignInBody>
        </FakeEditorBody>
        <BottomWrapper>
          <FakeCountersWrapper>
            <FakeCaracterCount />
            <FakeWordCount />
          </FakeCountersWrapper>
          <FakeBtnWrapper>
            <FakeCancelBtn />
            <FakeSaveBtn />
          </FakeBtnWrapper>
        </BottomWrapper>
      </InnerWrapper>
    </MainWrapper>
  );
}

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-comments mx-auto px-3 my-6">{children}</div>
  );
};

const InnerWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full flex flex-col gap-1">{children}</div>
);

// Header----------------------------------------------------------------------------------------------
const LinkToSignInHeader = ({
  children,
  loginUrl,
}: {
  children: React.ReactNode;
  loginUrl: string;
}) => (
  <NextLink
    href={loginUrl}
    className={cn(
      "w-fit flex items-center gap-2 rounded border border-transparent transition-[border,box-shadow] duration-300",
      focusRing,
    )}
  >
    {children}
  </NextLink>
);

// Body------------------------------------------------------------------------------------------------
const FakeEditorBody = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full text-left text-sm text-neutral-900 dark:text-neutral-100 **:outline-none border-b [scrollbar-width:none] [-ms-overflow-style:none] py-2">
    {children}
  </div>
);

const LinkToSignInBody = ({
  children,
  loginUrl,
}: {
  children: React.ReactNode;
  loginUrl: string;
}) => (
  <Link
    href={loginUrl}
    variant="external"
    className={cn("px-1 border border-transparent", focusRing)}
  >
    {children}
  </Link>
);

// Footer----------------------------------------------------------------------------------------------
const BottomWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full flex flex-col min-[500px]:flex-row justify-between items-center gap-1">
    {children}
  </div>
);

// ---
const FakeCountersWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full flex items-center gap-1 h-6">{children}</div>
);

const FakeCaracterCount = ({ count = 0 }: { count?: number }) => (
  <span className="text-sm text-neutral-500">
    Tamanho: {count}/{characterLimit}
  </span>
);

const FakeWordCount = ({ count = 0 }: { count?: number }) => (
  <span className="text-sm text-neutral-500">Palavras: {count}</span>
);

// ---
const FakeBtnWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="max-[500px]:justify-start w-full flex justify-end items-center gap-1">
    {children}
  </div>
);

const FakeCancelBtn = () => (
  <div
    aria-disabled={true}
    className={cn(
      buttonVariants({ variant: "outline", disabled: true }),
      "w-full max-w-30 h-6",
      focusRing,
    )}
  >
    Cancelar
  </div>
);

const FakeSaveBtn = () => (
  <div
    aria-disabled={true}
    className={cn(
      buttonVariants({ variant: "default", disabled: true }),
      "w-full max-w-30 h-6",
      focusRing,
    )}
  >
    Salvar
  </div>
);
