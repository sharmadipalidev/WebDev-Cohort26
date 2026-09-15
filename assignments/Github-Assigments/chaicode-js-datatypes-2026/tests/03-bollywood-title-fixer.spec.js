import { fixBollywoodTitle } from '../src/03-bollywood-title-fixer.js';

describe('03 - Bollywood Movie Title Fixer (8 pts)', () => {

  describe('Basic title casing', () => {
    test('All lowercase to Title Case', () => {
      expect(fixBollywoodTitle("kabhi khushi kabhi gham"))
        .toBe("Kabhi Khushi Kabhi Gham");
    });

    test('ALL CAPS to Title Case', () => {
      expect(fixBollywoodTitle("SHOLAY"))
        .toBe("Sholay");
    });

    test('Mixed case to Title Case', () => {
      expect(fixBollywoodTitle("dILwALe dULhANiA lE jAYeNGe"))
        .toBe("Dilwale Dulhania Le Jayenge");
    });
  });

  describe('Space normalization', () => {
    test('Leading and trailing spaces removed', () => {
      expect(fixBollywoodTitle("  sholay  "))
        .toBe("Sholay");
    });

    test('Multiple spaces between words collapsed', () => {
      expect(fixBollywoodTitle("kabhi   khushi   kabhi   gham"))
        .toBe("Kabhi Khushi Kabhi Gham");
    });

    test('Both leading/trailing and internal extra spaces fixed', () => {
      expect(fixBollywoodTitle("  DILWALE   DULHANIA   LE   JAYENGE  "))
        .toBe("Dilwale Dulhania Le Jayenge");
    });
  });

  describe('Small words handling', () => {
    test('"ka" stays lowercase in middle', () => {
      expect(fixBollywoodTitle("dil ka kya kare"))
        .toBe("Dil ka Kya Kare");
    });

    test('"ki" stays lowercase in middle', () => {
      expect(fixBollywoodTitle("queen ki kahani"))
        .toBe("Queen ki Kahani");
    });

    test('"the" stays lowercase in middle', () => {
      expect(fixBollywoodTitle("singh is the king"))
        .toBe("Singh Is the King");
    });

    test('Small word at beginning IS capitalized', () => {
      expect(fixBollywoodTitle("the legend of bhagat singh"))
        .toBe("The Legend of Bhagat Singh");
    });

    test('"a" and "an" stay lowercase in middle', () => {
      expect(fixBollywoodTitle("once upon a time in mumbai"))
        .toBe("Once Upon a Time in Mumbai");
    });

    test('Multiple small words in a title', () => {
      expect(fixBollywoodTitle("ek tha tiger ke baad"))
        .toBe("Ek Tha Tiger ke Baad");
    });
  });

  describe('Validation', () => {
    test('Non-string input (number) returns empty string', () => {
      expect(fixBollywoodTitle(123)).toBe("");
    });

    test('Empty string returns empty string', () => {
      expect(fixBollywoodTitle("")).toBe("");
    });

    test('String with only spaces returns empty string', () => {
      expect(fixBollywoodTitle("     ")).toBe("");
    });

    test('null returns empty string', () => {
      expect(fixBollywoodTitle(null)).toBe("");
    });

    test('undefined returns empty string', () => {
      expect(fixBollywoodTitle(undefined)).toBe("");
    });
  });
});
