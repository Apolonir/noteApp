// Function to extract dates from note content using regular expression
export function extractDatesFromNoteContent(content) {
    const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
    return content.match(dateRegex) || [];
}