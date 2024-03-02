# Unicode Tex Character Converter for LaTeX/BibTeX

This TypeScript library facilitates the conversion among Unicode characters, their codepoints, and corresponding LaTeX/BibTeX commands. For instance:

- `α` -> `\textalpha`
- `\textalpha` -> `α`
- `\textalpha` -> `U+03B1`
- `U+03B1` -> `\textalpha`.

Initially, this library was designed to assist with the conversion of content within BibTeX files. However, its utility extends to any scenario requiring conversion between Unicode and LaTeX/BibTeX Unicode character commands.

## How to Contribute

Should you encounter any missing or incorrect mappings, we encourage you to report the issue or submit a pull request.
