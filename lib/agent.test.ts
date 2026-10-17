import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import {
  MARKDOWN_CONTENT_TYPE,
  homepageMarkdown,
  hoursCheckMarkdown,
  llmsTxt,
  markdownDecision,
  markdownHeaders,
  notFoundMarkdown,
  prefersMarkdown,
} from './agent.ts';

test('treats an explicit text/markdown accept as Markdown', () => {
  assert.equal(prefersMarkdown('text/markdown'), true);
  assert.equal(prefersMarkdown('text/markdown, text/html;q=0.9'), true);
  assert.equal(prefersMarkdown('text/html, text/markdown;q=0.8'), true);
});

test('keeps browsers and wildcard accepts on HTML', () => {
  assert.equal(prefersMarkdown(null), false);
  assert.equal(prefersMarkdown('text/html'), false);
  assert.equal(prefersMarkdown('text/html,application/xhtml+xml,*/*;q=0.8'), false);
  assert.equal(prefersMarkdown('text/markdown;q=0'), false);
  assert.equal(prefersMarkdown('text/x-component'), false);
});

test('homepage Markdown names the product and negotiates headers', () => {
  const decision = markdownDecision('/');
  assert.equal(decision.kind, 'document');
  if (decision.kind !== 'document') return;
  assert.equal(decision.status, 200);
  assert.ok(decision.body.length > 20);
  assert.match(decision.body, /Stash Labs/);
  assert.match(decision.body, /Hours Check/);
  assert.match(decision.body, /TimeTally/);
  const headers = markdownHeaders(decision.status);
  assert.equal(headers['Content-Type'], MARKDOWN_CONTENT_TYPE);
  assert.equal(headers.Vary, 'Accept');
  assert.equal(markdownDecision('/hours-check').kind, 'document');
});

test('unknown Markdown requests stay a 404 with a way onward', () => {
  const decision = markdownDecision('/__ora-404-probe-qhcfufd2');
  assert.equal(decision.kind, 'document');
  if (decision.kind !== 'document') return;
  assert.equal(decision.status, 404);
  assert.ok(decision.body.length >= 20);
  assert.match(decision.body, /Page not found/);
  assert.match(decision.body, /https:\/\/www\.stashlabs\.com\.au\/llms\.txt/);
  assert.match(decision.body, /sitemap\.xml/);
  assert.match(notFoundMarkdown('/missing'), /\/missing/);
  assert.equal(markdownHeaders(404)['X-Robots-Tag'], 'noindex');
});

test('HTML-only app routes are not turned into Markdown 404s', () => {
  assert.equal(markdownDecision('/thank-you').kind, 'passthrough');
  assert.equal(markdownDecision('/admin/login').kind, 'passthrough');
  assert.equal(markdownDecision('/card').kind, 'passthrough');
});

test('llms.txt tells an agent when to use Stash Labs and how to call', () => {
  const text = llmsTxt();
  assert.match(text, /## When to use this/);
  assert.match(text, /Hours Check/);
  assert.match(text, /TimeTally/);
  assert.match(text, /team@stashlabs\.com\.au/);
  assert.match(text, /#book/);
  assert.match(text, /no public API/i);
  assert.match(text, /Do not use Stash Labs for payroll tax/);
  assert.equal(
    readFileSync(new URL('../public/llms.txt', import.meta.url), 'utf8'),
    text
  );
});

test('published Markdown bodies are non-empty', () => {
  assert.ok(homepageMarkdown().trim().length > 100);
  assert.ok(hoursCheckMarkdown().includes('what your admin costs'));
});
