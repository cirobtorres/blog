/** @jest-environment jsdom */

import React, { act, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

import generator from "generate-password-ts";
import {
  Fieldset,
  FieldsetInput,
  FieldsetLabel,
  FieldsetPassTypeBtn,
  FieldsetGeneratePassword,
  FieldsetError,
} from "..";

jest.mock("generate-password-ts", () => ({
  __esModule: true,
  default: {
    generate: jest.fn().mockReturnValue("GeneratedPassword123!"),
  },
}));

const mockedGenerator = generator as unknown as {
  generate: jest.Mock;
};

beforeAll(() => {
  (
    globalThis as unknown as {
      requestAnimationFrame: (cb: FrameRequestCallback) => number;
    }
  ).requestAnimationFrame = (cb: FrameRequestCallback) => {
    cb(0);
    return 0;
  };
});

describe("Fieldset components", () => {
  let container: HTMLDivElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("renders Fieldset with merged className", () => {
    act(() => {
      root.render(<Fieldset className="extra-fieldset-class" />);
    });

    const fieldset = container.querySelector("fieldset") as HTMLFieldSetElement;

    expect(fieldset).not.toBeNull();
    expect(fieldset.className).toContain("extra-fieldset-class");
  });

  it("renders FieldsetInput with and without error styles", () => {
    act(() => {
      root.render(<FieldsetInput error={false} placeholder="No error" />);
    });

    const inputNoError = container.querySelector("input") as HTMLInputElement;
    expect(inputNoError).not.toBeNull();
    expect(inputNoError.className).not.toContain("border-destructive/50");

    act(() => {
      root.render(<FieldsetInput error placeholder="Has error" />);
    });

    const inputWithError = container.querySelector("input") as HTMLInputElement;
    expect(inputWithError.className).toContain("border-destructive");
  });

  it("uses empty placeholder when none is provided in FieldsetInput", () => {
    act(() => {
      root.render(<FieldsetInput error={false} />);
    });

    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.placeholder).toBe("");
  });

  it("renders FieldsetLabel and applies error styles", () => {
    act(() => {
      root.render(<FieldsetLabel htmlFor="id" label="Label" error={false} />);
    });

    const label = container.querySelector("label") as HTMLLabelElement;
    expect(label).not.toBeNull();
    expect(label.textContent).toBe("Label");
    expect(label.className).not.toContain("text-destructive");

    act(() => {
      root.render(<FieldsetLabel htmlFor="id" label="Label" error />);
    });

    const labelError = container.querySelector("label") as HTMLLabelElement;
    expect(labelError.className).toContain("text-destructive");
  });

  it("toggles password visibility with FieldsetPassTypeBtn and focuses input", () => {
    const Wrapper = () => {
      const [type, setType] = useState<"text" | "password">("password");
      const ref = useRef<HTMLInputElement | null>(null);

      return (
        <div>
          <input ref={ref} defaultValue="secret" />
          <FieldsetPassTypeBtn state={type} setState={setType} inputRef={ref} />
          <span data-testid="type">{type}</span>
        </div>
      );
    };

    act(() => {
      root.render(<Wrapper />);
    });

    const button = container.querySelector(
      "button",
    ) as HTMLButtonElement | null;
    const typeSpan = container.querySelector(
      '[data-testid="type"]',
    ) as HTMLSpanElement;

    expect(typeSpan.textContent).toBe("password");

    act(() => {
      button?.click();
    });

    expect(typeSpan.textContent).toBe("text");

    // Second click toggles back to password (covers the else branch)
    act(() => {
      button?.click();
    });

    expect(typeSpan.textContent).toBe("password");
  });

  it("handles missing inputRef in FieldsetPassTypeBtn", () => {
    const setState = jest.fn();

    act(() => {
      root.render(<FieldsetPassTypeBtn state="password" setState={setState} />);
    });

    const button = container.querySelector(
      "button",
    ) as HTMLButtonElement | null;

    act(() => {
      button?.click();
    });

    expect(setState).toHaveBeenCalled();
  });

  it("generates password and moves cursor to the end", () => {
    const setState = jest.fn();
    const inputEl = document.createElement("input");
    inputEl.value = "initial";
    const focusSpy = jest.spyOn(inputEl, "focus");
    const setSelectionRangeSpy = jest.spyOn(inputEl, "setSelectionRange");

    const inputRef = { current: inputEl } as React.RefObject<HTMLInputElement>;

    act(() => {
      root.render(
        <FieldsetGeneratePassword
          setState={setState}
          inputRef={inputRef}
          text="Gerar"
        />,
      );
    });

    const button = container.querySelector(
      "button",
    ) as HTMLButtonElement | null;
    expect(button?.textContent).toContain("Gerar");

    act(() => {
      button?.click();
    });

    expect(mockedGenerator.generate).toHaveBeenCalled();
    expect(setState).toHaveBeenCalledWith("GeneratedPassword123!");
    expect(focusSpy).toHaveBeenCalled();
    expect(setSelectionRangeSpy).toHaveBeenCalled();
  });

  it("uses default button text in FieldsetGeneratePassword when text is not provided", () => {
    const setState = jest.fn();

    act(() => {
      root.render(<FieldsetGeneratePassword setState={setState} />);
    });

    const button = container.querySelector(
      "button",
    ) as HTMLButtonElement | null;

    expect(button?.textContent).toContain("Sugerir");

    act(() => {
      button?.click();
    });

    expect(mockedGenerator.generate).toHaveBeenCalled();
  });

  it("renders FieldsetError only when errors exist", () => {
    act(() => {
      root.render(<FieldsetError error={undefined} />);
    });

    expect(container.querySelector("ul")).toBeNull();

    act(() => {
      root.render(<FieldsetError error={["Error 1", "Error 2"]} />);
    });

    const list = container.querySelector("ul");
    expect(list).not.toBeNull();
    expect(list?.textContent).toContain("Error 1");
    expect(list?.textContent).toContain("Error 2");
  });
});
