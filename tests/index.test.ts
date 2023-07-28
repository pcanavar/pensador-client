import pensador from "../src/ts/index";

describe("Pensador", () => {

  test("Should get default page", async () => {
    const phrases = await pensador.getShortPhrases();
    expect(phrases).toBeDefined();
    expect(phrases.some((obj) => Object.prototype.hasOwnProperty.call(obj, "text"))).toBe(true);
    expect(phrases[0].text.length).toBeGreaterThan(0);
});

  test("Should get phrases by author", async () => {
    const phrases = await pensador.getPhrasesByAuthor("Albert Einstein");
    expect(phrases).toBeDefined();
    expect(phrases.some((obj) => Object.prototype.hasOwnProperty.call(obj, "text"))).toBe(true);
    expect(phrases[0].text.length).toBeGreaterThan(0);
    expect(phrases[0].author).toBe("Albert Einstein");
  });

  test("Should get recent phrases", async () => {
    const phrases = await pensador.getRecentPhrases();
    expect(phrases).toBeDefined();
    expect(phrases.some((obj) => Object.prototype.hasOwnProperty.call(obj, "text"))).toBe(true);
    expect(phrases[0].text.length).toBeGreaterThan(0);
  });

  test("Should get popular phrases", async () => {
    const phrases = await pensador.getPopularPhrases();
    expect(phrases).toBeDefined();
    expect(phrases.some((obj) => Object.prototype.hasOwnProperty.call(obj, "text"))).toBe(true);
    expect(phrases[0].text.length).toBeGreaterThan(0);
  });

  test("Should get popular authors", async () => {
    const authors = await pensador.getPopularAuthors();
    expect(authors).toBeDefined();
    expect(authors.length).toBeGreaterThan(0);
  });

  test("Should get authors that starts with letter a", async () => {
    const authors = await pensador.getAuthorsStartingWith("a");
    expect(authors).toBeDefined();
    expect(authors.length).toBeGreaterThan(0);
  });

});
