# Morphological Analyzer GraphQL API for Japanese

This is a simple GraphQL/NodeJS server that exposes an endpoint to
analyze Japanese text using [MeCab](https://taku910.github.io/mecab/). MeCab is a pain to setup on a machine and subsequently use it, this project uses Docker to simplify the setup process and the GraphQL API simplifies interaction patterns with MeCab.

## How To Run

**Docker is a prerequisite if running containers**

First, run this command to build image and install dependencies:
```
npm run docker-build
```
**Image must be built before running containers**

To run development container:
```
npm run docker-dev
```

To run production container:
```
npm run docker-prod
```

To run tests and get coverage data:
```
npm run docker-test
```

Development and Production containers should expose a port on localhost which you can use to interact with the server.

## Sample API Usage

Sample GraphQL Query in GraphQL Playground:

```graphql
query{
  tokenize(text:"大統領") {
    words {
      kanji
      pronunciation
      lexical
      compound1
      compound2
      compound3
      reading
      conjugation
    }
    error {
      name
    }
  }
}
```

Sample Output:

```graphql
{
  "data": {
    "tokenize": {
      "words": [
        {
          "kanji": "大統領",
          "pronunciation": "ダイトーリョー",
          "lexical": "名詞",
          "compound1": "一般",
          "compound2": null,
          "compound3": null,
          "reading": "ダイトウリョウ",
          "conjugation": null
        }
      ],
      "error": null
    }
  }
}
```