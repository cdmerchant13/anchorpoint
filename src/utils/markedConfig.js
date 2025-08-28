import { marked } from 'marked';

// Configure marked options
marked.setOptions({
  breaks: true, // Convert single line breaks to <br>
  gfm: true, // GitHub Flavored Markdown
  headerIds: false, // Don't auto-generate IDs for headers
  mangle: false, // Don't escape HTML in code
  sanitize: false, // Allow HTML (we'll sanitize separately if needed)
  smartLists: true, // Use smarter list formatting
  smartypants: true, // Use smarter punctuation
});

// Custom renderer for better HTML output
const renderer = new marked.Renderer();

// Override link rendering to add target="_blank"
renderer.link = function(href, title, text) {
  const link = marked.Renderer.prototype.link.call(this, href, title, text);
  return link.replace(/<a /, '<a target="_blank" rel="noopener noreferrer" ');
};

// Override image rendering for security
renderer.image = function(href, title, text) {
  const image = marked.Renderer.prototype.image.call(this, href, title, text);
  return image.replace(/<img /, '<img loading="lazy" ');
};

// Set the custom renderer
marked.setOptions({ renderer });

export default marked;
