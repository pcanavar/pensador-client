
# Pensador-Client

A simple package to get quotes <https://pensador.com>

## Features

- getShortPhrases
- getPhrasesByAuthor
- getRecentPhrases
- getPopularPhrases
- getPopularAuthors
- getAuthorsStartingWith

## Usage/Examples

```typescript
import pensador from 'pensador-client';
...
const resiltGetShortPhrases = await pensador.getShortPhrases(); 
const resiltGetPhrasesByAuthor = await pensador.getPhrasesByAuthor('Albert Einstein'); 
const resiltGetRecentPhrases = await pensador.getRecentPhrases(); 
const resiltGetPopularPhrases = await pensador.getPopularPhrases(); 
const resiltGetPopularAuthors = await pensador.getPopularAuthors(); 
const resiltGetAuthorsStartingWith = await pensador.getAuthorsStartingWith('A'); 
...
```

```javascript
const { default: pensador } = require('pensador-client');
...
const resiltGetShortPhrases = await pensador.getShortPhrases(); 
const resiltGetPhrasesByAuthor = await pensador.getPhrasesByAuthor('Albert Einstein'); 
const resiltGetRecentPhrases = await pensador.getRecentPhrases(); 
const resiltGetPopularPhrases = await pensador.getPopularPhrases(); 
const resiltGetPopularAuthors = await pensador.getPopularAuthors(); 
const resiltGetAuthorsStartingWith = await pensador.getAuthorsStartingWith('A'); 
...
```
