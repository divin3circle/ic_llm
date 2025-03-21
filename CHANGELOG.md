# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Placeholder for future changes

## [1.1.0] - 2024-03-22

### Added

- Support for custom host configuration via options object
- Better compatibility with frontend frameworks and different environments
- Improved flexibility for local development vs production usage

### Changed

- Modified constructor to accept an options object with identity and host parameters
- Updated createActor function to accept either an Identity or HttpAgent
- Enhanced developer experience when using in different IC environments

### Fixed

- Fixed "Canister not found" errors when used in local development environments
- Improved compatibility with React and other frontend frameworks

## [1.0.0] - 2024-03-21

### Added

- Initial release of the ICP LLM Client
- Support for Llama 3.1 8B model
- Simple prompt interface
- Chat interface with multiple messages
- TypeScript type definitions
- Input validation for message limits and size
- Truncation detection for responses

### Features

- Maximum 10 messages per chat request
- 10kiB prompt size limit
- 200 token response limit
- Type-safe API
- Comprehensive error handling
- Detailed documentation

### Technical Details

- Built with TypeScript
- Uses @dfinity/agent for canister interaction
- Full type definitions included
- Source maps for debugging

### Documentation

- README with usage examples
- Best practices guide
- Error handling examples
- Limitations documentation

[1.1.0]: https://github.com/divin3circle/ic_llm/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/divin3circle/ic_llm/releases/tag/v1.0.0
