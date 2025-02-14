import bibleData from './bible.json';

// Define the structure of the Bible JSON data
interface BibleData {
  [book: string]: {
    [chapter: number]: {
      [verse: number]: string;
    };
  };
}

// Assert the type of bibleData
const bible: BibleData = bibleData as BibleData;

// Map of shortened book names to full names
const bookNameMap: { [key: string]: string } = {
  "1jn": "1 John",
  "2jn": "2 John",
  "3jn": "3 John",
  "1sam": "1 Samuel",
  "2sam": "2 Samuel",
  "1kgs": "1 Kings",
  "2kgs": "2 Kings",
  "1chr": "1 Chronicles",
  "2chr": "2 Chronicles",
  "1cor": "1 Corinthians",
  "2cor": "2 Corinthians",
  "1thes": "1 Thessalonians",
  "2thes": "2 Thessalonians",
  "1tim": "1 Timothy",
  "2tim": "2 Timothy",
  "1pet": "1 Peter",
  "2pet": "2 Peter",
  "jude": "Jude",
  "rev": "Revelation",
};

// Function to normalize book names
function normalizeBookName(book: string): string {
  // Convert to lowercase and remove non-alphanumeric characters
  const normalized = book.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Check if the normalized name exists in the map
  return bookNameMap[normalized] || book;
}

const getNextVerse = async (
  value: string
): Promise<{ success: boolean; reference?: string; verse?: string; error?: string }> => {
  try {
    // Normalize the input (replace "vs" with ":" and handle spaces)
    const normalizedInput = value.replace(/\s+vs\s+/i, ':').replace(/\s+/g, ' ');

    // Match the book, chapter, and verse
    const verseMatch = normalizedInput.match(/(.+?)\s*(\d+)[:\s](\d+)/);
    if (!verseMatch) {
      return { success: false, error: "Invalid verse format" };
    }

    const [, bookPart, chapter, verse] = verseMatch;
    const chapterNum = parseInt(chapter, 10);
    const verseNum = parseInt(verse, 10);

    // Normalize the book name
    const book = normalizeBookName(bookPart);

    // Find the book in the Bible JSON data
    const bookData = bible[book];
    if (!bookData) {
      return { success: false, error: "Book not found" };
    }

    // Find the chapter in the book
    const chapterData = bookData[chapterNum];
    if (!chapterData) {
      return { success: false, error: "Chapter not found" };
    }

    // Get total verses in the chapter
    const totalVerses = Object.keys(chapterData).length;

    // Ensure the next verse does not exceed the chapter limit
    if (verseNum >= totalVerses) {
      return { success: false, error: "No next verse available in this chapter" };
    }

    const nextVerseNum = verseNum + 1;
    const nextVerseText = chapterData[nextVerseNum];

    return {
      success: true,
      reference: `${book} ${chapterNum}:${nextVerseNum}`,
      verse: nextVerseText,
    };
  } catch (error) {
    return { success: false, error: "An error occurred while fetching the next verse" };
  }
};

export default getNextVerse;