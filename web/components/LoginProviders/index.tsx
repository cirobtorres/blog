import GitHubLink from "./GitHubLink";
import GoogleLink from "./GoogleLink";

export default function LoginProviders() {
  return (
    <>
      <GoogleLink />
      {/* <MicrosoftLink /> */}
      {/* <LinkedInLink /> */}
      <GitHubLink />
    </>
  );
}
