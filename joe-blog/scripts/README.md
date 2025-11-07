# Blog Post Generator Scripts

Automate blog post creation for your Hugo blog with these handy scripts!

## 🚀 Quick Start

### Method 1: Ask GitHub Copilot (Easiest!)

Just ask Copilot in natural language:

```
"Create a blog post about Azure Container Apps with tags Azure, Containers, and Serverless"
```

```
"Convert this text into a blog post titled 'My DevOps Journey'"
```

Copilot will automatically create the properly formatted markdown file in `content/posts/`.

### Method 2: PowerShell Script

```powershell
# Navigate to your blog directory
cd c:\JoeOnly\dev\botblog\joe-blog

# Interactive mode (easiest)
.\scripts\New-BlogPost.ps1

# Quick post
.\scripts\New-BlogPost.ps1 -Title "My New Post" -Content "This is the content"

# With tags and categories
.\scripts\New-BlogPost.ps1 `
  -Title "Azure Functions Guide" `
  -Content "Azure Functions are amazing..." `
  -Tags @("Azure", "Serverless", "Functions") `
  -Categories @("Cloud", "Tutorial") `
  -Draft $false

# From clipboard
$content = Get-Clipboard
.\scripts\New-BlogPost.ps1 -Title "Post from Clipboard" -Content $content
```

### Method 3: Python Script

```bash
# Interactive mode
python scripts/create_blog_post.py --interactive

# Quick post
python scripts/create_blog_post.py -t "My Post" -c "Content here"

# With options
python scripts/create_blog_post.py \
  -t "Kubernetes Tutorial" \
  -c "Learn Kubernetes basics..." \
  --tags Kubernetes DevOps Cloud \
  --categories Tutorial \
  --no-draft

# From file
python scripts/create_blog_post.py -t "Post Title" -f content.txt

# From clipboard (requires: pip install pyperclip)
python scripts/create_blog_post.py -t "Post Title" --clipboard
```

## 📋 Examples

### Example 1: Technical Tutorial

```powershell
.\scripts\New-BlogPost.ps1 `
  -Title "Deploy Azure Static Web Apps with GitHub Actions" `
  -Content @"
Learn how to deploy your static website to Azure using GitHub Actions.

## Prerequisites
- Azure account
- GitHub repository
- Static web app code

## Steps
1. Create Azure Static Web App resource
2. Configure GitHub Actions workflow
3. Deploy your app
"@ `
  -Tags @("Azure", "Static Web Apps", "GitHub Actions", "CI/CD") `
  -Categories @("Tutorial", "DevOps") `
  -Draft $false
```

### Example 2: Quick Note

```powershell
.\scripts\New-BlogPost.ps1 `
  -Title "TIL: PowerShell Splatting" `
  -Content "Today I learned about PowerShell splatting - a way to pass parameters using a hashtable!" `
  -Tags @("PowerShell", "TIL")
```

### Example 3: Using Copilot

In VS Code, open Copilot Chat and type:

```
Create a blog post titled "5 Tips for Azure Cost Optimization" with the following content:
- Use Azure Reservations
- Implement auto-scaling
- Use Azure Advisor recommendations
- Monitor with Cost Management
- Right-size your resources

Add tags: Azure, Cost Optimization, Cloud
Category: Best Practices
```

## 🎯 Script Features

### PowerShell Script (`New-BlogPost.ps1`)
- ✅ Interactive mode
- ✅ Command-line parameters
- ✅ Auto-generates slug from title
- ✅ Proper Hugo frontmatter
- ✅ Opens file in VS Code after creation
- ✅ Clipboard support

### Python Script (`create_blog_post.py`)
- ✅ Interactive mode
- ✅ Command-line arguments
- ✅ Read from file
- ✅ Read from clipboard (with pyperclip)
- ✅ Flexible content input
- ✅ Cross-platform

## 📝 Blog Post Format

Both scripts create posts with this format:

```markdown
---
title: "Your Post Title"
date: 2025-11-07T10:30:00+00:00
draft: true
tags: ["tag1", "tag2"]
categories: ["category1"]
---

Your content here...
```

## 🏷️ Suggested Tags

**Technologies:**
- Azure, AWS, GCP, Cloud
- Kubernetes, Docker, Containers
- Terraform, Bicep, IaC
- Python, PowerShell, JavaScript, Go
- GitHub Actions, Azure DevOps, CI/CD

**Topics:**
- DevOps, SRE, Platform Engineering
- Security, Monitoring, Observability
- Best Practices, Architecture, Design Patterns
- Tutorial, Guide, TIL (Today I Learned)

## 📁 Suggested Categories

- Cloud
- DevOps
- Development
- Infrastructure
- Security
- Automation
- Tutorial
- Best Practices
- Troubleshooting

## 🔧 Workflow Tips

### Daily Blogging Workflow

1. **Write/collect notes** throughout the day
2. **At end of day**, use script to create post:
   ```powershell
   .\scripts\New-BlogPost.ps1  # Interactive mode
   ```
3. **Review** the generated file
4. **Set** `draft: false` when ready
5. **Commit** and push to trigger deployment

### Using with Copilot

Create a `.github/copilot-instructions.md` file (already created!) so Copilot knows how to help you create blog posts automatically.

Then just chat naturally:
- "Create a blog post about X"
- "Turn these notes into a blog post"
- "Write a tutorial about Y"

### Batch Creation

Create multiple posts from a list:

```powershell
$posts = @(
    @{Title="Post 1"; Content="Content 1"; Tags=@("Azure")},
    @{Title="Post 2"; Content="Content 2"; Tags=@("Cloud")}
)

foreach ($post in $posts) {
    .\scripts\New-BlogPost.ps1 @post
}
```

## 🚀 Next Steps

After creating a post:

1. **Edit** the file in `content/posts/`
2. **Preview** with Hugo server:
   ```bash
   hugo server -D
   ```
3. **Publish** by setting `draft: false`
4. **Commit** and push to deploy via GitHub Actions

## 📚 Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Copilot for VS Code](https://github.com/features/copilot)

Happy blogging! 🎉
