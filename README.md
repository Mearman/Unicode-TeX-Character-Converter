# Unicode Tex Character Converter for LaTeX/BibTeX

[![GitHub commit activity](https://img.shields.io/github/commit-activity/t/Mearman/Unicode-Tex-Character-Converter?style=for-the-badge&logo=GitHub&color=%23181717)](https://github.com/Mearman/Unicode-Tex-Character-Converter/commits/main/)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Mearman/Unicode-Tex-Character-Converter/test.yml?branch=main&style=for-the-badge&logo=githubactions)](https://github.com/Mearman/Unicode-Tex-Character-Converter/actions)
[![NPM Version](https://img.shields.io/npm/v/unicode-tex-character-converter?style=for-the-badge&logo=npm&color=CC3534)](https://www.npmjs.com/package/unicode-tex-character-converter)

This TypeScript library facilitates the conversion among Unicode characters, their codepoints, and corresponding LaTeX/BibTeX commands. For instance:

- `α` -> `U+03B1`
- `α` -> `\textalpha`
- `U+03B1` -> `α`
- `U+03B1` -> `\textalpha`.
- `\textalpha` -> `α`
- `\textalpha` -> `U+03B1`

Initially, this library was designed to assist with the conversion of content within BibTeX files. However, its utility extends to any scenario requiring conversion between Unicode and LaTeX/BibTeX Unicode character commands.

## How to Contribute

Should you encounter any issues, missing or incorrect mappings, please [file an issue](https://github.com/Mearman/Unicode-Tex-Character-Converter/issues/new) and/or [create a fork](https://github.com/Mearman/Unicode-Tex-Character-Converter/fork) and [submit a pull request](https://github.com/Mearman/Unicode-Tex-Character-Converter/compare) via the [GitHub repository](https://github.com/Mearman/Unicode-Tex-Character-Converter).
