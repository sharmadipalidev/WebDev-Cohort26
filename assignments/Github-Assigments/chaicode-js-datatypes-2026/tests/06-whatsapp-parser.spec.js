import { parseWhatsAppMessage } from '../src/06-whatsapp-parser.js';

describe('06 - WhatsApp Message Parser (9 pts)', () => {

  describe('Basic parsing', () => {
    test('Extracts date correctly', () => {
      const result = parseWhatsAppMessage("25/01/2025, 14:30 - Rahul: Hello bhai");
      expect(result.date).toBe("25/01/2025");
    });

    test('Extracts time correctly', () => {
      const result = parseWhatsAppMessage("25/01/2025, 14:30 - Rahul: Hello bhai");
      expect(result.time).toBe("14:30");
    });

    test('Extracts sender correctly', () => {
      const result = parseWhatsAppMessage("25/01/2025, 14:30 - Rahul: Hello bhai");
      expect(result.sender).toBe("Rahul");
    });

    test('Extracts message text correctly', () => {
      const result = parseWhatsAppMessage("25/01/2025, 14:30 - Rahul: Hello bhai");
      expect(result.text).toBe("Hello bhai");
    });

    test('Full parsing of a standard message', () => {
      expect(parseWhatsAppMessage("01/12/2024, 09:15 - Priya Sharma: Good morning!")).toEqual({
        date: "01/12/2024",
        time: "09:15",
        sender: "Priya Sharma",
        text: "Good morning!",
        wordCount: 2,
        sentiment: "neutral"
      });
    });
  });

  describe('Word count', () => {
    test('Counts words correctly', () => {
      const result = parseWhatsAppMessage("10/01/2025, 10:00 - Amit: Kya haal hai bhai");
      expect(result.wordCount).toBe(4);
    });

    test('Single word message', () => {
      const result = parseWhatsAppMessage("10/01/2025, 10:00 - Amit: Hello");
      expect(result.wordCount).toBe(1);
    });
  });

  describe('Sentiment detection - funny', () => {
    test('Message with 😂 emoji is funny', () => {
      const result = parseWhatsAppMessage("10/01/2025, 10:00 - Amit: So funny 😂");
      expect(result.sentiment).toBe("funny");
    });

    test('Message with :) is funny', () => {
      const result = parseWhatsAppMessage("10/01/2025, 10:00 - Amit: Nice one :)");
      expect(result.sentiment).toBe("funny");
    });

    test('Message with "haha" is funny (case-insensitive)', () => {
      const result = parseWhatsAppMessage("10/01/2025, 10:00 - Amit: HAHA that was good");
      expect(result.sentiment).toBe("funny");
    });
  });

  describe('Sentiment detection - love', () => {
    test('Message with ❤ emoji is love', () => {
      const result = parseWhatsAppMessage("10/01/2025, 10:00 - Priya: Miss you ❤");
      expect(result.sentiment).toBe("love");
    });

    test('Message with "love" is love', () => {
      const result = parseWhatsAppMessage("10/01/2025, 10:00 - Priya: I love this song");
      expect(result.sentiment).toBe("love");
    });

    test('Message with "pyaar" is love', () => {
      const result = parseWhatsAppMessage("10/01/2025, 10:00 - Priya: Bahut pyaar karte hain");
      expect(result.sentiment).toBe("love");
    });
  });

  describe('Sentiment priority', () => {
    test('Funny takes priority over love when both present', () => {
      const result = parseWhatsAppMessage("10/01/2025, 10:00 - Amit: I love your haha moments");
      expect(result.sentiment).toBe("funny");
    });

    test('Neutral when no keywords found', () => {
      const result = parseWhatsAppMessage("10/01/2025, 10:00 - Amit: Meeting at 5pm");
      expect(result.sentiment).toBe("neutral");
    });
  });

  describe('Edge cases in parsing', () => {
    test('Message with colon in text body', () => {
      const result = parseWhatsAppMessage("10/01/2025, 10:00 - Amit: Time is 5:30 okay?");
      expect(result.sender).toBe("Amit");
      expect(result.text).toBe("Time is 5:30 okay?");
    });

    test('Sender with spaces in name', () => {
      const result = parseWhatsAppMessage("10/01/2025, 10:00 - Rahul Kumar Sharma: Hey");
      expect(result.sender).toBe("Rahul Kumar Sharma");
    });
  });

  describe('Validation', () => {
    test('Non-string input returns null', () => {
      expect(parseWhatsAppMessage(123)).toBeNull();
    });

    test('null returns null', () => {
      expect(parseWhatsAppMessage(null)).toBeNull();
    });

    test('String without " - " returns null', () => {
      expect(parseWhatsAppMessage("Hello this is a message")).toBeNull();
    });

    test('String without ": " after sender returns null', () => {
      expect(parseWhatsAppMessage("10/01/2025, 10:00 - Amit says hello")).toBeNull();
    });
  });
});
