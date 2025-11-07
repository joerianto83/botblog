#!/usr/bin/env python3
"""
Hugo Blog Post Generator

This script creates new blog posts for your Hugo blog with proper frontmatter.
"""

import os
import sys
import argparse
from datetime import datetime
from pathlib import Path
import re


def slugify(text):
    """Convert text to URL-friendly slug."""
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text)
    return text.strip('-')


def create_blog_post(title, content, tags=None, categories=None, draft=True, output_file=None):
    """
    Create a new Hugo blog post.

    Args:
        title: Post title
        content: Post content (markdown)
        tags: List of tags
        categories: List of categories
        draft: Whether post is a draft
        output_file: Custom output filename (optional)

    Returns:
        Path to created file
    """
    # Get script directory and blog root
    script_dir = Path(__file__).parent
    blog_root = script_dir.parent
    posts_dir = blog_root / "content" / "posts"

    # Create posts directory if it doesn't exist
    posts_dir.mkdir(parents=True, exist_ok=True)

    # Generate filename from title if not provided
    if output_file is None:
        slug = slugify(title)
        output_file = f"{slug}.md"

    file_path = posts_dir / output_file

    # Get current date in ISO format
    date = datetime.now().astimezone().isoformat()

    # Build frontmatter
    frontmatter_lines = [
        "---",
        f'title: "{title}"',
        f"date: {date}",
        f"draft: {str(draft).lower()}"
    ]

    if tags:
        tags_str = ", ".join([f'"{tag}"' for tag in tags])
        frontmatter_lines.append(f"tags: [{tags_str}]")

    if categories:
        cats_str = ", ".join([f'"{cat}"' for cat in categories])
        frontmatter_lines.append(f"categories: [{cats_str}]")

    frontmatter_lines.append("---")
    frontmatter = "\n".join(frontmatter_lines)

    # Combine frontmatter and content
    full_content = f"{frontmatter}\n\n{content}\n"

    # Write to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(full_content)

    return file_path


def interactive_mode():
    """Run in interactive mode to gather post information."""
    print("🚀 Hugo Blog Post Generator - Interactive Mode\n")

    title = input("Enter the blog post title: ").strip()
    if not title:
        print("❌ Title is required!")
        sys.exit(1)

    print("\nEnter the blog post content (type 'END' on a new line when done):")
    content_lines = []
    while True:
        line = input()
        if line.strip() == 'END':
            break
        content_lines.append(line)
    content = "\n".join(content_lines)

    tags_input = input("\nEnter tags (comma-separated, or press Enter to skip): ").strip()
    tags = [tag.strip() for tag in tags_input.split(',')] if tags_input else None

    categories_input = input("Enter categories (comma-separated, or press Enter to skip): ").strip()
    categories = [cat.strip() for cat in categories_input.split(',')] if categories_input else None

    draft_input = input("Is this a draft? (Y/n): ").strip().lower()
    draft = draft_input != 'n'

    return title, content, tags, categories, draft


def main():
    parser = argparse.ArgumentParser(
        description='Create a new Hugo blog post',
        epilog='Examples:\n'
               '  python create_blog_post.py -t "My Post" -c "Post content"\n'
               '  python create_blog_post.py --interactive\n'
               '  python create_blog_post.py -t "Azure Tips" -c "..." --tags Azure Cloud --no-draft',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )

    parser.add_argument('-t', '--title', help='Blog post title')
    parser.add_argument('-c', '--content', help='Blog post content')
    parser.add_argument('--tags', nargs='+', help='Tags for the post')
    parser.add_argument('--categories', nargs='+', help='Categories for the post')
    parser.add_argument('--draft', action='store_true', default=True, help='Mark as draft (default)')
    parser.add_argument('--no-draft', action='store_false', dest='draft', help='Mark as published')
    parser.add_argument('-o', '--output', help='Output filename (optional)')
    parser.add_argument('-i', '--interactive', action='store_true', help='Run in interactive mode')
    parser.add_argument('-f', '--file', help='Read content from file')
    parser.add_argument('--clipboard', action='store_true', help='Read content from clipboard (requires pyperclip)')

    args = parser.parse_args()

    # Interactive mode
    if args.interactive:
        title, content, tags, categories, draft = interactive_mode()
        output_file = args.output
    else:
        # Validate required arguments
        if not args.title:
            parser.error("Title is required (use -t or --interactive)")

        title = args.title
        tags = args.tags
        categories = args.categories
        draft = args.draft
        output_file = args.output

        # Get content from various sources
        if args.file:
            with open(args.file, 'r', encoding='utf-8') as f:
                content = f.read()
        elif args.clipboard:
            try:
                import pyperclip
                content = pyperclip.paste()
            except ImportError:
                print("❌ pyperclip not installed. Install with: pip install pyperclip")
                sys.exit(1)
        elif args.content:
            content = args.content
        else:
            parser.error("Content is required (use -c, -f, --clipboard, or --interactive)")

    # Create the blog post
    file_path = create_blog_post(title, content, tags, categories, draft, output_file)

    # Print success message
    print("\n✅ Blog post created successfully!")
    print(f"📄 File: {file_path}")
    print(f"📝 Title: {title}")

    if draft:
        print("📋 Status: Draft")
    else:
        print("🚀 Status: Published")

    if tags:
        print(f"🏷️  Tags: {', '.join(tags)}")
    if categories:
        print(f"📁 Categories: {', '.join(categories)}")


if __name__ == '__main__':
    main()
