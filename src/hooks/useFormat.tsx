import React from 'react';

import { IMessage } from '@/components/chat/Chat';

function generateTextContent(content: string): React.ReactNode {
  const boldRegex = /\*\*(.*?)\*\*|__(.*?)__/g;
  const italicRegex = /\*(.*?)\*|_(.*?)_/g;
  const strikethroughRegex = /~~(.*?)~~/g;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const blockquoteRegex = /^>(.*)/gm;
  const bulletListRegex = /^- (.*)/gm;
  const numberedlistRegex = /^\d+\. (.*)/gm;
  const h1Regex = /^# (.*)/gm;
  const h2Regex = /^## (.*)/gm;
  const h3Regex = /^### (.*)/gm;

  const elements: React.ReactNode[] = [];

  content.split('\n').forEach((line) => {
    if (boldRegex.test(line)) {
      line = line.replace(boldRegex, '<strong>$1$2</strong>');
    }
    if (italicRegex.test(line)) {
      line = line.replace(italicRegex, '<em>$1$2</em>');
    }
    if (strikethroughRegex.test(line)) {
      line = line.replace(strikethroughRegex, '<del>$1</del>');
    }
    if (linkRegex.test(line)) {
      line = line.replace(linkRegex, '<a href="$2">$1</a>');
    }
    if (blockquoteRegex.test(line)) {
      line = line.replace(blockquoteRegex, '<blockquote>$1</blockquote>');
    }
    if (bulletListRegex.test(line)) {
      line = line.replace(bulletListRegex, '<li>$1</li>');
      line = `<ul>${line}</ul>`;
    }
    if (numberedlistRegex.test(line)) {
      line = line.replace(numberedlistRegex, '<li>$1</li>');
      line = `<ol>${line}</ol>`;
    }
    if (h1Regex.test(line)) {
      line = line.replace(h1Regex, '<h1>$1</h1>');
    }
    if (h2Regex.test(line)) {
      line = line.replace(h2Regex, '<h2>$1</h2>');
    }
    if (h3Regex.test(line)) {
      line = line.replace(h3Regex, '<h3>$1</h3>');
    }

    elements.push(<div dangerouslySetInnerHTML={{ __html: line }} />);
  });

  return elements;
}

export function useFormat(message: IMessage): React.ReactNode[] {
  const { content } = message;

  let modifiedContent: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  if (lastIndex < content.length) {
    const remainingContent = content.substring(lastIndex);
    modifiedContent = modifiedContent.concat(generateTextContent(remainingContent));
  }

  return modifiedContent;
}
