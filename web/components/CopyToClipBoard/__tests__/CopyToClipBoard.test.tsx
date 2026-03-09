/** @jest-environment jsdom */

import React from "react";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import CopyToClipBoard from "..";

let writeTextMock: jest.Mock;

beforeAll(() => {
  writeTextMock = jest.fn();
  (navigator as unknown as { clipboard: { writeText: jest.Mock } }).clipboard =
    {
      writeText: writeTextMock,
    };
});

describe("CopyToClipBoard", () => {
  let container: HTMLDivElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    jest.useFakeTimers();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    writeTextMock.mockClear();
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("does not copy when toCopy is empty", () => {
    act(() => {
      root.render(<CopyToClipBoard toCopy="" />);
    });

    const button = container.querySelector("button") as HTMLButtonElement;

    expect(button).not.toBeNull();
    expect(button.disabled).toBe(false);
    expect(button.textContent).toContain("Copiar");

    act(() => {
      button.click();
    });

    expect(writeTextMock).not.toHaveBeenCalled();
    expect(button.disabled).toBe(false);
    expect(button.textContent).toContain("Copiar");
  });

  it("copies text, shows feedback and re-enables after timeout", () => {
    act(() => {
      root.render(<CopyToClipBoard toCopy="Hello world" />);
    });

    const button = container.querySelector("button") as HTMLButtonElement;

    act(() => {
      button.click();
    });

    expect(writeTextMock).toHaveBeenCalledWith("Hello world");
    expect(button.disabled).toBe(true);
    expect(button.textContent).toContain("Copiado");

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(button.disabled).toBe(false);
    expect(button.textContent).toContain("Copiar");
  });

  it("merges custom className", () => {
    act(() => {
      root.render(<CopyToClipBoard toCopy="Hi" className="extra-copy-class" />);
    });

    const button = container.querySelector("button") as HTMLButtonElement;

    expect(button.className).toContain("extra-copy-class");
  });
});
