export const help = `
# Supported Features

- Headers
- Bold
- Italic
- Strikthrough
- Blockquote
- Ordered lists
- Unordered lists
- Inline code
- Fenced code blocks
- Horizontal rule
- links
- images
- Table
- Task list

# Cheat Sheet

## Headers

There are six types of headers you can use. The Example below will produce the largest header. 

\`\`\`markdown
# H1
\`\`\`

As you can see headers need to have a \`#\` symbol preceding it. Only add one \`#\` symbol will give largest 
header while using six \`#\` symbols will give you the smallest header. The number of \`#\` symbols before your 
text indicates how big you want your header to be.

## Bold

To bolden your text, use the following syntax:

~~~markdown
**Your text goes here**
~~~

## Italic

To italicize your text, use the following syntax:

~~~markdown
*Your text goes here*
~~~

## Strikethrough

To strike through text, use the following syntax:

\`\`\`markdown
~~Your text goes here~~
\`\`\`

## Blockquote

Syntax:

\`\`\`markdown
> This is a blockquote
\`\`\`
## Ordered Lists

\`\`\`markdown
1. Item one
2. Item two
3. Item three
\`\`\`

## Unordered Lists

\`\`\`markdown
- Item one
- Item two
- Item three
\`\`\`

## Inline Code

\`\`\`markdown
\`Your text goes here\`
\`\`\`

## Fenced Code Block

~~~markdown
\`\`\`
    {
        "firstName": "John",
        "lastName": "Smith",
        "age": 25
    }
\`\`\`
~~~

or

\`\`\`markdown
~~~
    {
        "firstName": "John",
        "lastName": "Smith",
        "age": 25
    }
~~~
\`\`\`

## Horizontal Rule

~~~markdown
---
~~~

## Links

~~~markdown
[text](link)
~~~

## Images

~~~markdown
![alt text](image.png)
~~~

## Table

~~~markdown
| header | header |
| ----- | ----- |
| item 1 | item 2 |
~~~

## Task List

~~~markdown
- [x] item
- [ ] item
~~~

# About the project
This projet came to be out of frustration with the contentful rich text editor 
that provided no distinction between inline code and code blocks. This project is supposed to act
as a prototype for an add-on to replace the default rich text editor.

[Project repo](https://github.com/programmergeek/md-editor)      

[My website](https://willjoseph.xyz)
`;
