import { encodeQuiz, decodeQuiz, buildShareUrl } from "./shareQuiz";

describe("encodeQuiz / decodeQuiz", () => {
  test("round-trips text and blank indexes", () => {
    const quiz = { text: "the quick brown fox", blankIndexes: [1, 3] };
    const decoded = decodeQuiz(encodeQuiz(quiz));

    expect(decoded).toEqual(quiz);
  });

  test("round-trips unicode text", () => {
    const quiz = { text: "you revise ✍️ café", blankIndexes: [0] };
    const decoded = decodeQuiz(encodeQuiz(quiz));

    expect(decoded).toEqual(quiz);
  });

  test("returns null for garbage input", () => {
    expect(decodeQuiz("not-valid-base64!!")).toBeNull();
  });

  test("returns null when nothing is passed", () => {
    expect(decodeQuiz(null)).toBeNull();
    expect(decodeQuiz(undefined)).toBeNull();
  });
});

describe("buildShareUrl", () => {
  test("builds a /test URL with a decodable share param", () => {
    const quiz = { text: "the quick brown fox", blankIndexes: [1, 3] };
    const url = buildShareUrl(quiz);

    expect(url).toContain("/test?share=");

    const shareParam = new URL(url).searchParams.get("share");
    expect(decodeQuiz(shareParam)).toEqual(quiz);
  });
});
