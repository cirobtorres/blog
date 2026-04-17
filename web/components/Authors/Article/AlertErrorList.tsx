import { Alert } from "../../Alert";

export default function AlertErrorList({ state }: { state: ActionState }) {
  return state?.error ? (
    <Alert title="Erros" variant="default" className="mb-2">
      {state?.error?.title &&
        state?.error?.title.errors.map((err: string[], index: number) => (
          <p key={"title-" + index} className="text-destructive!">
            {err}
          </p>
        ))}
      {state?.error?.subtitle &&
        state?.error?.subtitle.errors.map((err: string[], index: number) => (
          <p key={"subtitle-" + index} className="text-destructive!">
            {err}
          </p>
        ))}
      {state?.error?.slug &&
        state?.error?.slug.errors.map((err: string[], index: number) => (
          <p key={"slug-" + index} className="text-destructive!">
            {err}
          </p>
        ))}
      {state?.error?.banner &&
        state?.error?.banner.errors.map((err: string[], index: number) => (
          <p key={"banner-" + index} className="text-destructive!">
            {err}
          </p>
        ))}
      {state?.error && (
        <p key={"form-error"} className="text-destructive!">
          {state.error}
        </p>
      )}
    </Alert>
  ) : null;
}
