# GitHub Copilot Instructions for Blog Post Creation

This file provides instructions for GitHub Copilot to help create blog posts for this Hugo blog.

## When Asked to Create a Blog Post

When a user asks to create a blog post, follow these steps:

1. **Gather Information**: Ask for or extract:
   - Title
   - Content/topic
   - Tags (Azure, Cloud, DevOps, etc.)
   - Categories (Technology, Tutorial, etc.)
   - Draft status (default: true)

2. **Generate Frontmatter**: Use this format:
   ```yaml
   ---
   title: "Post Title"
   date: YYYY-MM-DDTHH:mm:ss+00:00
   draft: false
   tags: ["tag1", "tag2"]
   categories: ["category1"]
   ---
   ```

3. **Create File**: Save to `content/posts/` with a slugified filename
   - Example: "My New Post" → `my-new-post.md`

4. **Content Structure**: Include:
   - Introduction section
   - Main content with proper headings (##, ###)
   - Code blocks with language specifiers
   - Conclusion or summary

## Example Prompts Users Can Use

### Quick Post Creation
```
Create a blog post titled "Azure Functions Best Practices" about serverless computing
```

### Detailed Post Creation
```
Create a blog post:
- Title: "Deploying to Azure with GitHub Actions"
- Tags: Azure, CI/CD, GitHub Actions
- Categories: DevOps, Tutorial
- Include: workflow example, setup steps, troubleshooting tips
```

### From Notes
```
Convert these notes into a blog post titled "My Journey with Kubernetes":
[paste notes here]
```

## Automation Scripts Available

### PowerShell Script
```powershell
# Basic usage
.\scripts\New-BlogPost.ps1 -Title "My Post" -Content "Content here"

# Interactive mode
.\scripts\New-BlogPost.ps1

# From clipboard
$content = Get-Clipboard
.\scripts\New-BlogPost.ps1 -Title "Post Title" -Content $content -Tags @("Azure") -Draft $false
```

### Python Script
```bash
# Basic usage
python scripts/create_blog_post.py -t "My Post" -c "Content here"

# Interactive mode
python scripts/create_blog_post.py --interactive

# From file
python scripts/create_blog_post.py -t "My Post" -f content.txt --tags Azure Cloud

# From clipboard
python scripts/create_blog_post.py -t "My Post" --clipboard --no-draft
```

## Copilot Agent Workflow

When user says "Create a blog post about [topic]":

1. **Understand Intent**: Determine if they want:
   - Complete post generation
   - Just the structure/template
   - Convert existing text to a post

2. **Use Tools**: Utilize the create_file tool to generate the markdown file

3. **Best Practices**:
   - Use proper markdown formatting
   - Include code examples where relevant
   - Add meaningful headings
   - Include introduction and conclusion
   - Suggest relevant tags based on content
   - Default to draft:true unless specified

4. **Confirm**: Show the user:
   - File location
   - Preview of frontmatter
   - Next steps (set draft to false, run hugo server, etc.)

## Quick Reference

### Common Tags
- Azure, AWS, Cloud, DevOps, CI/CD, Kubernetes, Docker, Terraform
- Python, JavaScript, Go, PowerShell
- Tutorial, Guide, Best Practices, Tips, Troubleshooting

### Common Categories
- Cloud, Development, DevOps, Infrastructure, Security, Automation

### Filename Convention
- Lowercase only
- Replace spaces with hyphens
- Remove special characters
- Example: "Azure Best Practices!" → `azure-best-practices.md`
